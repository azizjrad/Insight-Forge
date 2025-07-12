import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { MapPin, Users, TrendingUp, Info } from "lucide-react";

interface WorldMapProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
}

interface CountryData {
  name: string;
  value: number;
  color?: string;
  countryName?: string;
  code?: string;
}

interface Geography {
  properties: {
    NAME?: string;
    NAME_EN?: string;
    ISO_A3?: string;
    [key: string]: string | number | undefined;
  };
  rsmKey: string;
}

interface Position {
  coordinates: [number, number];
  zoom: number;
}

// Using a more reliable world topology source with fallback
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@3/countries-110m.json";
const fallbackGeoUrl =
  "https://raw.githubusercontent.com/topojson/world-atlas/master/countries-110m.json";

// Country code mapping for better matching
const countryCodeMap: { [key: string]: string } = {
  "United States": "USA",
  USA: "USA",
  "United Kingdom": "GBR",
  UK: "GBR",
  Germany: "DEU",
  France: "FRA",
  Canada: "CAN",
  Australia: "AUS",
  Japan: "JPN",
  China: "CHN",
  India: "IND",
  Brazil: "BRA",
  "South Korea": "KOR",
  Netherlands: "NLD",
  Spain: "ESP",
  Italy: "ITA",
  Switzerland: "CHE",
  Sweden: "SWE",
  Norway: "NOR",
  Denmark: "DNK",
  Finland: "FIN",
  Belgium: "BEL",
  Austria: "AUT",
  Russia: "RUS",
  Mexico: "MEX",
  Argentina: "ARG",
  Chile: "CHL",
  Colombia: "COL",
  Peru: "PER",
  Venezuela: "VEN",
  Ecuador: "ECU",
  Bolivia: "BOL",
  Uruguay: "URY",
  Paraguay: "PRY",
  Guyana: "GUY",
  Suriname: "SUR",
  "French Guiana": "GUF",
};

const useWorldMapData = (data: WorldMapProps["data"]) => {
  // Create a map of country data for quick lookup
  const dataMap = new Map<string, CountryData>();

  data.forEach((item) => {
    // Add multiple possible keys for better matching
    const cleanName = item.name.trim();
    const code =
      countryCodeMap[cleanName] || cleanName.toUpperCase().slice(0, 3);

    // Store data with multiple keys for better matching
    dataMap.set(code, item);
    dataMap.set(cleanName.toUpperCase(), item);
    dataMap.set(cleanName, item);

    // Add common name variations
    if (cleanName === "USA" || cleanName === "United States") {
      dataMap.set("UNITED STATES", item);
      dataMap.set("USA", item);
      dataMap.set("US", item);
    }
    if (cleanName === "UK" || cleanName === "United Kingdom") {
      dataMap.set("UNITED KINGDOM", item);
      dataMap.set("UK", item);
      dataMap.set("GBR", item);
    }
  });

  // Get max value for color scaling
  const maxValue = Math.max(...data.map((d) => d.value));

  // Sort data by value in descending order
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return { dataMap, maxValue, sortedData };
};

const WorldMapControls: React.FC<{
  position: Position;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}> = ({ onZoomIn, onZoomOut, onReset }) => (
  <div className="absolute top-4 right-4 flex flex-col gap-2">
    <button
      onClick={onZoomIn}
      className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-gray-200 hover:bg-white transition-colors"
      title="Zoom In"
    >
      <TrendingUp size={16} className="text-gray-700" />
    </button>
    <button
      onClick={onZoomOut}
      className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-gray-200 hover:bg-white transition-colors"
      title="Zoom Out"
    >
      <TrendingUp size={16} className="text-gray-700 rotate-180" />
    </button>
    <button
      onClick={onReset}
      className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-gray-200 hover:bg-white transition-colors"
      title="Reset View"
    >
      <MapPin size={16} className="text-gray-700" />
    </button>
  </div>
);

const MapLegend: React.FC = () => (
  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
      <Info size={14} />
      Guest Distribution
    </h4>
    <div className="flex items-center gap-3 text-xs">
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 bg-blue-200 rounded"></div>
        <span>Low</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 bg-blue-400 rounded"></div>
        <span>Medium</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 bg-blue-600 rounded"></div>
        <span>High</span>
      </div>
    </div>
  </div>
);

