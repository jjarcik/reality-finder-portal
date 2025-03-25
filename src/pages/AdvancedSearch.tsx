
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AdvancedSearch from "../components/search/AdvancedSearch";

const AdvancedSearchPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Page Header */}
        <div className="bg-primary/5 py-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Advanced Property Search
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fine-tune your search to find the perfect property that meets all your requirements.
            </p>
          </div>
        </div>
        
        {/* Advanced Search Form */}
        <section className="py-12 px-4 md:px-6">
          <AdvancedSearch />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdvancedSearchPage;
