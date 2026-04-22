'use client';

import { useState, useEffect, TouchEvent } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Next-Gen Consoles',
    subtitle: 'Experience gaming like never before.',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200&auto=format&fit=crop',
    link: '/',
  },
  {
    id: 2,
    title: 'Premium Audio',
    subtitle: 'Crystal clear sound for the audiophile.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
    link: '/',
  },
  {
    id: 3,
    title: 'Pro Photography',
    subtitle: 'Capture moments in stunning detail.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
    link: '/',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div 
      className="relative w-full h-[250px] md:h-[400px] overflow-hidden rounded-none sm:rounded-md mb-6 group bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
    >
      {/* Slides */}
      <div 
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="object-cover w-full h-full opacity-60 pointer-events-none"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">{slide.title}</h2>
              <p className="text-sm md:text-lg mb-6 drop-shadow-md font-medium">{slide.subtitle}</p>
              <Link 
                href={slide.link}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-bold hover:bg-primary/90 transition-colors shadow-lg"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-white/20 backdrop-blur-sm hidden md:block"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-white/20 backdrop-blur-sm hidden md:block"
      >
        <ChevronRight size={24} />
      </button>

      {/* Line Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              index === current ? 'w-8 bg-white' : 'w-4 bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
