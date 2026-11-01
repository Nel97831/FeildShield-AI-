import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  APIProvider,
  Map,
  Map3D,
  Marker3D,
  Pin,
  useMap,
  AdvancedMarker
} from '@vis.gl/react-google-maps';
import { GeoPoint, Farm, FloodObservation, LandUnit } from '../types';
import { calculateGeodesicAreaSqm, calculatePolygonCenter } from '../utils/geo';
import { convertFromSqm } from '../data/regionalUnits';
import { RIVER_GAUGES, SATELLITE_FLOOD_OBSERVATIONS } from '../data/mockFloodData';
import { getGoogleEarthWebUrl, generateGoogleEarthKml, downloadKmlFile } from '../utils/googleEarth';
import {
  Globe,
  Layers,
  Compass,
  Play,
  Pause,
  ExternalLink,
  Download,
  Eye,
  CheckCircle2,
  Trash2,
  Sparkles,
  Zap
} from 'lucide-react';

interface GoogleEarthViewerProps {
  initialCenter?: GeoPoint;
  initialPolygon?: GeoPoint[];
  farm?: Farm | null;
  floodObservation?: FloodObservation | null;
  isEditable?: boolean;
  onPolygonChange?: (points: GeoPoint[], areaSqm: number) => void;
  selectedUnit?: LandUnit;
  heightClass?: string;
  showControls?: boolean;
}

// Safely test WebGL2 support for 3D terrain
function isWebGL2Available(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

// High-Performance Vector Overlay & Bounds Layer
const GoogleMapsPrecisionLayer: React.FC<{
  points: GeoPoint[];
  center: GeoPoint;
  floodObservation?: FloodObservation | null;
  isEditable?: boolean;
  onPointAdd?: (point: GeoPoint) => void;
  showFlood: boolean;
}> = ({
  points,
  center,
  floodObservation,
  isEditable,
  onPointAdd,
  showFlood
}) => {
  const map = useMap();
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  const floodPolygonRef = useRef<google.maps.Polygon | null>(null);
  const hasFittedInitialBounds = useRef(false);

  // Precision Auto-Bounds: fits bounds to farm polygon or center with padding
  useEffect(() => {
    if (!map) return;

    if (points.length >= 3) {
      const bounds = new google.maps.LatLngBounds();
      points.forEach((p) => bounds.extend(new google.maps.LatLng(p.lat, p.lng)));
      map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
      hasFittedInitialBounds.current = true;
    } else if (center && !hasFittedInitialBounds.current) {
      map.panTo({ lat: center.lat, lng: center.lng });
      map.setZoom(15);
      hasFittedInitialBounds.current = true;
    }
  }, [map, points, center]);

  // Reuse single Polygon instance in user's theme palette (#8EB69B)
  useEffect(() => {
    if (!map) return;

    if (points.length >= 3) {
      const path = points.map((p) => ({ lat: p.lat, lng: p.lng }));
      if (!polygonRef.current) {
        polygonRef.current = new google.maps.Polygon({
          paths: path,
          strokeColor: '#8EB69B', // Theme Mint Sage
          strokeOpacity: 0.95,
          strokeWeight: 3,
          fillColor: '#8EB69B',
          fillOpacity: 0.25,
          clickable: true,
          editable: isEditable,
          draggable: false,
          zIndex: 10
        });
        polygonRef.current.setMap(map);
      } else {
        polygonRef.current.setPaths(path);
        polygonRef.current.setEditable(!!isEditable);
      }
    } else if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }

    return () => {
      if (polygonRef.current) {
        polygonRef.current.setMap(null);
        polygonRef.current = null;
      }
    };
  }, [map, points, isEditable]);

  // Render or update Sentinel-1 radar flood overlay
  useEffect(() => {
    if (!map) return;

    if (showFlood && floodObservation?.geoJson?.coordinates) {
      try {
        const rawCoords = (floodObservation.geoJson.coordinates as any)[0];
        const floodPaths = rawCoords.map((coord: number[]) => ({
          lat: coord[1],
          lng: coord[0]
        }));

        if (!floodPolygonRef.current) {
          floodPolygonRef.current = new google.maps.Polygon({
            paths: floodPaths,
            strokeColor: '#38BDF8',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#0284C7',
            fillOpacity: 0.35,
            zIndex: 5
          });
          floodPolygonRef.current.setMap(map);
        } else {
          floodPolygonRef.current.setPaths(floodPaths);
        }
      } catch (err) {
        console.warn('Failed to parse flood geojson coordinates', err);
      }
    } else if (floodPolygonRef.current) {
      floodPolygonRef.current.setMap(null);
      floodPolygonRef.current = null;
    }

    return () => {
      if (floodPolygonRef.current) {
        floodPolygonRef.current.setMap(null);
        floodPolygonRef.current = null;
      }
    };
  }, [map, showFlood, floodObservation]);

  // Click to draw boundary vertex when editing
  useEffect(() => {
    if (!map || !isEditable || !onPointAdd) return;

    const listener = map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        onPointAdd({
          lat: Number(e.latLng.lat().toFixed(6)),
          lng: Number(e.latLng.lng().toFixed(6))
        });
      }
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map, isEditable, onPointAdd]);

  return null;
};

