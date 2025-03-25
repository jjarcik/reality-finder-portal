
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PropertyList from "../components/property/PropertyList";

const Properties = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Page Header */}
          <div className="bg-primary/5 py-12 px-4">
            <div className="container mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Property Listings
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our curated collection of properties available for sale and rent.
              </p>
            </div>
          </div>
          
          {/* Property List Component */}
          <PropertyList />
        </main>
        
        <Footer />
      </div>
    </Provider>
  );
};

export default Properties;
