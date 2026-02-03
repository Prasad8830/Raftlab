import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Clock, CheckCircle, Shield, Globe, Star } from 'lucide-react';
import { getAPIBySlug, getAllAPIs } from '@/lib/api-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatAuthType, getAuthBadgeColor, getSuccessRateBadgeColor } from '@/lib/utils';

interface APIDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const apis = getAllAPIs();
  return apis.map((api) => ({
    slug: api.slug,
  }));
}

export async function generateMetadata({ params }: APIDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const api = getAPIBySlug(slug);

  if (!api) {
    return {
      title: 'API Not Found',
    };
  }

  return {
    title: `${api.name} - Public APIs Hub`,
    description: api.description,
  };
}

export default async function APIDetailPage({ params }: APIDetailPageProps) {
  const { slug } = await params;
  const api = getAPIBySlug(slug);

  if (!api) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/apis"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to APIs
        </Link>

        {/* API Header */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {api.name}
                </h1>
                {api.premium && <Badge variant="premium">PREMIUM</Badge>}
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {api.description}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={getAuthBadgeColor(api.auth)}>
                  {formatAuthType(api.auth)}
                </Badge>
                <Badge variant="info">{api.category}</Badge>
                {api.https && (
                  <Badge variant="success">
                    <Shield className="w-3 h-3 mr-1" />
                    HTTPS
                  </Badge>
                )}
                {api.cors === 'yes' && (
                  <Badge variant="success">
                    <Globe className="w-3 h-3 mr-1" />
                    CORS Enabled
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {api.latency && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Latency</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {api.latency}
                  </p>
                </div>
              </div>
            )}
            {api.successRate !== undefined && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {api.successRate}%
                  </p>
                </div>
              </div>
            )}
            {api.rating && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < api.rating!
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* API Link */}
          <a
            href={api.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button size="lg">
              Visit API Documentation
              <ExternalLink className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overview */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Overview
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                  Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{api.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                  Category
                </h3>
                <Link
                  href={`/apis/category/${api.category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {api.category}
                </Link>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-400">Authentication</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatAuthType(api.auth)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-400">HTTPS</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {api.https ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-400">CORS</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {api.cors === 'yes' ? 'Enabled' : api.cors}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">API URL</span>
                <a
                  href={api.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  Visit
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
