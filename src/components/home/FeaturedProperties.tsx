
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchProperties } from "../../store/propertySlice";
import PropertyCard from "../property/PropertyCard";
import { Building } from "lucide-react";

const FeaturedProperties = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading, error } = useSelector(
    (state: RootState) => state.properties
  );

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  // Get only the first 3 properties for featuring
  const featuredProperties = properties.slice(0, 3);

  return (
    <section className="py-16 px-4 md:px-6 bg-secondary/50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary font-medium text-sm mb-3">
            Featured Listings
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Our Premium Properties
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties available for sale and rent in the most desirable locations.
          </p>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-pulse text-center">
              <Building className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p>Loading properties...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            <p>Error loading properties. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} featured />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <a
            href="/properties"
            className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
          >
            View All Properties
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
