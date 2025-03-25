
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ArrowRight } from "lucide-react";

const BasicSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [transactionType, setTransactionType] = useState("all");
  
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchTerm) params.append("location", searchTerm);
    if (propertyType !== "all") params.append("propertyType", propertyType);
    if (transactionType !== "all") params.append("type", transactionType);
    
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form 
        onSubmit={handleSearch}
        className="glass p-6 rounded-xl shadow-lg"
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-1">Find Your Dream Property</h2>
          <p className="text-muted-foreground">Search our properties with a simple search</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Location Input */}
          <div className="relative md:col-span-5">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Enter location, city or address"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-transparent bg-white/80 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          
          {/* Property Type Select */}
          <div className="md:col-span-3">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-transparent bg-white/80 focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-colors"
            >
              <option value="all">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="villa">Villa</option>
            </select>
          </div>
          
          {/* Transaction Type Select */}
          <div className="md:col-span-2">
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-transparent bg-white/80 focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-colors"
            >
              <option value="all">Buy/Rent</option>
              <option value="sale">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          
          {/* Search Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full h-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </button>
          </div>
        </div>
        
        {/* Link to Advanced Search */}
        <div className="mt-4 text-right">
          <a
            href="/advanced-search"
            className="inline-flex items-center text-primary hover:text-primary/80 text-sm transition-colors"
          >
            Advanced Search Options
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </form>
    </div>
  );
};

export default BasicSearch;
