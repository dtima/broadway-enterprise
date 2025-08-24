'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CatalogCategory } from '@/types/catalog';

interface CategoryFilterProps {
  categories: CatalogCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  locale: string;
  itemCounts?: Record<string, number>;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  locale,
  itemCounts = {}
}: CategoryFilterProps) {
  const getCategoryName = (category: CatalogCategory) => {
    return locale === 'fr' ? category.nameFr : category.nameEn;
  };

  return (
    <div className="mb-6">
      {/* Mobile: Horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 sm:flex-wrap sm:overflow-visible">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange('all')}
          className="flex items-center gap-1 sm:gap-2 whitespace-nowrap text-xs sm:text-sm px-2 sm:px-3"
        >
          <span className="text-sm">🔬</span>
          <span className="hidden sm:inline">{locale === 'fr' ? 'Toutes catégories' : 'All Categories'}</span>
          <span className="sm:hidden">{locale === 'fr' ? 'Toutes' : 'All'}</span>
          {itemCounts.all && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {itemCounts.all}
            </Badge>
          )}
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="flex items-center gap-1 sm:gap-2 whitespace-nowrap text-xs sm:text-sm px-2 sm:px-3"
          >
            <span className="text-sm">{category.icon}</span>
            <span className="hidden sm:inline">{getCategoryName(category)}</span>
            <span className="sm:hidden">{getCategoryName(category).split(' ')[0]}</span>
            {itemCounts[category.id] && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {itemCounts[category.id]}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
