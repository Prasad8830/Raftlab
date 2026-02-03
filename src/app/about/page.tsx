import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Public APIs Hub',
  description: 'Learn more about Public APIs Hub and our mission to provide developers with a curated directory of public APIs.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About Public APIs Hub
          </h1>
          
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Public APIs Hub is a curated directory of public APIs for developers. We aim to make it easier for
              developers to discover, explore, and integrate high-quality APIs into their projects.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
              What We Offer
            </h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <span>Comprehensive directory of public APIs across multiple categories</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <span>Filter APIs by category, authentication type, and HTTPS support</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <span>Detailed information about each API including documentation links</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <span>Regular updates to ensure API information is current and accurate</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
