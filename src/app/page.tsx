import Link from 'next/link';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { APICard } from '@/components/ui/APICard';
import { Button } from '@/components/ui/Button';
import { getFeaturedAPIs, getAPICount, getAllCategories } from '@/lib/api-data';

export default function Home() {
  const featuredAPIs = getFeaturedAPIs(6);
  const apiCount = getAPICount();
  const categoryCount = getAllCategories().length;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-black py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Explore Public APIs
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Discover high-quality public APIs across development, blockchain, authentication, anime, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apis">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse APIs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {apiCount}+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Public APIs</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {categoryCount}+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Categories</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg mx-auto mb-4">
                <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                99.9%
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured APIs Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Available Public APIs
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover the most popular and reliable APIs
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAPIs.map((api) => (
              <APICard key={api.slug} api={api} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/apis">
              <Button variant="outline" size="lg">
                Load More APIs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Build Faster CTA Section */}
      <section className="py-20 bg-gray-900 dark:bg-gray-950 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Build Faster with Public APIs
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Explore curated public APIs and start building reliable integrations.
          </p>
          <Link href="/apis">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              Browse APIs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover APIs by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Browse APIs organized by categories like Animals, Anime, Authentication, Blockchain, and Development
          </p>
          <Link href="/apis#categories">
            <Button size="lg" variant="outline">
              View Categories
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

