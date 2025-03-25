
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchPropertyById } from "../../store/propertySlice";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Tag, 
  Calendar, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  Mail,
  Share2,
  Heart,
  Printer
} from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedProperty, loading, error } = useSelector(
    (state: RootState) => state.properties
  );
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyById(id));
    }
    
    // Reset scroll position on component mount
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted"></div>
          <div className="h-6 w-64 bg-muted rounded mb-4"></div>
          <div className="h-4 w-40 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !selectedProperty) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
        <p className="text-muted-foreground mb-8">
          We couldn't find the property you're looking for.
        </p>
        <Link
          to="/properties"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Properties
        </Link>
      </div>
    );
  }

  const {
    title,
    description,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    type,
    propertyType,
    features,
    images,
    contact,
  } = selectedProperty;

  // Format price based on whether it's for rent or sale
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

  // Get the display price with the appropriate suffix
  const displayPrice = type === "rent" ? `${formattedPrice}/mo` : formattedPrice;

  const handlePrevImage = () => {
    setActiveImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen pt-16 pb-12">
      {/* Image Gallery */}
      <div className="relative h-[50vh] md:h-[60vh] bg-slate-900">
        <div className="absolute inset-0 flex justify-center items-center">
          <img
            src={images[activeImageIndex]}
            alt={title}
            className="w-full h-full object-cover animate-fade-in"
          />
          
          {/* Navigation Controls */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={handleNextImage}
            className="absolute right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {activeImageIndex + 1} / {images.length}
          </div>
        </div>
      </div>
      
      {/* Thumbnail Gallery */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white p-2 rounded-xl shadow-sm flex space-x-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                index === activeImageIndex
                  ? "ring-2 ring-primary"
                  : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => setActiveImageIndex(index)}
            >
              <img
                src={image}
                alt={`Property view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Back Link */}
            <Link
              to="/properties"
              className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Link>
            
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  type === "sale" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-blue-100 text-blue-700"
                }`}>
                  {type === "sale" ? "For Sale" : "For Rent"}
                </span>
                <span className="ml-2 inline-block px-3 py-1 bg-muted text-xs font-medium rounded-full capitalize">
                  {propertyType}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold mb-3">{title}</h1>
              
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span>{location}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-primary">{displayPrice}</h2>
            </div>
            
            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-xl font-medium mb-4">Property Details</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                  <Bed className="h-6 w-6 text-primary mb-2" />
                  <span className="text-lg font-medium">{bedrooms}</span>
                  <span className="text-muted-foreground text-sm">Bedrooms</span>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                  <Bath className="h-6 w-6 text-primary mb-2" />
                  <span className="text-lg font-medium">{bathrooms}</span>
                  <span className="text-muted-foreground text-sm">Bathrooms</span>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                  <Square className="h-6 w-6 text-primary mb-2" />
                  <span className="text-lg font-medium">{area}</span>
                  <span className="text-muted-foreground text-sm">Sq Ft</span>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary mb-2" />
                  <span className="text-lg font-medium">2021</span>
                  <span className="text-muted-foreground text-sm">Year Built</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-lg font-medium mb-4">Description</h4>
                <p className="text-muted-foreground whitespace-pre-line">
                  {description}
                </p>
              </div>
            </div>
            
            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-xl font-medium mb-4">Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-medium mb-4">Location</h3>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Map view available upon request</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Agent Contact */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 sticky top-20">
              <h3 className="text-xl font-medium mb-4">Contact Agent</h3>
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mr-4">
                  <span className="text-xl font-medium">
                    {contact.name.charAt(0)}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-medium">{contact.name}</h4>
                  <p className="text-muted-foreground text-sm">Real Estate Agent</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 mr-3" />
                  <span>{contact.phone}</span>
                </a>
                
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 mr-3" />
                  <span>{contact.email}</span>
                </a>
              </div>
              
              {/* Contact Form Toggle */}
              <button
                onClick={() => setShowContactForm(!showContactForm)}
                className="w-full py-3 mb-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
              >
                Contact Agent
              </button>
              
              {/* Quick Actions */}
              <div className="flex justify-between">
                <button className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5 mb-1" />
                  <span className="text-xs">Share</span>
                </button>
                
                <button className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
                  <Heart className="w-5 h-5 mb-1" />
                  <span className="text-xs">Save</span>
                </button>
                
                <button className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
                  <Printer className="w-5 h-5 mb-1" />
                  <span className="text-xs">Print</span>
                </button>
              </div>
              
              {/* Contact Form */}
              {showContactForm && (
                <div className="mt-6 p-4 bg-muted/30 rounded-lg animate-scale-in">
                  <h4 className="font-medium mb-4">Send a Message</h4>
                  
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                        placeholder="Enter your phone"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                        placeholder="I'm interested in this property..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
