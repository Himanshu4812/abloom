"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "OVERVIEW", href: "#overview" },
  { label: "GALLERY", href: "#gallery" },
  { label: "MASTERPLAN", href: "#masterplan" },
  { label: "CONTACT", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      } ${!isVisible ? "pointer-events-none" : ""}`}
    >
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="font-display font-medium text-xl lg:text-2xl tracking-wide transition-colors duration-300 text-foreground"
          >
            ABLOOM
          </Link>

          <ul className="hidden md:flex items-center gap-12 lg:gap-14">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[12px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 hover:text-primary text-muted-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 transition-colors text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-64 pt-6" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col gap-4 pb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[12px] font-medium tracking-[0.15em] uppercase transition-colors duration-200 text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-border via-border/60 to-transparent" />
      </div>
    </motion.header>
  );
}
