'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useCallback, useEffect } from 'react';
import { CarouselItem, CarouselResponse } from '@/lib/types';
import Image from 'next/image';
import { QUERY_KEYS } from '@/lib/constants';

// Fetch function for the API
async function fetchCarouselData(): Promise<CarouselResponse> {
  const response = await fetch('/api/carousel');
  if (!response.ok) {
    throw new Error('Failed to fetch carousel data');
  }
  return response.json();
}

interface CarouselProps {
  items: CarouselItem[];
}

export default function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = (index: number) => {
    if (index === currentIndex || isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex(index);

    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
    setIsAnimating(true);

    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  }, [isAnimating, items.length]);

  const goToPrevious = () => {
    if (isAnimating) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
    setIsAnimating(true);

    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!items || items.length === 0) return;

    const timer = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 7000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [isAnimating, goToNext]);

  if (!items)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className={`relative w-full h-screen overflow-hidden`}>
      {/* Main Carousel */}
      <div className="relative w-full h-full">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={item.id}
              className={`absolute w-full h-full transition-all duration-1000 ${
                index === currentIndex
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105'
              }`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="100vw"
                  className="object-cover w-full h-auto"
                  priority={index === 0}
                  onError={(e) => {
                    console.error(`Error loading image: ${item.imageUrl}`);
                    const imgElement = e.target as HTMLImageElement;
                    if (
                      imgElement &&
                      item.imageUrl.includes('drive.google.com')
                    ) {
                      const fileId = item.imageUrl
                        .split('/d/')[1]
                        ?.split('/')[0];
                      if (fileId) {
                        const fallbackUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
                        imgElement.src = fallbackUrl;
                      }
                    }
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center">
            No images available
          </div>
        )}
      </div>
      {/* Click Areas for Navigation */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-0 w-1/3 h-full bg-transparent z-30 cursor-pointer"
        aria-label="Previous slide"
      />
      <button
        onClick={goToNext}
        className="absolute right-0 top-0 w-1/3 h-full bg-transparent z-30 cursor-pointer"
        aria-label="Next slide"
      />

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 z-30">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-3'
                : 'bg-white bg-opacity-20 hover:bg-opacity-30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
