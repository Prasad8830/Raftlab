'use client';

import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  categories: string[];
  authTypes: string[];
  selectedCategories: string[];
  selectedAuthTypes: string[];
  httpsOnly: boolean | null;
  onCategoryToggle: (category: string) => void;
  onAuthToggle: (authType: string) => void;
  onHttpsToggle: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
}

export function FilterSidebar({
  categories,
  authTypes,
  selectedCategories,
  selectedAuthTypes,
  httpsOnly,
  onCategoryToggle,
  onAuthToggle,
  onHttpsToggle,
  isOpen = true,
  onClose,
  hasActiveFilters = false,
  onClearFilters,
}: FilterSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transform transition-transform duration-300 overflow-y-auto",
        "lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:transform-none lg:border lg:border-l-0 lg:border-t-0 lg:rounded-br-xl lg:rounded-bl-xl lg:pt-0 lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
      <div className="p-6">
        {/* Show All APIs Button */}
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className={cn(
              "w-full mb-6 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              hasActiveFilters
                ? "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                : "text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 cursor-not-allowed"
            )}
          >
            Show All APIs
          </button>
        )}
        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Category
          </h3>
          <div className="space-y-1">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              
              return (
                <button
                  key={category}
                  onClick={() => onCategoryToggle(category)}
                  className={cn(
                    'w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors text-left',
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="w-4 h-4 mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 pointer-events-none"
                  />
                  {category}
                </button>
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
              const isSelected = selectedAuthTypes.includes(auth);
              
              return (
                <button
                  key={auth}
                  onClick={() => onAuthToggle(auth)}
                  className={cn(
                    'w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors text-left',
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="w-4 h-4 mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 pointer-events-none"
                  />
                  {auth}
                </button>
              );
            })}
          </div>
        </div>

        {/* HTTPS Filter */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            HTTPS
          </h3>
          <button
            onClick={onHttpsToggle}
            className={cn(
              'w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors text-left',
              httpsOnly === true
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            )}
          >
            <input
              type="checkbox"
              checked={httpsOnly === true}
              readOnly
              className="w-4 h-4 mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 pointer-events-none"
            />
            HTTPS only
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
