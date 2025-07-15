'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import Scene from '../3d/Scene';

gsap.registerPlugin(TextPlugin);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initial setup - hide elements
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
    });

    // Animation timeline
    const tl = gsap.timeline({ delay: 0.5 });

    // Title animation
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Subtitle animation
    tl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.5");

    // CTA animation
    tl.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.3");

    // Typing effect for highlight text
    tl.to(titleRef.current?.querySelector('.highlight'), {
      text: "extraordinary",
      duration: 2,
      ease: "none",
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Scene className="absolute inset-0 w-full h-full" />
      
      {/* Content */}
      <div ref={containerRef} className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          We Create{' '}
          <span className="highlight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {/* Text will be animated here */}
          </span>
          <br />
          Digital Experiences
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Transform your brand with cutting-edge design, development, and marketing strategies 
          that captivate audiences and drive results.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <span className="flex items-center gap-2">
              Start Your Project
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          
          <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            View Our Work
          </button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
} 