import { Metadata } from 'next';
import { getAllAPIs, getAllCategories, getAllAuthTypes, searchAPIs } from '@/lib/api-data';
import { APICard } from '@/components/ui/APICard';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterSidebar } from '@/components/ui/FilterSidebar';

export const metadata: Metadata = {
  title: 'Browse APIs - Public APIs Hub',
  description: 'Explore our comprehensive directory of public APIs. Filter by category, authentication type, and more.',
};

interface APIListingPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function APIListingPage({ searchParams }: APIListingPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  
  const apis = query ? searchAPIs(query) : getAllAPIs();
  const categories = getAllCategories();
  const authTypes = getAllAuthTypes();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Public APIs
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Discover high-quality public APIs across various categories. Filter by category, authentication type, and more.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl">
            <SearchBar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <FilterSidebar categories={categories} authTypes={authTypes} />

          {/* API Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Available Public APIs
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {apis.length} {apis.length === 1 ? 'API' : 'APIs'} found
                {query && ` for "${query}"`}
              </p>
            </div>

            {apis.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {apis.map((api) => (
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
