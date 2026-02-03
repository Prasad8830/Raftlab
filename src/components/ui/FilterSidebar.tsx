'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  categories: string[];
  authTypes: string[];
}

export function FilterSidebar({ categories, authTypes }: FilterSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isCategoryActive = (category: string) =>
    pathname === `/apis/category/${category.toLowerCase().replace(/\s+/g, '-')}`;
  const isAuthActive = (auth: string) =>
    pathname === `/apis/auth/${auth.toLowerCase()}`;

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sticky top-6">
        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Category
          </h3>
          <div className="space-y-1">
            {categories.map((category) => {
              const slug = category.toLowerCase().replace(/\s+/g, '-');
              const active = isCategoryActive(category);
              
              return (
                <Link
                  key={category}
                  href={`/apis/category/${slug}`}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg text-sm transition-colors',
                    active
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    readOnly
                    className="w-4 h-4 mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  {category}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Auth Types */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Authentication Type
          </h3>
          <div className="space-y-1">
            {authTypes.map((auth) => {
              const active = isAuthActive(auth);
              
              return (
                <Link
                  key={auth}
                  href={`/apis/auth/${auth.toLowerCase()}`}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg text-sm transition-colors',
                    active
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    readOnly
                    className="w-4 h-4 mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  {auth}
                </Link>
              );
            })}
          </div>
        </div>

        {/* HTTPS Filter */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            HTTPS
          </h3>
          <Link
            href="/apis/https/true"
            className={cn(
              'flex items-center px-3 py-2 rounded-lg text-sm transition-colors',
              pathname === '/apis/https/true'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            )}
          >
            <input
              type="checkbox"
              checked={pathname === '/apis/https/true'}
              readOnly
              className="w-4 h-4 mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            HTTPS only
          </Link>
        </div>
      </div>
    </aside>
  );
}
