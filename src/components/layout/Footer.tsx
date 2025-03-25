
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-4">Reality Portal</h3>
            <p className="text-gray-300 mb-4">
              Find your dream property with our extensive selection of houses, apartments, and commercial spaces for sale and rent.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in animation-delay-100">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors inline-flex items-center">
                  <span className="mr-2">•</span> Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-primary transition-colors inline-flex items-center">
                  <span className="mr-2">•</span> Properties
                </Link>
              </li>
              <li>
                <Link to="/advanced-search" className="text-gray-300 hover:text-primary transition-colors inline-flex items-center">
                  <span className="mr-2">•</span> Advanced Search
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors inline-flex items-center">
                  <span className="mr-2">•</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div className="animate-fade-in animation-delay-200">
            <h3 className="text-xl font-bold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?type=apartment" className="text-gray-300 hover:text-primary transition-colors inline-flex items-center">
                  <span className="mr-2">•</span> Apartments
                </Link>
              </li>
              <li>
                <Link to="/properties?type=house" className="text-gray-300 hover:text-primary transition-colors inline-flex items-center">
                  <span className="mr-2">•</span> Houses
                </Link>
              </li>
              <li>
                <Link to="/properties?type=condo" className="text-gray-300 hover:text-primary transition-colors inline-flex items-center">
                  <span className="mr-2">•</span> Condos
                </Link>
              </li>
              <li>
                <Link to="/properties?type=villa" className="text-gray-300 hover:text-primary transition-colors inline-flex items-center">
                  <span className="mr-2">•</span> Villas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in animation-delay-300">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-primary" />
                <span className="text-gray-300">123 Reality Street, Property City, PC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-primary" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-primary transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary" />
                <a href="mailto:info@realityportal.com" className="text-gray-300 hover:text-primary transition-colors">info@realityportal.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2023 Reality Portal. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
