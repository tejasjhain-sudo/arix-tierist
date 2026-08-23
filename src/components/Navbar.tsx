"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Tier List", href: "/" },
  { name: "Discord", href: "https://discord.gg/ApBJNxBCuj" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed z-50 transition-all duration-500 left-1/2 -translate-x-1/2 ${
        isScrolled 
          ? "top-4 w-[95%] max-w-5xl rounded-full border border-white/10 py-3 px-2 shadow-2xl" 
          : "top-0 w-full bg-transparent py-5 border-transparent"
      }`}
      style={isScrolled ? {
        background: "rgba(10, 10, 10, 0.75)",
        backdropFilter: "blur(24px)",
      } : {}}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-brand-red/10 p-1 border border-brand-red/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <Image src="/logo.png" alt="Arix Logo" fill className="object-cover" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
              ARIX<span className="text-brand-red">MC</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 bg-black/40 px-6 py-2 rounded-full border border-white/5 shadow-inner">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold tracking-wide text-gray-400 transition-all duration-300 hover:text-white hover:scale-105"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href="https://discord.gg/ApBJNxBCuj"
              className="rounded-full px-6 py-2.5 text-sm font-black tracking-wider text-white transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 overflow-hidden relative group inline-block"
              style={{
                background: "linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(153, 27, 27, 0.95) 100%)",
                boxShadow: "0 4px 15px -3px rgba(239, 68, 68, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,100,100,0.3)"
              }}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <span className="relative z-10 uppercase drop-shadow-md">Play Now</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-[90%] mt-4 rounded-2xl border border-white/10 p-4 shadow-2xl overflow-hidden"
          style={{
            background: "rgba(15, 15, 15, 0.95)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-bold tracking-wide text-gray-300 hover:text-brand-red transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="https://discord.gg/ApBJNxBCuj"
              className="inline-block rounded-xl px-4 py-3 text-center font-black uppercase tracking-widest text-white shadow-lg transition-transform active:scale-95 mt-4"
              style={{
                background: "linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(185, 28, 28, 0.95) 100%)",
                border: "1px solid rgba(255,100,100,0.5)"
              }}
            >
              Play Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
