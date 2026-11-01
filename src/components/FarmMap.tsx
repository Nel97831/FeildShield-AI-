import React from 'react';
import { GeoPoint, LandUnit } from '../types';
import { getDistrictCoordinates } from '../data/districtCoordinates';
import { GoogleEarthViewer } from './GoogleEarthViewer';
import { SATELLITE_FLOOD_OBSERVATIONS } from '../data/mockFloodData';

interface FarmMapProps {
  initialCenter?: GeoPoint;
  initialPolygon?: GeoPoint[];
  selectedDistrict?: string;
  selectedState?: string;
  autoCenterOnDistrict?: boolean;
  onDistrictChange?: (district: string) => void;
  isEditable?: boolean;
  onPolygonChange?: (points: GeoPoint[], areaSqm: number) => void;
  showFloodOverlays?: boolean;
  showRiverGauges?: boolean;
  selectedUnit?: LandUnit;
  heightClass?: string;
}

/**
 * FarmMap: Fully overwritten with Google Earth (Satellite & 3D) directly.
 * Provides lag-free 60fps rendering, geodesic area accuracy, and cadastral demarcation.
 */
export const FarmMap: React.FC<FarmMapProps> = ({
  initialCenter = { lat: 29.855, lng: 76.015 },
  initialPolygon = [],
  selectedDistrict,
  selectedState,
  isEditable = false,
  onPolygonChange,
  showFloodOverlays = true,
  selectedUnit,
  heightClass = 'h-[480px]'
}) => {
  const effectiveCenter = selectedDistrict
    ? getDistrictCoordinates(selectedDistrict, selectedState)
    : initialCenter;

  return (
    <div className="w-full">
      <GoogleEarthViewer
        initialCenter={effectiveCenter}
        initialPolygon={initialPolygon}
        floodObservation={showFloodOverlays ? SATELLITE_FLOOD_OBSERVATIONS[0] : null}
        isEditable={isEditable}
        onPolygonChange={onPolygonChange}
        selectedUnit={selectedUnit}
        heightClass={heightClass}
      />
    </div>
  );
};
