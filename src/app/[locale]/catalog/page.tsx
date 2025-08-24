'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from '@/lib/i18n/pure-static';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Grid, List } from 'lucide-react';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { ProductCard } from '@/components/catalog/product-card';
import { CategoryFilter } from '@/components/catalog/category-filter';
import { QuoteModal } from '@/components/catalog/quote-modal';
import { QuickViewModal } from '@/components/catalog/quick-view-modal';
import { CatalogItem, CatalogData, CatalogCategory, CatalogFilters, QuoteRequest } from '@/types/catalog';
import catalogData from '@/data/enhanced-catalog.json';
import { WhatsAppService } from '@/lib/services/whatsapp-service';

// Cast the imported JSON data to our TypeScript types
const typedCatalogData = catalogData as {
  categories: CatalogCategory[];
  items: CatalogItem[];
};

export default function CatalogPage() {
  const t = useTranslations('catalog');
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<CatalogFilters>({
    search: '',
    category: 'all',
    stockStatus: 'all',
    featured: false,
    sortBy: 'name',
    sortOrder: 'asc'
  });
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [quoteItems, setQuoteItems] = useState<Array<{ item: CatalogItem; quantity: number }>>([]);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  // Filter and sort items based on current filters
  const filteredItems = useMemo(() => {
    let items = [...typedCatalogData.items];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      items = items.filter(item =>
        item.nameEn.toLowerCase().includes(searchTerm) ||
        item.nameFr.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.descriptionFr.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      items = items.filter(item => item.category === filters.category);
    }

    // Apply stock status filter
    if (filters.stockStatus && filters.stockStatus !== 'all') {
      items = items.filter(item => item.stockStatus === filters.stockStatus);
    }

    // Apply featured filter
    if (filters.featured) {
      items = items.filter(item => item.featured);
    }

    // Apply sorting
    items.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.nameEn;
          bValue = b.nameEn;
          break;
        default:
          aValue = a.nameEn;
          bValue = b.nameEn;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return filters.sortOrder === 'asc' ? comparison : -comparison;
      }

      return 0;
    });

    return items;
  }, [filters]);

  const handleFilterChange = (key: keyof CatalogFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      stockStatus: 'all',
      featured: false,
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  const handleAddToQuote = (item: CatalogItem) => {
    const existingItem = quoteItems.find(qi => qi.item.id === item.id);
    if (!existingItem) {
      setQuoteItems(prev => [...prev, { item, quantity: 1 }]);
    }
    setShowQuoteModal(true);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setQuoteItems(prev => 
      prev.map(qi => qi.item.id === itemId ? { ...qi, quantity } : qi)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setQuoteItems(prev => prev.filter(qi => qi.item.id !== itemId));
  };

  const handleSubmitQuote = async (quoteRequest: QuoteRequest) => {
    try {
      // Send quote request via WhatsApp to +237 677 181 487
      await WhatsAppService.sendQuoteRequest(quoteRequest);
      
      // Clear the quote items after successful submission
      setQuoteItems([]);
      
      // Show success message
      alert('Quote request sent via WhatsApp! Please check your WhatsApp to complete the submission.');
      
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Error sending quote request via WhatsApp. Please try again.');
    }
  };

  const handleQuickView = (item: CatalogItem) => {
    setSelectedItem(item);
    setShowQuickView(true);
  };

  const handleShare = (item: CatalogItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.nameEn,
        text: item.description,
        url: window.location.href + '/' + item.id,
      });
    } else {
      navigator.clipboard.writeText(window.location.href + '/' + item.id);
    }
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Equipment Catalog', url: '/catalog' }
  ];

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbs} />
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Scientific Equipment Catalog",
          "description": "Browse our comprehensive catalog of laboratory and scientific equipment for research and education.",
          "url": "https://broadway-enterprise.com/catalog",
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": filteredItems.length,
            "itemListElement": filteredItems.slice(0, 10).map((item, index) => ({
              "@type": "Product",
              "position": index + 1,
              "name": item.nameEn,
              "description": item.description,
              "image": `/images/equipment/${item.id}.jpg`
            }))
          }
        }}
      />
      <div className="container py-8">
        <div className="flex flex-col space-y-8">
          {/* Header */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Scientific Equipment Catalog</h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Browse our comprehensive collection of laboratory equipment and supplies
            </p>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            categories={typedCatalogData.categories}
            selectedCategory={filters.category}
            onCategoryChange={(category) => handleFilterChange('category', category)}
            locale="en"
          />

          {/* Search and Controls */}
          <div className="flex flex-col gap-4">
            {/* Search Bar - Full Width on Mobile */}
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search equipment..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
            
            {/* Controls Row */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              {/* Filter Controls */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filters.featured ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('featured', !filters.featured)}
                  className="text-xs"
                >
                  ⭐ Featured
                </Button>
                <Button
                  variant={filters.stockStatus === 'in-stock' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('stockStatus', filters.stockStatus === 'in-stock' ? 'all' : 'in-stock')}
                  className="text-xs"
                >
                  📦 In Stock
                </Button>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex border rounded-md self-start sm:self-auto">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none px-3"
                  aria-label="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none px-3"
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {loading ? 'Loading...' : `${filteredItems.length} items found`}
            </p>
            {(filters.search || filters.category !== 'all') && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all filters
              </Button>
            )}
          </div>

          {/* Products Grid/List */}
          {loading ? (
            <div className={viewMode === 'grid' ? 'grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <Skeleton className="aspect-square rounded mb-4" />
                  <Skeleton className="h-6 mb-2" />
                  <Skeleton className="h-4 mb-3" />
                  <Skeleton className="h-8" />
                </div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-3 sm:space-y-4'}>
              {filteredItems.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  locale="en"
                  onAddToQuote={handleAddToQuote}
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        items={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onSubmitQuote={handleSubmitQuote}
        locale="en"
      />

      {selectedItem && (
        <QuickViewModal
          isOpen={showQuickView}
          onClose={() => setShowQuickView(false)}
          item={selectedItem}
          locale="en"
          onAddToQuote={handleAddToQuote}
        />
      )}
    </>
  );
}
