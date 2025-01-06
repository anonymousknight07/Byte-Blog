"use client"
import React, { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import SiteThemeToggle from "./SiteThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = [
    { title: "Home", href: "/" },
    { title: "About me", href: "/about" },
  ];

  return (
    <div className="w-full bg-white/70 dark:bg-gray-800/70 shadow-md sticky top-0 backdrop-blur-2xl transition-colors z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 lg:px-0 h-20">
        <Logo title="By8" className="text-[#251e56] dark:text-white" />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-7">
          <div className="flex items-center gap-7 text-[#251e56] dark:text-white">
            {navigation.map((item) => (
              <Link
                key={item?.title}
                href={item?.href}
                className="text-sm uppercase font-semibold relative group overflow-hidden"
              >
                {item?.title}
                <span className="w-full h-[1px] bg-current absolute inline-block left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-200" />
              </Link>
            ))}
          </div>
          <SiteThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <SiteThemeToggle />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#251e56] dark:text-white p-2"
          >
            {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg">
          <div className="flex flex-col items-center py-4">
            {navigation.map((item) => (
              <Link
                key={item?.title}
                href={item?.href}
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center py-3 text-[#251e56] dark:text-white text-sm uppercase font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {item?.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;