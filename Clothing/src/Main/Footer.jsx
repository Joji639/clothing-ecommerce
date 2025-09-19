import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-white text-2xl font-bold mb-4">Clothify</h2>
            <p className="text-gray-400">
            we believe fashion should be accessible, stylish, and sustainable. Shop the latest trends in men, women & kids wear, all in one place.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="/mens" className="hover:text-white transition">Men</a></li>
              <li><a href="/womens" className="hover:text-white transition">Women</a></li>
              <li><a href="/kids" className="hover:text-white transition">Kids</a></li>
              <li><a href="/unisex" className="hover:text-white transition">Unisex</a></li>
              <li><a href="/sale" className="hover:text-white transition">Sale</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li><a href="/help-center" className="hover:text-white transition">Help Center</a></li>
              <li><a href="/shipping" className="hover:text-white transition">Shipping & Delivery</a></li>
              <li><a href="/returns" className="hover:text-white transition">Returns & Exchanges</a></li>
              <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          <div className="w-full max-w-full">
            <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
            <p className="mb-4">Subscribe to get the latest updates, deals & more.</p>
            <form className="flex flex-wrap">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow min-w-0 px-4 py-2 rounded-l-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button type="submit" className="px-4 py-2 bg-amber-500 text-white rounded-r-md hover:bg-amber-600 transition mt-2 sm:mt-0">
                Subscribe
              </button>
            </form>

            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" className="hover:text-white">
                <FaFacebookF size={20} />
              </a>
              <a href="https://instagram.com"  className="hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="https://youtube.com" className="hover:text-white">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Clothify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
