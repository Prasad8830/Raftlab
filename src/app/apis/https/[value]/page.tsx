import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAPIsByHTTPS, getAllCategories, getAllAuthTypes } from '@/lib/api-data';
import { APICard } from '@/components/ui/APICard';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterSidebar } from '@/components/ui/FilterSidebar';

interface HTTPSPageProps {
  params: Promise<{ value: string }>;
}

export async function generateStaticParams() {
  return [
    { value: 'true' },
    { value: 'false' },
  ];
}

export async function generateMetadata({ params }: HTTPSPageProps): Promise<Metadata> {
  const { value } = await params;
  const hasHttps = value === 'true';
  
  return {
    title: `${hasHttps ? 'HTTPS' : 'Non-HTTPS'} APIs - Public APIs Hub`,
    description: `Browse APIs that ${hasHttps ? 'support' : 'do not support'} HTTPS`,
  };
}

export default async function HTTPSPage({ params }: HTTPSPageProps) {
  const { value } = await params;
  
  if (value !== 'true' && value !== 'false') {
    notFound();
  }
  
  const hasHttps = value === 'true';
  const apis = getAPIsByHTTPS(hasHttps);
  const categories = getAllCategories();
  const authTypes = getAllAuthTypes();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {hasHttps ? 'HTTPS' : 'Non-HTTPS'} APIs
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            APIs that {hasHttps ? 'support' : 'do not support'} HTTPS
          </p>
          
          <div className="max-w-2xl">
            <SearchBar />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar categories={categories} authTypes={authTypes} />

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
                  No APIs found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
