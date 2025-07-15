'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);

  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "5", label: "Years Experience" },
    { number: "99%", label: "Success Rate" }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        }
      }
    );

    // Stats animation
    statsRef.current.forEach((stat, index) => {
      if (stat) {
        gsap.fromTo(stat,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
            },
            delay: index * 0.1,
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              About Our Agency
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're a team of passionate creators, strategists, and innovators dedicated to helping 
              businesses transform their digital presence and achieve extraordinary results.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              With years of experience and a proven track record, we combine creative excellence 
              with strategic thinking to deliver solutions that not only look amazing but drive 
              real business growth.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  ref={(el) => el && (statsRef.current[index] = el)}
                  className="text-center p-6 bg-gray-50 rounded-lg"
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
              <div className="h-full flex flex-col justify-center items-center text-center">
                <div className="text-6xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg opacity-90">
                  To empower businesses with innovative digital solutions that drive growth, 
                  engagement, and success in the modern marketplace.
                </p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-400 rounded-full opacity-20"></div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Innovation",
                description: "We push boundaries and explore new possibilities to deliver cutting-edge solutions."
              },
              {
                icon: "🤝",
                title: "Collaboration",
                description: "We work closely with our clients as partners to achieve shared success."
              },
              {
                icon: "🎯",
                title: "Results",
                description: "We're driven by measurable outcomes and tangible business impact."
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 