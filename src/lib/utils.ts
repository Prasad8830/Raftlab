import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAuthType(auth: string): string {
  if (auth.toLowerCase() === 'none') return 'No Auth';
  if (auth.toLowerCase() === 'apikey') return 'API Key';
  if (auth.toLowerCase() === 'oauth') return 'OAuth';
  return auth;
}

export function getAuthBadgeColor(auth: string): string {
  const authLower = auth.toLowerCase();
  if (authLower === 'none') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
  if (authLower === 'apikey') return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
  if (authLower === 'oauth') return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
  return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
}

export function getSuccessRateBadgeColor(rate: number): string {
  if (rate >= 98) return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
  if (rate >= 95) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
  return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
}
