import { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllAPIs, getAllCategories, getAllAuthTypes } from '@/lib/api-data';
import { APIList } from '@/components/ui/APIList';

export const metadata: Metadata = {
  title: 'Browse APIs - Public APIs Hub',
  description: 'Explore our comprehensive directory of public APIs. Filter by category, authentication type, and more.',
};

export default async function APIListingPage() {
  const apis = getAllAPIs();
  const categories = getAllCategories();
  const authTypes = getAllAuthTypes();

  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <APIList initialAPIs={apis} categories={categories} authTypes={authTypes} />
    </Suspense>
  );
}
