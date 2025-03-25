
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PropertyDetail from "../components/property/PropertyDetail";

const PropertyDetails = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <PropertyDetail />
        </main>
        
        <Footer />
      </div>
    </Provider>
  );
};

export default PropertyDetails;
