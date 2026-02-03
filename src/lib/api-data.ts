import { API } from '@/types/api';
import apisData from '../../data/apis.json';

export function getAllAPIs(): API[] {
  return apisData as API[];
}

export function getAPIBySlug(slug: string): API | undefined {
  return getAllAPIs().find((api) => api.slug === slug);
}

export function getAPIsByCategory(category: string): API[] {
  return getAllAPIs().filter((api) => 
    api.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAPIsByAuth(authType: string): API[] {
  return getAllAPIs().filter((api) => 
    api.auth.toLowerCase() === authType.toLowerCase()
  );
}

export function getAPIsByHTTPS(hasHttps: boolean): API[] {
  return getAllAPIs().filter((api) => api.https === hasHttps);
}

export function searchAPIs(query: string): API[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllAPIs().filter((api) =>
    api.name.toLowerCase().includes(lowercaseQuery) ||
    api.description.toLowerCase().includes(lowercaseQuery) ||
    api.category.toLowerCase().includes(lowercaseQuery)
  );
}

export function getAllCategories(): string[] {
  const categories = getAllAPIs().map((api) => api.category);
  return Array.from(new Set(categories)).sort();
}

export function getAllAuthTypes(): string[] {
  const authTypes = getAllAPIs().map((api) => api.auth);
  return Array.from(new Set(authTypes)).sort();
}

export function getAPICount(): number {
  return getAllAPIs().length;
}

export function getFeaturedAPIs(limit: number = 6): API[] {
  return getAllAPIs()
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}
