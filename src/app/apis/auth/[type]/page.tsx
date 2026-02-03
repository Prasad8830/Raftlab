import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAPIsByAuth, getAllAuthTypes, getAllCategories } from '@/lib/api-data';
import { APICard } from '@/components/ui/APICard';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterSidebar } from '@/components/ui/FilterSidebar';
import { formatAuthType } from '@/lib/utils';

interface AuthPageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  const authTypes = getAllAuthTypes();
  return authTypes.map((authType) => ({
    type: authType.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: AuthPageProps): Promise<Metadata> {
  const { type } = await params;
  const authType = type.charAt(0).toUpperCase() + type.slice(1);
  
  return {
    title: `${formatAuthType(authType)} APIs - Public APIs Hub`,
    description: `Browse APIs that use ${formatAuthType(authType)} authentication`,
  };
}

export default async function AuthPage({ params }: AuthPageProps) {
  const { type } = await params;
  
  const allAuthTypes = getAllAuthTypes();
  const actualAuthType = allAuthTypes.find(
    (auth) => auth.toLowerCase() === type.toLowerCase()
  );
  
  if (!actualAuthType) {
    notFound();
  }
  
  const apis = getAPIsByAuth(actualAuthType);
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {formatAuthType(actualAuthType)} APIs
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            APIs that use {formatAuthType(actualAuthType)} authentication
          </p>
          
          <div className="max-w-2xl">
            <SearchBar />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar categories={categories} authTypes={allAuthTypes} />

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
                  No APIs found with this authentication type
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
