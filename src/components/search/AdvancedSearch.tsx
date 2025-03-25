
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Building, ArrowRight, RefreshCw } from "lucide-react";

const AdvancedSearch = () => {
  const [formData, setFormData] = useState({
    location: "",
    type: "all",
    propertyType: "all",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    features: [] as string[],
  });
  
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => {
      const features = [...prev.features];
      if (features.includes(feature)) {
        return {
          ...prev,
          features: features.filter((f) => f !== feature),
        };
      } else {
        return {
          ...prev,
          features: [...features, feature],
        };
      }
    });
  };

  const handleReset = () => {
    setFormData({
      location: "",
      type: "all",
      propertyType: "all",
      priceMin: "",
      priceMax: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      features: [],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    
    if (formData.location) params.append("location", formData.location);
    if (formData.type !== "all") params.append("type", formData.type);
    if (formData.propertyType !== "all") params.append("propertyType", formData.propertyType);
    if (formData.priceMin) params.append("priceMin", formData.priceMin);
    if (formData.priceMax) params.append("priceMax", formData.priceMax);
    if (formData.bedrooms) params.append("bedrooms", formData.bedrooms);
    if (formData.bathrooms) params.append("bathrooms", formData.bathrooms);
    if (formData.area) params.append("area", formData.area);
    if (formData.features.length > 0) {
      params.append("features", formData.features.join(","));
    }
    
    navigate(`/properties?${params.toString()}`);
  };

  const features = [
    "Balcony",
    "Parking",
    "Gym",
    "Pool",
    "Garden",
    "Garage",
    "Fireplace",
    "Central AC",
    "Doorman",
    "Elevator",
    "Fitness Center",
    "Rooftop Terrace",
    "Private Beach",
    "Home Theater",
    "Wine Cellar",
    "Smart Home",
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Advanced Property Search</h1>
        <p className="text-muted-foreground">
          Use our advanced search options to find exactly what you're looking for
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-2">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="City, neighborhood, or address"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            
            {/* Property Type */}
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium mb-2">
                Property Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-muted-foreground" />
                </div>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                >
                  <option value="all">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="villa">Villa</option>
                </select>
              </div>
            </div>
            
            {/* Sale/Rent */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-2">
                For Sale / Rent
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
              >
                <option value="all">Both</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
            
            {/* Price Range */}
            <div>
              <label htmlFor="priceMin" className="block text-sm font-medium mb-2">
                Min Price
              </label>
              <input
                type="number"
                id="priceMin"
                name="priceMin"
                placeholder="Min Price"
                value={formData.priceMin}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="priceMax" className="block text-sm font-medium mb-2">
                Max Price
              </label>
              <input
                type="number"
                id="priceMax"
                name="priceMax"
                placeholder="Max Price"
                value={formData.priceMax}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            
            {/* Bedrooms */}
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium mb-2">
                Bedrooms
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            
            {/* Bathrooms */}
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium mb-2">
                Bathrooms
              </label>
              <select
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            
            {/* Area */}
            <div>
              <label htmlFor="area" className="block text-sm font-medium mb-2">
                Min Area (sq ft)
              </label>
              <input
                type="number"
                id="area"
                name="area"
                placeholder="Min Area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          
          {/* Features */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`feature-${feature}`}
                    checked={formData.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <label
                    htmlFor={`feature-${feature}`}
                    className="ml-2 text-sm"
                  >
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="order-2 sm:order-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 bg-white text-muted-foreground font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Filters
            </button>
            
            <button
              type="submit"
              className="order-1 sm:order-2 inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </button>
          </div>
        </form>
      </div>
      
      {/* Quick Search Links */}
      <div className="mt-10">
        <h3 className="text-center text-lg font-medium mb-6">Quick Searches</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <a 
            href="/properties?type=sale&propertyType=apartment"
            className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
          >
            <span>Apartments for Sale</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </a>
          
          <a 
            href="/properties?type=rent&propertyType=apartment"
            className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
          >
            <span>Apartments for Rent</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </a>
          
          <a 
            href="/properties?type=sale&propertyType=house"
            className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
          >
            <span>Houses for Sale</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </a>
          
          <a 
            href="/properties?type=rent&propertyType=house"
            className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
          >
            <span>Houses for Rent</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
