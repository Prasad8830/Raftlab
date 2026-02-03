export interface API {
  name: string;
  description: string;
  category: string;
  auth: string;
  https: boolean;
  cors: string;
  link: string;
  slug: string;
  latency?: string;
  successRate?: number;
  premium?: boolean;
  rating?: number;
}

export interface FilterOptions {
  categories: string[];
  authTypes: string[];
  httpsOptions: boolean[];
}
