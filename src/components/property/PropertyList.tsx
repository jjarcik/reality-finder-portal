
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { fetchProperties, setFilters, Property } from "../../store/propertySlice";
import PropertyCard from "./PropertyCard";
import { Building, SlidersHorizontal, X, CheckCircle2 } from "lucide-react";

const PropertyList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredProperties, loading, error, filters } = useSelector(
    (state: RootState) => state.properties
  );
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Extract search parameters
  useEffect(() => {
    const newFilters: { [key: string]: any } = {};
    
    // Location filter
    const location = searchParams.get("location");
    if (location) newFilters.location = location;
    
    // Property type filter
    const propertyType = searchParams.get("propertyType");
    if (propertyType) newFilters.propertyType = propertyType;
    
    // Transaction type filter
    const type = searchParams.get("type");
    if (type) newFilters.type = type === "rent" ? "rent" : "sale";
    
    // Price filters
    const priceMin = searchParams.get("priceMin");
    if (priceMin) newFilters.priceMin = Number(priceMin);
    
    const priceMax = searchParams.get("priceMax");
    if (priceMax) newFilters.priceMax = Number(priceMax);
    
    // Bedrooms and bathrooms filters
    const bedrooms = searchParams.get("bedrooms");
    if (bedrooms) newFilters.bedrooms = Number(bedrooms);
    
    const bathrooms = searchParams.get("bathrooms");
    if (bathrooms) newFilters.bathrooms = Number(bathrooms);
    
    // Apply filters
    dispatch(setFilters(newFilters));
  }, [searchParams, dispatch]);

  // Fetch properties on component mount
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  // Toggle filters sidebar on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Helper to check if any filters are active
  const hasActiveFilters = () => {
    return Object.values(filters).some(
      (value) => value !== null && value !== 0
    );
  };

  // Count active filters
  const countActiveFilters = () => {
    return Object.values(filters).filter(
      (value) => value !== null && value !== 0
    ).length;
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar Toggle on Mobile */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <button
            onClick={toggleFilters}
            className="flex items-center px-4 py-2 bg-muted rounded-lg text-foreground"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <span>Filters</span>
            {hasActiveFilters() && (
              <span className="ml-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {countActiveFilters()}
              </span>
            )}
          </button>
          
          <span className="text-muted-foreground">
            {filteredProperties.length} properties found
          </span>
        </div>
        
        {/* Filters Sidebar */}
        <aside 
          className={`md:w-1/4 lg:w-1/5 transition-all duration-300 ease-in-out ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <div className="p-6 bg-white rounded-xl shadow-sm sticky top-20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Filters</h3>
              <button
                onClick={toggleFilters}
                className="md:hidden text-muted-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Property Type Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Property Type</h4>
              <div className="space-y-2">
                {["apartment", "house", "condo", "villa"].map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`type-${type}`}
                      className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                      checked={filters.propertyType === type}
                      onChange={() => {
                        dispatch(
                          setFilters({
                            propertyType: filters.propertyType === type ? null : type,
                          })
                        );
                      }}
                    />
                    <label htmlFor={`type-${type}`} className="ml-2 text-sm capitalize">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="min-price" className="block text-xs text-muted-foreground mb-1">
                    Min Price
                  </label>
                  <input
                    type="number"
                    id="min-price"
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                    value={filters.priceMin || ""}
                    onChange={(e) => {
                      const value = e.target.value ? Number(e.target.value) : 0;
                      dispatch(setFilters({ priceMin: value }));
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="max-price" className="block text-xs text-muted-foreground mb-1">
                    Max Price
                  </label>
                  <input
                    type="number"
                    id="max-price"
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                    value={filters.priceMax || ""}
                    onChange={(e) => {
                      const value = e.target.value ? Number(e.target.value) : null;
                      dispatch(setFilters({ priceMax: value }));
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Bedrooms Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Bedrooms</h4>
              <div className="flex space-x-2">
                {[null, 1, 2, 3, 4, 5].map((value, index) => (
                  <button
                    key={index}
                    className={`flex-1 py-1 px-2 text-center text-sm rounded-md transition-colors ${
                      filters.bedrooms === value
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    onClick={() => dispatch(setFilters({ bedrooms: value }))}
                  >
                    {value === null ? "Any" : value === 5 ? "5+" : value}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Bathrooms Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Bathrooms</h4>
              <div className="flex space-x-2">
                {[null, 1, 2, 3, 4].map((value, index) => (
                  <button
                    key={index}
                    className={`flex-1 py-1 px-2 text-center text-sm rounded-md transition-colors ${
                      filters.bathrooms === value
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    onClick={() => dispatch(setFilters({ bathrooms: value }))}
                  >
                    {value === null ? "Any" : value === 4 ? "4+" : value}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Transaction Type */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">For Sale / Rent</h4>
              <div className="flex space-x-2">
                <button
                  className={`flex-1 py-2 px-4 text-center rounded-md transition-colors ${
                    filters.type === null
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  onClick={() => dispatch(setFilters({ type: null }))}
                >
                  All
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-center rounded-md transition-colors ${
                    filters.type === "sale"
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  onClick={() => dispatch(setFilters({ type: "sale" }))}
                >
                  For Sale
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-center rounded-md transition-colors ${
                    filters.type === "rent"
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  onClick={() => dispatch(setFilters({ type: "rent" }))}
                >
                  For Rent
                </button>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Property Listings */}
        <div className="flex-1">
          {/* Desktop Header with Results Count */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Property Listings</h2>
            <span className="text-muted-foreground">
              {filteredProperties.length} properties found
            </span>
          </div>
          
          {/* Active Filters Display */}
          {hasActiveFilters() && (
            <div className="bg-muted/50 rounded-lg p-3 mb-6 flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium mr-2">Active filters:</span>
              {filters.location && (
                <span className="bg-white px-3 py-1 rounded-full text-xs flex items-center">
                  Location: {filters.location}
                  <button
                    onClick={() => dispatch(setFilters({ location: null }))}
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.propertyType && (
                <span className="bg-white px-3 py-1 rounded-full text-xs flex items-center">
                  Type: {filters.propertyType}
                  <button
                    onClick={() => dispatch(setFilters({ propertyType: null }))}
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.type && (
                <span className="bg-white px-3 py-1 rounded-full text-xs flex items-center">
                  {filters.type === "sale" ? "For Sale" : "For Rent"}
                  <button
                    onClick={() => dispatch(setFilters({ type: null }))}
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.bedrooms && (
                <span className="bg-white px-3 py-1 rounded-full text-xs flex items-center">
                  Bedrooms: {filters.bedrooms}+
                  <button
                    onClick={() => dispatch(setFilters({ bedrooms: null }))}
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.bathrooms && (
                <span className="bg-white px-3 py-1 rounded-full text-xs flex items-center">
                  Bathrooms: {filters.bathrooms}+
                  <button
                    onClick={() => dispatch(setFilters({ bathrooms: null }))}
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {(filters.priceMin > 0 || filters.priceMax) && (
                <span className="bg-white px-3 py-1 rounded-full text-xs flex items-center">
                  Price: ${filters.priceMin || 0} - ${filters.priceMax || "Any"}
                  <button
                    onClick={() => dispatch(setFilters({ priceMin: 0, priceMax: null }))}
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Properties Grid */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-pulse text-center">
                <Building className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p>Loading properties...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-destructive p-8 bg-destructive/10 rounded-lg">
              <p>Error loading properties. Please try again later.</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center p-12 bg-muted/30 rounded-lg">
              <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any properties with your current filters. Try adjusting your search criteria.
              </p>
              <button
                onClick={() => dispatch(setFilters(initialFilters))}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
              {filteredProperties.map((property: Property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Initial filter state
const initialFilters = {
  priceMin: 0,
  priceMax: null,
  bedrooms: null,
  bathrooms: null,
  propertyType: null,
  type: null,
  location: null,
};

export default PropertyList;
