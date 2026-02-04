'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { APICard } from './APICard';
import { SearchBar } from './SearchBar';
import { FilterSidebar } from './FilterSidebar';
import { API } from '@/types/api';

interface APIListProps {
  initialAPIs: API[];
  categories: string[];
  authTypes: string[];
}

export function APIList({ initialAPIs, categories, authTypes }: APIListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get filter values from URL
  const urlCategories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
  const urlAuthTypes = searchParams.get('auth')?.split(',').filter(Boolean) || [];
  const urlHttps = searchParams.get('https');
  const query = searchParams.get('q') || '';
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(urlCategories);
  const [selectedAuthTypes, setSelectedAuthTypes] = useState<string[]>(urlAuthTypes);
  const [httpsOnly, setHttpsOnly] = useState<boolean | null>(
    urlHttps === 'true' ? true : urlHttps === 'false' ? false : null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Update URL when filters change
  const updateURL = (
    cats: string[],
    auths: string[],
    https: boolean | null
  ) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (cats.length > 0) params.set('categories', cats.join(','));
    if (auths.length > 0) params.set('auth', auths.join(','));
    if (https !== null) params.set('https', String(https));
    
    const newUrl = params.toString() ? `/apis?${params.toString()}` : '/apis';
    router.push(newUrl, { scroll: false });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    updateURL(newCategories, selectedAuthTypes, httpsOnly);
  };

  const handleAuthToggle = (authType: string) => {
    const newAuthTypes = selectedAuthTypes.includes(authType)
      ? selectedAuthTypes.filter((a) => a !== authType)
      : [...selectedAuthTypes, authType];
    
    setSelectedAuthTypes(newAuthTypes);
    updateURL(selectedCategories, newAuthTypes, httpsOnly);
  };

  const handleHttpsToggle = () => {
    const newHttps = httpsOnly === true ? null : true;
    setHttpsOnly(newHttps);
    updateURL(selectedCategories, selectedAuthTypes, newHttps);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedAuthTypes([]);
    setHttpsOnly(null);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    const newUrl = params.toString() ? `/apis?${params.toString()}` : '/apis';
    router.push(newUrl, { scroll: false });
  };

  // Check if any filters are active
  const hasActiveFilters = 
    selectedCategories.length > 0 || 
    selectedAuthTypes.length > 0 || 
    httpsOnly !== null;

  // Filter APIs based on selected filters
  const filteredAPIs = useMemo(() => {
    let filtered = initialAPIs;

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (api) =>
          api.name.toLowerCase().includes(lowerQuery) ||
          api.description.toLowerCase().includes(lowerQuery) ||
          api.category.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((api) =>
        selectedCategories.includes(api.category)
      );
    }

    // Filter by auth types
    if (selectedAuthTypes.length > 0) {
      filtered = filtered.filter((api) =>
        selectedAuthTypes.includes(api.auth)
      );
    }

    // Filter by HTTPS
    if (httpsOnly !== null) {
      filtered = filtered.filter((api) => api.https === httpsOnly);
    }

    return filtered;
  }, [initialAPIs, query, selectedCategories, selectedAuthTypes, httpsOnly]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Fixed Filter Toggle Button - Mobile Only */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-30 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-r-lg p-3 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Open filters"
      >
        <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Sticky on left */}
          <div className="lg:col-span-1">
            <FilterSidebar
              categories={categories}
              authTypes={authTypes}
              selectedCategories={selectedCategories}
              selectedAuthTypes={selectedAuthTypes}
              httpsOnly={httpsOnly}
              onCategoryToggle={handleCategoryToggle}
              onAuthToggle={handleAuthToggle}
              onHttpsToggle={handleHttpsToggle}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 lg:py-12 lg:pr-8">
          {/* Search Bar and Title */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Available Public APIs
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredAPIs.length} {filteredAPIs.length === 1 ? 'API' : 'APIs'} found
                {query && ` for "${query}"`}
              </p>
            </div>
            
            {/* Search bar on right */}
            <div className="w-full sm:w-auto sm:ml-auto">
              <div className="sm:w-64 lg:w-96">
                <SearchBar />
              </div>
            </div>
          </div>

          {filteredAPIs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAPIs.map((api) => (
                <APICard key={api.slug} api={api} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No APIs found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
