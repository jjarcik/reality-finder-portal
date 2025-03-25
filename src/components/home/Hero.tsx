
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

const Hero = () => {
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
    <div className="relative min-h-screen flex flex-col justify-center items-center text-center p-4 md:p-8">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')",
          filter: "brightness(0.7)"
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full animate-slide-down">
        {/* Hero Text */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Find Your Dream Property
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Discover the perfect home with our extensive selection of properties for sale and rent
        </p>
        
        {/* Search Form */}
        <form 
          onSubmit={handleSearch}
          className="glass p-4 md:p-6 rounded-xl max-w-3xl mx-auto shadow-lg"
        >
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
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-transparent bg-white/80 focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-foreground"
              />
            </div>
            
            {/* Property Type Select */}
            <div className="md:col-span-3">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-transparent bg-white/80 focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-colors text-foreground"
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
                className="w-full px-4 py-3 rounded-lg border border-transparent bg-white/80 focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-colors text-foreground"
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
          <div className="mt-4 text-center">
            <a
              href="/advanced-search"
              className="text-white hover:text-primary text-sm underline transition-colors"
            >
              Advanced Search Options
            </a>
          </div>
        </form>
      </div>
      
      {/* Scrolling hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white flex justify-center items-start p-1">
          <div className="w-1 h-3 bg-white rounded-full animate-pulse-subtle"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