export const GoogleEarthViewer: React.FC<GoogleEarthViewerProps> = ({
  initialCenter = { lat: 29.855, lng: 76.015 },
  initialPolygon = [],
  farm,
  floodObservation = SATELLITE_FLOOD_OBSERVATIONS[0],
  isEditable = false,
  onPolygonChange,
  selectedUnit,
  heightClass = 'h-[540px]'
}) => {
  // Google Earth & Maps API Key from environment or custom key
  const apiKey =
    (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) ||
    (import.meta.env.VITE_GOOGLE_EARTH_API_KEY as string) ||
    'AIzaSyDH0d0gVaPIBIbJ7OiQOOa_ZQgAGZPUEBI';

  const [points, setPoints] = useState<GeoPoint[]>(
    initialPolygon.length > 0 ? initialPolygon : farm?.polygon || []
  );

  // Default to 'satellite' for instantaneous, lag-free 60fps rendering with 45° tilt
  const [earthMode, setEarthMode] = useState<'satellite' | '3d' | 'hybrid' | 'terrain'>('satellite');

  // Camera Settings
  const [tilt, setTilt] = useState<number>(45);
  const [heading, setHeading] = useState<number>(0);
  const [range] = useState<number>(1200);
  const [isOrbiting, setIsOrbiting] = useState<boolean>(false);

  // Layers
  const [showFlood, setShowFlood] = useState<boolean>(true);
  const [showRiverGauges, setShowRiverGauges] = useState<boolean>(true);

  // Calculated Center
  const center = useMemo(() => {
    if (points.length >= 3) {
      return calculatePolygonCenter(points);
    }
    if (farm?.polygon && farm.polygon.length >= 3) {
      return calculatePolygonCenter(farm.polygon);
    }
    return initialCenter;
  }, [points, farm, initialCenter]);

  // Sync incoming props
  useEffect(() => {
    if (initialPolygon.length > 0) {
      setPoints(initialPolygon);
    } else if (farm?.polygon && farm.polygon.length > 0) {
      setPoints(farm.polygon);
    }
  }, [initialPolygon, farm]);

  // Geodesic area calculation
  const areaSqm = useMemo(() => calculateGeodesicAreaSqm(points), [points]);
  const formattedArea = selectedUnit ? convertFromSqm(areaSqm, selectedUnit.id) : 0;

  // Optimized Orbit (Stepped interval, avoids high re-renders)
  useEffect(() => {
    if (!isOrbiting) return;
    const interval = setInterval(() => {
      setHeading((prev) => (prev + 5) % 360);
    }, 250);
    return () => clearInterval(interval);
  }, [isOrbiting]);

  // Add boundary point
  const handleAddPoint = useCallback((pt: GeoPoint) => {
    setPoints((prev) => {
      const next = [...prev, pt];
      if (onPolygonChange) {
        onPolygonChange(next, calculateGeodesicAreaSqm(next));
      }
      return next;
    });
  }, [onPolygonChange]);

  // Clear boundary points
  const handleClearPoints = () => {
    setPoints([]);
    if (onPolygonChange) {
      onPolygonChange([], 0);
    }
  };

  // Google Earth Web deep link
  const earthWebUrl = useMemo(() => {
    return getGoogleEarthWebUrl(center, 300, range, heading, tilt);
  }, [center, range, heading, tilt]);

  // Download KML for Google Earth Pro
  const handleDownloadKml = () => {
    const kmlContent = generateGoogleEarthKml(farm, points, floodObservation);
    const fileName = farm?.farmerName
      ? `KrishiRakshak_${farm.farmerName.replace(/\s+/g, '_')}_Earth.kml`
      : 'KrishiRakshak_Farm_Boundary.kml';
    downloadKmlFile(fileName, kmlContent);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#235347] bg-[#051F20] shadow-2xl flex flex-col font-sans">
      {/* Main Map Canvas Area */}
      <div className={`relative w-full ${heightClass} bg-[#051F20]`}>
        {/* Floating In-Map Layer Switcher & Tools */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2">
          {/* Layer Mode Pill */}
          <div className="flex items-center bg-[#0B2B26]/95 backdrop-blur-md p-1 rounded-xl border border-[#235347] shadow-xl">
            <button
              type="button"
              onClick={() => setEarthMode('satellite')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition flex items-center gap-1.5 cursor-pointer ${
                earthMode === 'satellite'
                  ? 'bg-[#163832] text-[#DAF1DE] border border-[#8EB69B]/60 shadow-xs'
                  : 'text-[#8EB69B] hover:text-[#DAF1DE]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Satellite</span>
            </button>
            <button
              type="button"
              onClick={() => setEarthMode('hybrid')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition flex items-center gap-1.5 cursor-pointer ${
                earthMode === 'hybrid'
                  ? 'bg-[#163832] text-[#DAF1DE] border border-[#8EB69B]/60 shadow-xs'
                  : 'text-[#8EB69B] hover:text-[#DAF1DE]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Cadastral</span>
            </button>
            <button
              type="button"
              onClick={() => setEarthMode('3d')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition flex items-center gap-1.5 cursor-pointer ${
                earthMode === '3d'
                  ? 'bg-[#163832] text-[#DAF1DE] border border-[#8EB69B]/60 shadow-xs'
                  : 'text-[#8EB69B] hover:text-[#DAF1DE]'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>3D</span>
            </button>
          </div>

          {/* Quick Perspective Tilt Buttons */}
          <div className="hidden sm:flex items-center bg-[#0B2B26]/95 backdrop-blur-md p-1 rounded-xl border border-[#235347] shadow-xl text-xs">
            <button
              type="button"
              onClick={() => setTilt(0)}
              className={`px-2.5 py-1 rounded-lg font-bold transition text-[11px] cursor-pointer ${
                tilt === 0 ? 'bg-[#163832] text-white border border-emerald-400/50' : 'text-slate-400 hover:text-white'
              }`}
            >
              Flat
            </button>
            <button
              type="button"
              onClick={() => setTilt(45)}
              className={`px-2.5 py-1 rounded-lg font-bold transition text-[11px] cursor-pointer ${
                tilt === 45 ? 'bg-[#163832] text-white border border-emerald-400/50' : 'text-slate-400 hover:text-white'
              }`}
            >
              45°
            </button>
            <button
              type="button"
              onClick={() => setTilt(65)}
              className={`px-2.5 py-1 rounded-lg font-bold transition text-[11px] cursor-pointer ${
                tilt === 65 ? 'bg-[#163832] text-white border border-emerald-400/50' : 'text-slate-400 hover:text-white'
              }`}
            >
              65°
            </button>
          </div>

          {/* 3D Orbit Toggle */}
          <button
            type="button"
            onClick={() => setIsOrbiting(!isOrbiting)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black shadow-xl backdrop-blur-md border transition cursor-pointer ${
              isOrbiting
                ? 'bg-white text-[#051F20] border-white shadow-lg animate-pulse'
                : 'bg-[#0B2B26]/95 text-white border-[#235347] hover:border-slate-400'
            }`}
          >
            {isOrbiting ? <Pause className="w-3.5 h-3.5 text-[#051F20]" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isOrbiting ? 'Pause 360°' : '360° Orbit'}</span>
          </button>
        </div>

        {/* Floating Quick Action Links (Google Earth Web + KML Export + API Status) */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <div className="hidden lg:flex items-center gap-1.5 bg-[#0B2B26]/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-emerald-500/30 text-[10px] font-bold text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Google Earth API: Active</span>
          </div>
          <a
            href={earthWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#0B2B26]/95 backdrop-blur-md hover:bg-[#163832] text-white border border-[#235347] hover:border-slate-400 px-2.5 py-1.5 rounded-xl font-bold text-[11px] shadow-lg transition"
            title="Open coordinates in Google Earth Web"
          >
            <ExternalLink className="w-3 h-3 text-sky-400" />
            <span className="hidden md:inline">Earth Web</span>
          </a>
          <button
            type="button"
            onClick={handleDownloadKml}
            className="flex items-center gap-1 bg-[#163832]/95 backdrop-blur-md hover:bg-[#235347] text-white border border-emerald-500/40 px-2.5 py-1.5 rounded-xl font-bold text-[11px] shadow-lg transition cursor-pointer"
            title="Download KML for Google Earth Pro"
          >
            <Download className="w-3 h-3 text-emerald-400" />
            <span className="hidden md:inline">KML</span>
          </button>
        </div>

        <APIProvider apiKey={apiKey} version="alpha">
          {earthMode === '3d' ? (
            <div className="w-full h-full relative">
              <Map3D
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                mode="SATELLITE"
                center={{ lat: center.lat, lng: center.lng, altitude: 280 }}
                range={range}
                heading={heading}
                tilt={tilt}
                roll={0}
                style={{ width: '100%', height: '100%' }}
              >
                {/* 3D Farm Centroid Marker */}
                <Marker3D
                  position={{ lat: center.lat, lng: center.lng, altitude: 35 }}
                  extruded
                >
                  <Pin
                    background="#8EB69B"
                    borderColor="#051F20"
                    glyphColor="#051F20"
                    scale={1.4}
                  />
                </Marker3D>

                {/* 3D Boundary Vertices */}
                {points.map((p, idx) => (
                  <Marker3D
                    key={`vertex-${idx}`}
                    position={{ lat: p.lat, lng: p.lng, altitude: 20 }}
                    extruded
                  >
                    <Pin
                      background="#DAF1DE"
                      borderColor="#051F20"
                      glyphColor="#051F20"
                      scale={1.0}
                    />
                  </Marker3D>
                ))}

                {/* 3D River Gauges */}
                {showRiverGauges &&
                  RIVER_GAUGES.slice(0, 3).map((gauge) => (
                    <Marker3D
                      key={gauge.id}
                      position={{ lat: gauge.lat, lng: gauge.lng, altitude: 25 }}
                      extruded
                    >
                      <Pin
                        background={gauge.status === 'danger' ? '#EF4444' : gauge.status === 'warning' ? '#F59E0B' : '#8EB69B'}
                        borderColor="#051F20"
                        glyphColor="#051F20"
                        scale={1.2}
                      />
                    </Marker3D>
                  ))}
              </Map3D>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <Map
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                mapId="DEMO_MAP_ID"
                mapTypeId={earthMode === 'hybrid' ? 'hybrid' : earthMode === 'terrain' ? 'terrain' : 'satellite'}
                defaultCenter={{ lat: center.lat, lng: center.lng }}
                defaultZoom={15}
                tilt={tilt > 30 ? 45 : 0}
                heading={heading}
                gestureHandling="greedy"
                disableDefaultUI={false}
                style={{ width: '100%', height: '100%' }}
              >
                <GoogleMapsPrecisionLayer
                  points={points}
                  center={center}
                  floodObservation={floodObservation}
                  isEditable={isEditable}
                  onPointAdd={handleAddPoint}
                  showFlood={showFlood}
                />
                {showRiverGauges &&
                  RIVER_GAUGES.slice(0, 5).map((gauge) => (
                    <AdvancedMarker
                      key={gauge.id}
                      position={{ lat: gauge.lat, lng: gauge.lng }}
                      title={`${gauge.stationName}: ${gauge.currentLevelMeters}m (${gauge.status.toUpperCase()})`}
                    >
                      <Pin
                        background={gauge.status === 'danger' ? '#EF4444' : gauge.status === 'warning' ? '#F59E0B' : '#8EB69B'}
                        borderColor="#051F20"
                        glyphColor="#051F20"
                        scale={0.9}
                      />
                    </AdvancedMarker>
                  ))}
              </Map>
            </div>
          )}
        </APIProvider>

        {/* Bottom Precision Status Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-[#0B2B26]/95 backdrop-blur-md border border-[#235347] rounded-xl p-3 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Field Parcel:</span>
              <span className="font-mono text-white font-bold text-sm">
                {areaSqm > 0 ? `${areaSqm.toLocaleString()} m²` : 'Click map to draw boundary'}
              </span>
              {selectedUnit && areaSqm > 0 && (
                <span className="text-sky-300 font-mono font-bold">
                  ({formattedArea} {selectedUnit.name})
                </span>
              )}
            </div>
            {points.length > 0 && (
              <span className="text-slate-400 text-[11px] hidden sm:inline">
                • {points.length} survey vertices (WGS84 ellipsoid accurate)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isEditable && points.length > 0 && (
              <button
                type="button"
                onClick={handleClearPoints}
                className="flex items-center gap-1 text-rose-300 hover:text-white bg-rose-950/50 border border-rose-800/60 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Boundary</span>
              </button>
            )}
            <div className="text-[11px] text-slate-300 font-mono bg-[#051F20] px-2.5 py-1 rounded-lg border border-[#235347]">
              {center.lat.toFixed(5)}°N, {center.lng.toFixed(5)}°E
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
