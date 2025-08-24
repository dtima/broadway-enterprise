export interface CatalogCategory {
  id: string;
  name: string;
  nameEn: string;
  nameFr: string;
  icon: string;
  description: string;
  descriptionFr: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  nameEn: string;
  nameFr: string;
  category: 'glassware' | 'measuring' | 'tools' | 'chemicals' | 'electronics' | 'biology';
  icon: string;
  description: string;
  descriptionFr: string;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  featured: boolean;
  tags: string[];
}

export interface CatalogData {
  categories: CatalogCategory[];
  items: CatalogItem[];
}

export interface CatalogFilters {
  search: string;
  category: string;
  sortBy: 'name' | 'category' | 'featured';
  sortOrder: 'asc' | 'desc';
  stockStatus?: string;
  featured?: boolean;
}

export interface QuoteRequest {
  items: {
    id: string;
    name: string;
    quantity: number;
  }[];
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
    organization?: string;
    message?: string;
  };
}
