import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAPIsByCategory, getAllCategories } from '@/lib/api-data';
import { APICard } from '@/components/ui/APICard';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterSidebar } from '@/components/ui/FilterSidebar';
import { getAllAuthTypes } from '@/lib/api-data';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ');
  
  return {
    title: `${categoryName} APIs - Public APIs Hub`,
    description: `Browse ${categoryName} APIs in our directory`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ');
  
  // Find the actual category name (case-insensitive match)
  const allCategories = getAllCategories();
  const actualCategory = allCategories.find(
    (cat) => cat.toLowerCase() === categoryName.toLowerCase()
  );
  
  if (!actualCategory) {
    notFound();
  }
  
  const apis = getAPIsByCategory(actualCategory);
  const authTypes = getAllAuthTypes();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {actualCategory} APIs
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Explore APIs in the {actualCategory} category
          </p>
          
          <div className="max-w-2xl">
            <SearchBar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar categories={allCategories} authTypes={authTypes} />

          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                {apis.length} {apis.length === 1 ? 'API' : 'APIs'} found
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
                  No APIs found in this category
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
