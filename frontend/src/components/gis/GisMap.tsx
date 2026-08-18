import React, { useState, useRef, useEffect } from 'react';
import { 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Ruler, 
  Compass, 
  MapPin, 
  Eye, 
  EyeOff, 
  Info,
  ShieldAlert,
  Trees,
  Droplets,
  PawPrint,
  CheckCircle2,
  AlertTriangle,
  X
} from 'lucide-react';
import { 
  ProjectAssessment, 
  RouteAlternative, 
  TreeRecord, 
  WildlifeObservation, 
  GroundVerificationItem, 
  GisLayerToggle 
} from '../../types';

interface GisMapProps {
  project: ProjectAssessment;
  routes: RouteAlternative[];
  trees?: TreeRecord[];
  wildlife?: WildlifeObservation[];
  groundVerifications?: GroundVerificationItem[];
  activeRouteCode?: 'PROPOSED' | 'ALT_A' | 'ALT_B' | 'ALL';
  onSelectRoute?: (code: 'PROPOSED' | 'ALT_A' | 'ALT_B') => void;
  heightClass?: string;
  initialLayers?: Partial<GisLayerToggle>;
  highlightedTreeId?: string | null;
  onSelectTree?: (tree: TreeRecord) => void;
}

export const GisMap: React.FC<GisMapProps> = ({
  project,
  routes,
  trees = [],
  wildlife = [],
  groundVerifications = [],
  activeRouteCode = 'ALL',
  onSelectRoute,
  heightClass = 'h-[540px]',
  initialLayers,
  highlightedTreeId,
  onSelectTree
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [basemap, setBasemap] = useState<'satellite' | 'topo' | 'cadastral'>('satellite');
  const [isMeasuring, setIsMeasuring] = useState<boolean>(false);
  const [measurePoints, setMeasurePoints] = useState<{ x: number; y: number }[]>([]);
  const [showLayerDrawer, setShowLayerDrawer] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState<{ lat: number; lng: number; elev: number; chainage: string }>({
    lat: 30.3784,
    lng: 78.4320,
    elev: 1420,
    chainage: 'KM 18+400'
  });

  // Selected item modal / tooltip
  const [selectedEntity, setSelectedEntity] = useState<{
    type: 'tree' | 'wildlife' | 'verif' | 'route';
    data: any;
  } | null>(null);

  // Layer Visibility
  const [layers, setLayers] = useState<GisLayerToggle>({
    proposedRoute: true,
    alternativeRoutes: true,
    individualTrees: true,
    treeDensityHeatmap: false,
    forestCanopy: true,
    wildlifeEvidence: true,
    habitatSensitivity: true,
    waterBodies: true,
    terrainContours: true,
    groundVerificationPoints: true,
    ...initialLayers
  });

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const toggleLayer = (layerKey: keyof GisLayerToggle) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Convert GPS to SVG Coordinates (bounding box around Tehri/Chamba study area)
  // Lat: 30.34 to 30.43, Lng: 78.38 to 78.50
  const latMin = 30.345;
  const latMax = 30.425;
  const lngMin = 78.385;
  const lngMax = 78.498;

  const projectCoord = (lat: number, lng: number): { x: number; y: number } => {
    const normX = (lng - lngMin) / (lngMax - lngMin);
    const normY = 1 - (lat - latMin) / (latMax - latMin);
    return {
      x: normX * 880 + 60,
      y: normY * 520 + 40
    };
  };

  // Handle Drag / Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMeasuring) {
      const rect = mapContainerRef.current?.getBoundingClientRect();
      if (rect) {
        const clickX = (e.clientX - rect.left - pan.x) / zoom;
        const clickY = (e.clientY - rect.top - pan.y) / zoom;
        setMeasurePoints(prev => [...prev, { x: clickX, y: clickY }]);
      }
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = mapContainerRef.current?.getBoundingClientRect();
    if (rect) {
      const relX = (e.clientX - rect.left - pan.x) / zoom;
      const relY = (e.clientY - rect.top - pan.y) / zoom;
      const curLng = lngMin + (relX - 60) / 880 * (lngMax - lngMin);
      const curLat = latMax - (relY - 40) / 520 * (latMax - latMin);
      const elevEstimate = Math.round(900 + Math.sin(relX / 80) * 400 + Math.cos(relY / 80) * 300);
      const kmEst = Math.min(42.3, Math.max(0, (relX - 60) / 880 * 42.3)).toFixed(1);

      setCursorPos({
        lat: Number(curLat.toFixed(5)),
        lng: Number(curLng.toFixed(5)),
        elev: elevEstimate,
        chainage: `KM ${kmEst}`
      });
    }

    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setMeasurePoints([]);
    setIsMeasuring(false);
  };

  // Calculate distance between measured points in meters
  const calculateMeasuredDistance = () => {
    if (measurePoints.length < 2) return '0 m';
    let totalDistPx = 0;
    for (let i = 0; i < measurePoints.length - 1; i++) {
      const dx = measurePoints[i + 1].x - measurePoints[i].x;
      const dy = measurePoints[i + 1].y - measurePoints[i].y;
      totalDistPx += Math.sqrt(dx * dx + dy * dy);
    }
    // Scale: 880px ≈ 42.3 km (42300 m) => 1px ≈ 48.06 meters
    const distM = Math.round(totalDistPx * 48.06);
    if (distM > 1000) {
      return `${(distM / 1000).toFixed(2)} km`;
    }
    return `${distM} m`;
  };

  // Generate SVG Path for route alternatives
  const getRouteSvgPath = (points: [number, number][]): string => {
    return points.map((pt, idx) => {
      const { x, y } = projectCoord(pt[0], pt[1]);
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div 
      className={`relative w-full ${heightClass} bg-[#0D2319] border border-[#DEE2E6] rounded overflow-hidden select-none flex flex-col font-sans ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : ''
      }`}
    >
      {/* Top Map Action Bar */}
      <div className="bg-[#FFFFFF]/95 backdrop-blur-xs border-b border-[#DEE2E6] px-3 py-2 flex flex-wrap items-center justify-between gap-2 z-20 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#012D1D] flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#1B4332]" />
            GIS Ecological Decision Layer
          </span>
          <span className="text-[#C1C8C2]">|</span>
          <span className="text-[#5B5F63] text-[11px] hidden sm:inline">
            Coordinate System: <strong className="text-[#191C1D]">WGS 84 / UTM Zone 44N</strong>
          </span>
        </div>

        {/* Basemap Selector */}
        <div className="flex items-center gap-1 bg-[#F1F3F4] p-0.5 rounded border border-[#DEE2E6] text-[11px]">
          <button
            onClick={() => setBasemap('satellite')}
            className={`px-2 py-1 rounded font-semibold transition-colors ${
              basemap === 'satellite' ? 'bg-[#1B4332] text-white shadow-xs' : 'text-[#5B5F63] hover:text-[#191C1D]'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setBasemap('topo')}
            className={`px-2 py-1 rounded font-semibold transition-colors ${
              basemap === 'topo' ? 'bg-[#1B4332] text-white shadow-xs' : 'text-[#5B5F63] hover:text-[#191C1D]'
            }`}
          >
            Topographic
          </button>
          <button
            onClick={() => setBasemap('cadastral')}
            className={`px-2 py-1 rounded font-semibold transition-colors ${
              basemap === 'cadastral' ? 'bg-[#1B4332] text-white shadow-xs' : 'text-[#5B5F63] hover:text-[#191C1D]'
            }`}
          >
            Forest Cadastral
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowLayerDrawer(!showLayerDrawer)}
            className={`px-2.5 py-1 rounded border flex items-center gap-1 font-semibold text-xs transition-colors ${
              showLayerDrawer ? 'bg-[#1B4332] text-white border-[#1B4332]' : 'bg-white text-[#191C1D] border-[#DEE2E6] hover:bg-[#F8F9FA]'
            }`}
            title="Toggle Environmental GIS Layers"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Layers ({Object.values(layers).filter(Boolean).length})</span>
          </button>

          <button
            onClick={() => {
              setIsMeasuring(!isMeasuring);
              if (isMeasuring) setMeasurePoints([]);
            }}
            className={`px-2 py-1 rounded border flex items-center gap-1 font-semibold text-xs transition-colors ${
              isMeasuring ? 'bg-[#F18E27] text-white border-[#D97706]' : 'bg-white text-[#191C1D] border-[#DEE2E6] hover:bg-[#F8F9FA]'
            }`}
            title="Corridor Distance Measurement Tool"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isMeasuring ? 'Measuring...' : 'Measure'}</span>
          </button>

          <div className="h-4 w-px bg-[#DEE2E6] mx-1" />

          <button
            onClick={() => setZoom(z => Math.min(z + 0.25, 3.5))}
            className="p-1 rounded bg-white border border-[#DEE2E6] text-[#5B5F63] hover:text-[#191C1D] hover:bg-[#F8F9FA]"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setZoom(z => Math.max(z - 0.25, 0.75))}
            className="p-1 rounded bg-white border border-[#DEE2E6] text-[#5B5F63] hover:text-[#191C1D] hover:bg-[#F8F9FA]"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={resetView}
            className="p-1 rounded bg-white border border-[#DEE2E6] text-[#5B5F63] hover:text-[#191C1D] hover:bg-[#F8F9FA]"
            title="Reset Map View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 rounded bg-white border border-[#DEE2E6] text-[#5B5F63] hover:text-[#191C1D] hover:bg-[#F8F9FA]"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas / SVG Area */}
      <div 
        ref={mapContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="relative flex-1 overflow-hidden cursor-crosshair"
      >
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          <defs>
            {/* Satellite Background Gradient */}
            <radialGradient id="satForestGrad" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#1B382B" />
              <stop offset="50%" stopColor="#12281E" />
              <stop offset="100%" stopColor="#0B1A13" />
            </radialGradient>

            {/* Topographic Background Gradient */}
            <linearGradient id="topoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EFEBE9" />
              <stop offset="50%" stopColor="#D7CCC8" />
              <stop offset="100%" stopColor="#BCAAA4" />
            </linearGradient>

            {/* Cadastral Background Gradient */}
            <linearGradient id="cadastralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAFAFA" />
              <stop offset="100%" stopColor="#ECEFF1" />
            </linearGradient>

            {/* Sensitivity Patterns */}
            <pattern id="highSensPattern" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="16" height="16" fill="#B71C1C" fillOpacity="0.35" />
              <line x1="0" y1="0" x2="0" y2="16" stroke="#B71C1C" strokeWidth="3" strokeOpacity="0.8" />
            </pattern>

            <pattern id="medSensPattern" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="16" height="16" fill="#F57F17" fillOpacity="0.25" />
              <line x1="0" y1="0" x2="0" y2="16" stroke="#F57F17" strokeWidth="2" strokeOpacity="0.6" />
            </pattern>

            <pattern id="waterPattern" width="20" height="10" patternUnits="userSpaceOnUse">
              <path d="M 0 5 Q 5 0 10 5 T 20 5" fill="none" stroke="#0288D1" strokeWidth="1.5" strokeOpacity="0.6" />
            </pattern>
          </defs>

          {/* 1. Base Map Layer */}
          <rect
            x="0"
            y="0"
            width="1000"
            height="600"
            fill={
              basemap === 'satellite' 
                ? 'url(#satForestGrad)' 
                : basemap === 'topo' 
                ? 'url(#topoGrad)' 
                : 'url(#cadastralGrad)'
            }
          />

          {/* Topographic Contour Lines */}
          {layers.terrainContours && (
            <g stroke={basemap === 'satellite' ? '#2A4A3B' : '#8D6E63'} strokeWidth="0.75" fill="none" strokeOpacity="0.5">
              <path d="M 50 120 Q 250 80 450 160 T 950 140" />
              <path d="M 40 220 Q 280 180 500 240 T 960 210" />
              <path d="M 60 320 Q 310 280 550 340 T 940 300" />
              <path d="M 50 420 Q 350 380 600 440 T 950 410" />
              <path d="M 70 520 Q 400 480 680 510 T 960 490" />
              {/* Mountain Ridge Shading */}
              <path d="M 280 80 Q 320 220 380 340 T 420 540" strokeWidth="1.5" strokeDasharray="4 4" />
            </g>
          )}

          {/* 2. Forest Canopy Dense Patches */}
          {layers.forestCanopy && (
            <g>
              {/* Very Dense Forest (VDF) Polygons */}
              <path
                d="M 180 140 Q 320 110 420 180 T 600 240 T 520 400 T 300 360 Z"
                fill="#0F3D24"
                fillOpacity={basemap === 'satellite' ? '0.7' : '0.4'}
                stroke="#1B5E20"
                strokeWidth="1.5"
              />
              <path
                d="M 620 160 Q 750 120 860 190 T 820 360 T 680 320 Z"
                fill="#0F3D24"
                fillOpacity={basemap === 'satellite' ? '0.7' : '0.4'}
                stroke="#1B5E20"
                strokeWidth="1.5"
              />
              {/* Open Forest & Scrub Buffer */}
              <path
                d="M 120 100 Q 340 70 480 140 T 700 200 T 600 460 T 220 420 Z"
                fill="#2E7D32"
                fillOpacity={basemap === 'satellite' ? '0.25' : '0.15'}
                stroke="#388E3C"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            </g>
          )}

          {/* 3. Water Bodies & Streams */}
          {layers.waterBodies && (
            <g>
              {/* Major Perennial River (Bhagirathi Catchment Tributary) */}
              <path
                d="M 80 50 Q 220 160 380 260 T 580 380 T 880 560"
                fill="none"
                stroke="#0288D1"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Secondary Streams */}
              <path
                d="M 400 80 Q 420 180 380 260"
                fill="none"
                stroke="#29B6F6"
                strokeWidth="2"
                strokeDasharray="2 2"
              />
              <path
                d="M 680 180 Q 640 280 580 380"
                fill="none"
                stroke="#29B6F6"
                strokeWidth="2"
                strokeDasharray="2 2"
              />
              {/* Wetland Zone */}
              <ellipse cx="380" cy="260" rx="45" ry="25" fill="url(#waterPattern)" stroke="#0288D1" strokeWidth="1.5" />
            </g>
          )}

          {/* 4. Habitat Sensitivity Polygons */}
          {layers.habitatSensitivity && (
            <g>
              {/* High Sensitivity Zone 1 (Core Wildlife Corridor KM 18 - 24) */}
              <path
                d="M 280 210 Q 420 170 480 260 T 360 340 Z"
                fill="url(#highSensPattern)"
                stroke="#B71C1C"
                strokeWidth="2"
                className="cursor-pointer"
                onClick={() => setSelectedEntity({
                  type: 'route',
                  data: {
                    title: 'Core Habitat Sensitivity Zone A',
                    details: 'High ecological sensitivity rating (Score: 89/100). Old-growth Sal canopy & active ungulate corridor. Forest Diversion restricted.'
                  }
                })}
              />
              {/* High Sensitivity Zone 2 */}
              <path
                d="M 680 240 Q 820 200 880 310 T 740 380 Z"
                fill="url(#highSensPattern)"
                stroke="#B71C1C"
                strokeWidth="2"
              />
              {/* Medium Sensitivity Zone */}
              <path
                d="M 460 320 Q 600 280 660 380 T 520 460 Z"
                fill="url(#medSensPattern)"
                stroke="#F57F17"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* 5. Route Alignments */}
          {/* Proposed Route (Original DPR - High Impact) */}
          {(layers.proposedRoute && (activeRouteCode === 'ALL' || activeRouteCode === 'PROPOSED')) && (
            <g>
              {/* Corridor Buffer Polygon (60m) */}
              <path
                d={getRouteSvgPath(routes[0]?.pathPoints || [])}
                fill="none"
                stroke="#FFCDD2"
                strokeWidth="28"
                strokeOpacity="0.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Centerline */}
              <path
                d={getRouteSvgPath(routes[0]?.pathPoints || [])}
                fill="none"
                stroke="#D32F2F"
                strokeWidth="3.5"
                strokeDasharray="6 3"
                className="cursor-pointer hover:stroke-width-5 transition-all"
                onClick={() => onSelectRoute && onSelectRoute('PROPOSED')}
              />
            </g>
          )}

          {/* Alternative Route A (Ridge Line - Medium Impact) */}
          {(layers.alternativeRoutes && (activeRouteCode === 'ALL' || activeRouteCode === 'ALT_A')) && routes[1] && (
            <g>
              {/* Corridor Buffer */}
              <path
                d={getRouteSvgPath(routes[1].pathPoints)}
                fill="none"
                stroke="#FFE082"
                strokeWidth="24"
                strokeOpacity="0.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={getRouteSvgPath(routes[1].pathPoints)}
                fill="none"
                stroke="#F57F17"
                strokeWidth="3"
                strokeDasharray="8 4"
                className="cursor-pointer hover:stroke-width-5 transition-all"
                onClick={() => onSelectRoute && onSelectRoute('ALT_A')}
              />
            </g>
          )}

          {/* Alternative Route B (Degraded Fringe Re-alignment - Flagship Recommended) */}
          {(layers.alternativeRoutes && (activeRouteCode === 'ALL' || activeRouteCode === 'ALT_B')) && routes[2] && (
            <g>
              {/* Corridor Buffer */}
              <path
                d={getRouteSvgPath(routes[2].pathPoints)}
                fill="none"
                stroke="#C8E6C9"
                strokeWidth="22"
                strokeOpacity="0.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={getRouteSvgPath(routes[2].pathPoints)}
                fill="none"
                stroke="#1B5E20"
                strokeWidth="4"
                className="cursor-pointer hover:stroke-width-6 transition-all"
                onClick={() => onSelectRoute && onSelectRoute('ALT_B')}
              />
              {/* Recommended Route Glow Indicator */}
              <path
                d={getRouteSvgPath(routes[2].pathPoints)}
                fill="none"
                stroke="#81C784"
                strokeWidth="1.5"
                strokeDasharray="2 6"
              />
            </g>
          )}

          {/* 6. Chainage KM Markers along Proposed Line */}
          {(routes[0]?.pathPoints || []).map((pt, idx) => {
            const { x, y } = projectCoord(pt[0], pt[1]);
            const km = (idx * 8.46).toFixed(0);
            return (
              <g key={`km-${idx}`} transform={`translate(${x}, ${y})`}>
                <circle r="4" fill="#FFFFFF" stroke="#012D1D" strokeWidth="2" />
                <rect x="-18" y="-18" width="36" height="12" rx="2" fill="#012D1D" />
                <text x="0" y="-10" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
                  KM {km}
                </text>
              </g>
            );
          })}

          {/* 7. Individual Trees */}
          {layers.individualTrees && trees.map((tree) => {
            const { x, y } = projectCoord(tree.lat, tree.lng);
            const isHighlighted = highlightedTreeId === tree.id;
            const isVerified = tree.verificationStatus === 'Verified';

            return (
              <g 
                key={tree.id} 
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer group"
                onClick={() => {
                  if (onSelectTree) onSelectTree(tree);
                  setSelectedEntity({ type: 'tree', data: tree });
                }}
              >
                {/* Halo for selected/highlighted */}
                {isHighlighted && (
                  <circle r="12" fill="none" stroke="#FFD600" strokeWidth="2" className="animate-ping" />
                )}
                <circle
                  r={isHighlighted ? 7 : (tree.canopyDiameterM ? Math.max(3, tree.canopyDiameterM / 2.2) : 4)}
                  fill={
                    isVerified 
                      ? '#4CAF50' 
                      : tree.verificationStatus === 'Pending' 
                      ? '#FFB300' 
                      : '#9E9E9E'
                  }
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  className="hover:scale-150 transition-transform origin-center"
                />
              </g>
            );
          })}

          {/* 8. Wildlife Observations Pins */}
          {layers.wildlifeEvidence && wildlife.map((obs) => {
            const { x, y } = projectCoord(obs.lat, obs.lng);
            return (
              <g
                key={obs.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer"
                onClick={() => setSelectedEntity({ type: 'wildlife', data: obs })}
              >
                <circle r="9" fill="#D84315" stroke="#FFFFFF" strokeWidth="1.5" />
                <text x="0" y="3" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                  ⚠
                </text>
              </g>
            );
          })}

          {/* 9. Ground Verification Flags */}
          {layers.groundVerificationPoints && groundVerifications.map((gv) => {
            const { x, y } = projectCoord(gv.lat, gv.lng);
            return (
              <g
                key={gv.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer"
                onClick={() => setSelectedEntity({ type: 'verif', data: gv })}
              >
                <rect 
                  x="-6" 
                  y="-6" 
                  width="12" 
                  height="12" 
                  fill={gv.status === 'Verified' ? '#2E7D32' : gv.priority === 'High' ? '#C62828' : '#F57F17'} 
                  stroke="#FFFFFF" 
                  strokeWidth="1.5" 
                  transform="rotate(45)" 
                />
              </g>
            );
          })}

          {/* 10. Measurement Line Overlay */}
          {isMeasuring && measurePoints.length > 0 && (
            <g>
              <polyline
                points={measurePoints.map(p => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#FFD600"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
              {measurePoints.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="4" fill="#FFD600" stroke="#000000" strokeWidth="1" />
              ))}
            </g>
          )}
        </svg>

        {/* Floating Measurement Distance Badge */}
        {isMeasuring && measurePoints.length >= 2 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#191C1D] text-white px-3 py-1 rounded shadow-lg text-xs font-bold border border-[#FFD600] flex items-center gap-2">
            <span>Measured Distance: <span className="text-[#FFD600]">{calculateMeasuredDistance()}</span></span>
            <button 
              onClick={() => setMeasurePoints([])}
              className="text-xs text-gray-300 hover:text-white underline"
            >
              Clear
            </button>
          </div>
        )}

        {/* Top-Right Layer Drawer Panel */}
        {showLayerDrawer && (
          <div className="absolute top-3 right-3 w-64 bg-[#FFFFFF] border border-[#DEE2E6] rounded shadow-lg p-3 z-30 space-y-2 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#DEE2E6]">
              <span className="font-bold text-[#012D1D] uppercase tracking-wider text-[11px]">GIS Layer Controls</span>
              <button 
                onClick={() => setShowLayerDrawer(false)}
                className="text-[#5B5F63] hover:text-[#191C1D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
              {[
                { key: 'proposedRoute', label: 'Proposed Route (Original DPR)', color: '#D32F2F' },
                { key: 'alternativeRoutes', label: 'Alternative Routes (A & B)', color: '#1B5E20' },
                { key: 'individualTrees', label: 'Individual Trees (Detected)', color: '#4CAF50' },
                { key: 'forestCanopy', label: 'Forest & Canopy Density (VDF/MDF)', color: '#2E7D32' },
                { key: 'habitatSensitivity', label: 'Habitat Sensitivity Zones', color: '#B71C1C' },
                { key: 'waterBodies', label: 'Water Bodies & Streams', color: '#0288D1' },
                { key: 'wildlifeEvidence', label: 'Wildlife Observations', color: '#D84315' },
                { key: 'groundVerificationPoints', label: 'Ground Verification Flags', color: '#F57F17' },
                { key: 'terrainContours', label: 'Elevation Contours & Slope', color: '#8D6E63' }
              ].map((item) => (
                <label 
                  key={item.key} 
                  className="flex items-center justify-between p-1.5 rounded hover:bg-[#F8F9FA] cursor-pointer"
                >
                  <span className="flex items-center gap-2 text-[#414844] font-medium">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] truncate">{item.label}</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={layers[item.key as keyof GisLayerToggle]}
                    onChange={() => toggleLayer(item.key as keyof GisLayerToggle)}
                    className="accent-[#1B4332] rounded cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Selected Entity Inspector Popup */}
        {selectedEntity && (
          <div className="absolute bottom-12 left-4 max-w-sm bg-[#FFFFFF] border border-[#DEE2E6] rounded shadow-xl p-3 z-30 text-xs">
            <div className="flex items-start justify-between gap-2 pb-1.5 border-b border-[#DEE2E6]">
              <div>
                <span className="text-[10px] font-bold text-[#717973] uppercase tracking-wider">
                  {selectedEntity.type === 'tree' ? 'Tree Entity Inspection' : selectedEntity.type === 'wildlife' ? 'Wildlife Evidence' : 'Verification Point'}
                </span>
                <h4 className="font-bold text-[#012D1D] text-sm">
                  {selectedEntity.type === 'tree' ? selectedEntity.data.species : selectedEntity.type === 'wildlife' ? selectedEntity.data.speciesIndicative : selectedEntity.data.aiPrediction}
                </h4>
              </div>
              <button 
                onClick={() => setSelectedEntity(null)}
                className="text-[#5B5F63] hover:text-[#191C1D] p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-2 space-y-1.5 text-[#414844]">
              {selectedEntity.type === 'tree' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#717973]">Tree ID:</span>
                    <span className="font-semibold text-[#191C1D]">{selectedEntity.data.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717973]">Coordinates:</span>
                    <span className="font-mono">{selectedEntity.data.lat.toFixed(5)}, {selectedEntity.data.lng.toFixed(5)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717973]">Height / Girth:</span>
                    <span>{selectedEntity.data.estimatedHeightM}m / {selectedEntity.data.girthCm}cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717973]">AI Confidence:</span>
                    <span className="font-bold text-[#1B5E20]">{selectedEntity.data.confidencePercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717973]">Verification:</span>
                    <span className="font-semibold text-[#004D40]">{selectedEntity.data.verificationStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717973]">Project Impact:</span>
                    <span className={`px-1.5 py-0.2 rounded font-bold text-[10px] ${
                      selectedEntity.data.projectImpact === 'Affected' ? 'bg-[#FFEBEE] text-[#B71C1C]' : 'bg-[#E8F5E9] text-[#1B5E20]'
                    }`}>
                      {selectedEntity.data.projectImpact}
                    </span>
                  </div>
                </>
              )}

              {selectedEntity.type === 'wildlife' && (
                <>
                  <img 
                    src={selectedEntity.data.imageEvidence} 
                    alt="Evidence" 
                    className="w-full h-28 object-cover rounded border border-[#DEE2E6] mb-1" 
                  />
                  <div className="flex justify-between">
                    <span className="text-[#717973]">Category:</span>
                    <span className="font-semibold">{selectedEntity.data.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717973]">Evidence Type:</span>
                    <span>{selectedEntity.data.evidenceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717973]">Sensitivity:</span>
                    <span className="text-[#B71C1C] font-bold">{selectedEntity.data.sensitivityLevel}</span>
                  </div>
                  <p className="text-[11px] text-[#5B5F63] italic pt-1 border-t border-[#F1F3F4]">
                    "{selectedEntity.data.remarks}"
                  </p>
                </>
              )}

              {selectedEntity.type === 'verif' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#717973]">Location ID:</span>
                    <span className="font-semibold">{selectedEntity.data.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717973]">Priority:</span>
                    <span className="font-bold text-[#B71C1C]">{selectedEntity.data.priority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717973]">Assigned Officer:</span>
                    <span>{selectedEntity.data.assignedOfficer}</span>
                  </div>
                  <p className="text-[11px] bg-[#FFF8E1] p-1.5 rounded border border-[#FFE082] text-[#7F5000]">
                    {selectedEntity.data.reasonForVerification}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Map Legend Overlay (Official Government Standard) */}
        <div className="absolute bottom-3 right-3 bg-[#FFFFFF]/95 backdrop-blur-xs border border-[#DEE2E6] rounded p-2.5 shadow-md z-20 text-[11px] space-y-1.5 max-w-xs">
          <div className="font-bold text-[#012D1D] uppercase tracking-wider text-[10px] border-b border-[#DEE2E6] pb-1 flex items-center justify-between">
            <span>OFFICIAL GIS MAP LEGEND</span>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[#414844]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF50] shrink-0" />
              <span className="truncate">Detected Tree</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1B5E20] shrink-0" />
              <span className="truncate">Ground Verified Tree</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 border-t-2 border-dashed border-[#D32F2F] shrink-0" />
              <span className="truncate">Proposed Route</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-[#1B5E20] shrink-0" />
              <span className="truncate font-semibold text-[#1B5E20]">Alternative Route</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-[#B71C1C]/40 border border-[#B71C1C] shrink-0" />
              <span className="truncate">High Sensitivity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-[#F57F17]/30 border border-[#F57F17] shrink-0" />
              <span className="truncate">Med Sensitivity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-[#0288D1] shrink-0" />
              <span className="truncate">Water Body</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#D84315] font-bold text-xs shrink-0">⚠</span>
              <span className="truncate">Wildlife Observation</span>
            </div>
          </div>
        </div>

        {/* Live Coordinate Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#191C1D]/90 text-[#F0F1F2] px-3 py-1 flex flex-wrap items-center justify-between text-[10px] font-mono z-10">
          <div className="flex items-center gap-3">
            <span>LAT: <strong>{cursorPos.lat.toFixed(5)}°N</strong></span>
            <span>LNG: <strong>{cursorPos.lng.toFixed(5)}°E</strong></span>
            <span>ELEV: <strong>{cursorPos.elev} m</strong></span>
            <span className="text-[#A5D0B9]">CHAINAGE: <strong>{cursorPos.chainage}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <span>ZOOM: {(zoom * 100).toFixed(0)}%</span>
            <span>•</span>
            <span>SCALE: 1 : 25,000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
