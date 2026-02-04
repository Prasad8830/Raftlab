import { API } from '@/types/api';
import apisData from '../../data/apis.json';

export function getAllAPIs(): API[] {
  return apisData as API[];
}

export function getAPIBySlug(slug: string): API | undefined {
  return getAllAPIs().find((api) => api.slug === slug);
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
