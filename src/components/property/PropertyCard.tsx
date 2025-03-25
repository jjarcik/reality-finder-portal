
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square, Tag } from "lucide-react";
import { Property } from "../../store/propertySlice";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, featured = false }) => {
  const {
    id,
    title,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    type,
    images,
  } = property;

  // Format price based on whether it's for rent or sale
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

  // Get the display price with the appropriate suffix
  const displayPrice = type === "rent" ? `${formattedPrice}/mo` : formattedPrice;

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-card property-card 
      ${featured ? "animate-scale-in" : ""} transition-all duration-300`}
    >
      {/* Property Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
        {/* Property Type Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            type === "sale" 
              ? "bg-green-500 text-white" 
              : "bg-blue-500 text-white"
          }`}>
            {type === "sale" ? "For Sale" : "For Rent"}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        {/* Price */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-primary">{displayPrice}</h3>
          <Tag className="h-5 w-5 text-muted-foreground" />
        </div>
        
        {/* Title */}
        <h2 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h2>
        
        {/* Location */}
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{location}</span>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-100 my-4"></div>
        
        {/* Features */}
        <div className="flex justify-between items-center">
          <div className="flex items-center text-muted-foreground">
            <Bed className="w-4 h-4 mr-1" />
            <span className="text-sm">{bedrooms} {bedrooms === 1 ? "Bed" : "Beds"}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <Bath className="w-4 h-4 mr-1" />
            <span className="text-sm">{bathrooms} {bathrooms === 1 ? "Bath" : "Baths"}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <Square className="w-4 h-4 mr-1" />
            <span className="text-sm">{area} ft²</span>
          </div>
        </div>
        
        {/* View Property Button */}
        <Link
          to={`/property/${id}`}
          className="block w-full mt-6 py-2.5 text-center text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-300"
        >
          View Property
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
