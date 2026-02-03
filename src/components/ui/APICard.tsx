import Link from 'next/link';
import { API } from '@/types/api';
import { Badge } from '@/components/ui/Badge';
import { FileText, Clock, CheckCircle, Star } from 'lucide-react';
import { formatAuthType, getAuthBadgeColor, getSuccessRateBadgeColor } from '@/lib/utils';

interface APICardProps {
  api: API;
}

export function APICard({ api }: APICardProps) {
  return (
    <Link href={`/apis/${api.slug}`}>
      <div className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:shadow-lg h-full flex flex-col">
        {/* Premium Badge */}
        {api.premium && (
          <div className="absolute top-4 right-4">
            <Badge variant="premium">PREMIUM</Badge>
          </div>
        )}

        {/* Icon */}
        <div className="mb-4">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
        </div>

        {/* Title and Category */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {api.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{api.category}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
          {api.description}
        </p>

        {/* Metrics */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          {api.latency && (
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{api.latency}</span>
            </div>
          )}
          {api.successRate !== undefined && (
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className={getSuccessRateBadgeColor(api.successRate).replace('bg-', 'text-').replace('-100', '-700').replace('dark:bg-', 'dark:text-').replace('900/30', '400')}>
                {api.successRate}%
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <Badge className={getAuthBadgeColor(api.auth)}>
            {formatAuthType(api.auth)}
          </Badge>
          
          {/* Rating */}
          {api.rating && (
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
          )}
        </div>
      </div>
    </Link>
  );
}
