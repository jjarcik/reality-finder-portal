
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchProperties } from "../store/propertySlice";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import FeaturedProperties from "../components/home/FeaturedProperties";
import { HomeIcon, Building, MapPin, Clock, Check, ChevronRight } from "lucide-react";

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Featured Properties */}
        <FeaturedProperties />

        {/* How It Works */}
        <section className="py-16 px-4 md:px-6 relative">
          <div className="container mx-auto">
            {/* Section Header */}
            <div className="mb-12 text-center">
              <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary font-medium text-sm mb-3">
                How It Works
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Find Your Property in 3 Simple Steps
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our streamlined process makes finding your dream property quick and easy.
              </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animation">
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-slide-up">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Search Properties</h3>
                <p className="text-muted-foreground mb-4">
                  Browse our extensive selection of properties using our advanced search filters.
                </p>
                <div className="flex items-center text-primary">
                  <HomeIcon className="w-5 h-5 mr-2" />
                  <span className="font-medium">Find your perfect match</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-slide-up animation-delay-100">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Arrange Viewings</h3>
                <p className="text-muted-foreground mb-4">
                  Schedule property viewings with our expert agents at your convenience.
                </p>
                <div className="flex items-center text-primary">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-medium">Flexible scheduling</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-slide-up animation-delay-200">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Close the Deal</h3>
                <p className="text-muted-foreground mb-4">
                  Our experienced team will guide you through the entire buying or renting process.
                </p>
                <div className="flex items-center text-primary">
                  <Check className="w-5 h-5 mr-2" />
                  <span className="font-medium">Hassle-free experience</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-12 text-center">
              <Link
                to="/properties"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors duration-300"
              >
                Explore Properties
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Locations */}
        <section className="py-16 px-4 md:px-6 bg-secondary/30">
          <div className="container mx-auto">
            {/* Section Header */}
            <div className="mb-12 text-center">
              <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary font-medium text-sm mb-3">
                Featured Locations
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore Properties by Location
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the most popular neighborhoods and cities in our collection.
              </p>
            </div>

            {/* Locations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animation">
              {/* New York */}
              <div className="relative rounded-xl overflow-hidden group hover-scale">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2070&auto=format&fit=crop"
                  alt="New York"
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl font-bold text-white mb-1">New York</h3>
                  <div className="flex items-center text-white/90">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">24 Properties</span>
                  </div>
                </div>
                <Link
                  to="/properties?location=New York"
                  className="absolute inset-0 z-30"
                  aria-label="View properties in New York"
                ></Link>
              </div>

              {/* Chicago */}
              <div className="relative rounded-xl overflow-hidden group hover-scale">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=2070&auto=format&fit=crop"
                  alt="Chicago"
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl font-bold text-white mb-1">Chicago</h3>
                  <div className="flex items-center text-white/90">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">18 Properties</span>
                  </div>
                </div>
                <Link
                  to="/properties?location=Chicago"
                  className="absolute inset-0 z-30"
                  aria-label="View properties in Chicago"
                ></Link>
              </div>

              {/* Los Angeles */}
              <div className="relative rounded-xl overflow-hidden group hover-scale">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=2070&auto=format&fit=crop"
                  alt="Los Angeles"
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl font-bold text-white mb-1">Los Angeles</h3>
                  <div className="flex items-center text-white/90">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">29 Properties</span>
                  </div>
                </div>
                <Link
                  to="/properties?location=Los Angeles"
                  className="absolute inset-0 z-30"
                  aria-label="View properties in Los Angeles"
                ></Link>
              </div>

              {/* Miami */}
              <div className="relative rounded-xl overflow-hidden group hover-scale">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1535498730771-e735b998cd64?q=80&w=2070&auto=format&fit=crop"
                  alt="Miami"
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl font-bold text-white mb-1">Miami</h3>
                  <div className="flex items-center text-white/90">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">15 Properties</span>
                  </div>
                </div>
                <Link
                  to="/properties?location=Miami"
                  className="absolute inset-0 z-30"
                  aria-label="View properties in Miami"
                ></Link>
              </div>
            </div>

            {/* View All Locations */}
            <div className="mt-12 text-center">
              <Link
                to="/properties"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
              >
                View All Locations
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 md:px-6 bg-white">
          <div className="container mx-auto">
            {/* Section Header */}
            <div className="mb-12 text-center">
              <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary font-medium text-sm mb-3">
                Testimonials
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Clients Say
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Read about the experiences of our satisfied clients who found their dream properties with us.
              </p>
            </div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animation">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-bold">John Doe</h4>
                    <p className="text-sm text-muted-foreground">New York</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Finding my dream apartment was incredibly easy with Reality Portal. The search filters helped me narrow down options quickly, and the detailed listings gave me all the information I needed."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in animation-delay-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">JS</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Jane Smith</h4>
                    <p className="text-sm text-muted-foreground">Los Angeles</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The team at Reality Portal provided exceptional service. They were responsive, knowledgeable, and made the entire process of buying my first home smooth and stress-free."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in animation-delay-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">RK</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Robert Kim</h4>
                    <p className="text-sm text-muted-foreground">Chicago</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "As a real estate investor, I appreciate the detailed property information and the ability to quickly contact agents. Reality Portal has become my go-to platform for finding investment properties."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${
                        i < 4 ? "text-yellow-400" : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 md:px-6 bg-primary text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
              Ready to Find Your Dream Property?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90 animate-fade-in animation-delay-100">
              Start your search today and discover the perfect property for your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in animation-delay-200">
              <Link
                to="/properties"
                className="px-8 py-3 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition-colors"
              >
                Browse Properties
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
