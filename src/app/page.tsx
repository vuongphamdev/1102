'use client';

import { useEffect, useState } from 'react';
import { ImageItem, Product } from '@/lib/google';
import Carousel from '@/components/Carousel';
import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import { getCarouselItems } from '@/lib/google/sheets';

export default async function Home() {
  const carouselItems = await getCarouselItems();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch products data
        const productsResponse = await fetch('/api/products');
        if (!productsResponse.ok) throw new Error('Failed to fetch products data');
        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      }
    }

    fetchData();
  }, []);


  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-xl">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main>
        <Carousel items={carouselItems} />
      </main>
      <Footer />
    </Layout>
  );
}