const SelectedCountryDetails: React.FC<{
  selectedCountry: CountryData;
  data: WorldMapProps["data"];
  sortedData: CountryData[];
  onClose: () => void;
}> = ({ selectedCountry, data, sortedData, onClose }) => (
  <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
    <div className="flex items-center justify-between mb-3">
      <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <MapPin size={18} className="text-blue-600" />
        {selectedCountry.countryName || selectedCountry.name}
      </h4>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 transition-colors"
      >
        ×
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <Users size={16} className="text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            Total Guests
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {selectedCountry.value.toLocaleString()}
        </p>
      </div>
      <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={16} className="text-green-600" />
          <span className="text-sm font-medium text-gray-700">
            Market Share
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {(
            (selectedCountry.value /
              data.reduce((sum, item) => sum + item.value, 0)) *
            100
          ).toFixed(1)}
          %
        </p>
      </div>
      <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <Info size={16} className="text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Ranking</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          #
          {sortedData.findIndex((item) => item.name === selectedCountry.name) +
            1}
        </p>
      </div>
    </div>
  </div>
);

// Simple grid visualization as fallback
const SimpleCountryGrid: React.FC<{ data: WorldMapProps["data"] }> = ({
  data,
}) => (
  <div className="h-96 w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 overflow-hidden">
    <div className="h-full flex flex-col">
      <div className="text-center mb-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          Guest Distribution by Country
        </h4>
        <p className="text-sm text-gray-600">
          Interactive map unavailable - showing data grid
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto">
        {data.slice(0, 20).map((country, index) => (
          <div
            key={country.name}
            className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow border-l-4"
            style={{ borderLeftColor: country.color || "#3b82f6" }}
          >
            <div className="text-sm font-medium text-gray-900 mb-1">
              {country.name}
            </div>
            <div className="text-lg font-bold text-gray-700">
              {country.value.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">#{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Main WorldMap component
const WorldMap: React.FC<WorldMapProps> = ({ data }) => {
  const { dataMap, maxValue, sortedData } = useWorldMapData(data);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [position, setPosition] = useState<Position>({
    coordinates: [0, 0],
    zoom: 1,
  });
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const [currentGeoUrl, setCurrentGeoUrl] = useState(geoUrl);

  // Add a timeout to handle cases where onLoad doesn't fire
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapLoading && !mapError) {
        console.warn("Map loading timeout - forcing load completion");
        setMapLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timer);
  }, [mapLoading, mapError]);

  // Debug the data being passed to the map
  useEffect(() => {
    console.log("WorldMap received data:", data);
    console.log("Processed countries:", sortedData.slice(0, 5));
  }, [data, sortedData]);

  // Function to get country data with improved matching
  const getCountryData = (geo: Geography): CountryData | null => {
    const name = geo.properties.NAME || geo.properties.NAME_EN || "";
    const code = geo.properties.ISO_A3 || "";

    // Try multiple matching strategies
    let countryData = null;

    // Try ISO code first
    if (code) {
      countryData = dataMap.get(code);
    }

    // Try exact name match
    if (!countryData && name) {
      countryData = dataMap.get(name) || dataMap.get(name.toUpperCase());
    }

    // Try partial matching for common country name variations
    if (!countryData && name) {
      const lowerName = name.toLowerCase();

      // Special cases for common mismatches
      if (
        lowerName.includes("united states") ||
        lowerName.includes("america")
      ) {
        countryData = dataMap.get("USA") || dataMap.get("UNITED STATES");
      } else if (
        lowerName.includes("united kingdom") ||
        lowerName.includes("britain")
      ) {
        countryData = dataMap.get("UK") || dataMap.get("UNITED KINGDOM");
      } else if (lowerName.includes("korea") && lowerName.includes("south")) {
        countryData = dataMap.get("SOUTH KOREA");
      }
    }

    return countryData;
  };

  // Function to get country color based on guest count
  const getCountryColor = (geo: Geography): string => {
    const countryData = getCountryData(geo);
    if (!countryData) return "#f3f4f6";

    const intensity = countryData.value / maxValue;
    const opacity = Math.max(0.3, intensity);

    // Use a blue gradient for the heatmap
    return `rgba(59, 130, 246, ${opacity})`;
  };

  const handleCountryClick = (geo: Geography): void => {
    const countryData = getCountryData(geo);
    if (countryData) {
      setSelectedCountry({
        ...countryData,
        countryName: geo.properties.NAME || geo.properties.NAME_EN || "",
        code: geo.properties.ISO_A3 || "",
      });
    }
  };

  const handleCountryHover = (geo: Geography): void => {
    const countryData = getCountryData(geo);
    if (countryData) {
      const countryName =
        geo.properties.NAME || geo.properties.NAME_EN || "Unknown";
      setHoveredCountry(`${countryName}: ${countryData.value} guests`);
    } else {
      setHoveredCountry(null);
    }
  };

  const handleZoomIn = (): void => {
    setPosition({ ...position, zoom: Math.min(position.zoom * 1.5, 4) });
  };

  const handleZoomOut = (): void => {
    setPosition({ ...position, zoom: Math.max(position.zoom / 1.5, 1) });
  };

  const handleReset = (): void => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  };

  const handleMapError = (): void => {
    console.error("Map loading error with URL:", currentGeoUrl);
    if (currentGeoUrl === geoUrl) {
      // Try fallback URL
      console.log("Attempting fallback URL:", fallbackGeoUrl);
      setCurrentGeoUrl(fallbackGeoUrl);
      setMapLoading(true);
      setMapError(false);
    } else {
      console.error("Both primary and fallback URLs failed");
      setMapError(true);
      setMapLoading(false);
    }
  };

  const handleMapLoad = (): void => {
    console.log("Map loaded successfully with URL:", currentGeoUrl);
    setMapLoading(false);
    setMapError(false);
  };

  const retryMapLoad = (): void => {
    setMapError(false);
    setMapLoading(true);
    setCurrentGeoUrl(geoUrl); // Reset to primary URL
  };

  return (
    <div className="relative">
      {/* Selected Country Details */}
      {selectedCountry && (
        <SelectedCountryDetails
          selectedCountry={selectedCountry}
          data={data}
          sortedData={sortedData}
          onClose={() => setSelectedCountry(null)}
        />
      )}

      {/* Interactive World Map */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
        <div className="h-96 w-full relative">
          {mapError ? (
            <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="text-gray-400 mb-2">
                  <MapPin size={48} />
                </div>
                <p className="text-gray-600 font-medium">
                  Unable to load interactive map
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Showing data in list format below
                </p>
                <button
                  onClick={retryMapLoad}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry Map
                </button>
              </div>
            </div>
          ) : (
            <>
              {mapLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">
                      Loading world map...
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Using:{" "}
                      {currentGeoUrl.includes("jsdelivr")
                        ? "Primary"
                        : "Fallback"}{" "}
                      source
                    </p>
                  </div>
                </div>
              )}
              <ComposableMap
                projection="geoNaturalEarth1"
                projectionConfig={{
                  scale: 140,
                }}
                style={{ width: "100%", height: "100%" }}
                onError={handleMapError}
              >
                <ZoomableGroup
                  zoom={position.zoom}
                  center={position.coordinates}
                  onMoveEnd={setPosition}
                >
                  <Geographies
                    geography={currentGeoUrl}
                    onError={handleMapError}
                    onLoad={handleMapLoad}
                  >
                    {({ geographies }: { geographies: Geography[] }) =>
                      geographies.map((geo: Geography) => {
                        const countryData = getCountryData(geo);
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={getCountryColor(geo)}
                            stroke="#e5e7eb"
                            strokeWidth={0.5}
                            style={{
                              default: {
                                outline: "none",
                              },
                              hover: {
                                fill: countryData ? "#3b82f6" : "#f3f4f6",
                                stroke: "#1d4ed8",
                                strokeWidth: 1.5,
                                outline: "none",
                                cursor: countryData ? "pointer" : "default",
                              },
                              pressed: {
                                fill: "#1e40af",
                                stroke: "#1d4ed8",
                                strokeWidth: 2,
                                outline: "none",
                              },
                            }}
                            onClick={() => handleCountryClick(geo)}
                            onMouseEnter={() => handleCountryHover(geo)}
                            onMouseLeave={() => setHoveredCountry(null)}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </>
          )}
        </div>

        {/* Hover Tooltip */}
        {hoveredCountry && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200 z-10">
            <p className="text-sm font-medium text-gray-900">
              {hoveredCountry}
            </p>
          </div>
        )}

        <WorldMapControls
          position={position}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
        />

        <MapLegend />
      </div>

      {/* Selected Country Details */}
      {selectedCountry && (
        <SelectedCountryDetails
          selectedCountry={selectedCountry}
          data={data}
          sortedData={sortedData}
          onClose={() => setSelectedCountry(null)}
        />
      )}

      {/* Top Countries List */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users size={18} className="text-blue-600" />
          Top Guest Nationalities
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sortedData.slice(0, 9).map((country, index) => (
            <div
              key={index}
              className="flex items-center p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-200/50 hover:shadow-md transition-all duration-200 cursor-pointer"
              style={{
                borderLeft: `4px solid ${country.color}`,
              }}
              onClick={() =>
                setSelectedCountry({
                  ...country,
                  countryName: country.name,
                })
              }
            >
              <div className="flex items-center flex-1">
                <div
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: country.color }}
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900">
                    {country.name}
                  </span>
                  <div className="text-xs text-gray-500">
                    {(
                      (country.value /
                        data.reduce((sum, item) => sum + item.value, 0)) *
                      100
                    ).toFixed(1)}
                    % of total
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">
                  {country.value.toLocaleString()}
                </span>
                <div className="text-xs text-gray-500">#{index + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
