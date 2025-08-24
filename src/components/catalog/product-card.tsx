'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Eye, Share2 } from 'lucide-react';
import { CatalogItem } from '@/types/catalog';

interface ProductCardProps {
  item: CatalogItem;
  locale: string;
  onAddToQuote: (item: CatalogItem) => void;
  onQuickView: (item: CatalogItem) => void;
}

export function ProductCard({ item, locale, onAddToQuote, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const itemName = locale === 'fr' ? item.nameFr : item.nameEn;
  const itemDescription = locale === 'fr' ? item.descriptionFr : item.description;
  
  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStockStatusText = (status: string) => {
    if (locale === 'fr') {
      switch (status) {
        case 'in-stock':
          return 'En stock';
        case 'low-stock':
          return 'Stock faible';
        case 'out-of-stock':
          return 'Rupture de stock';
        default:
          return 'Inconnu';
      }
    } else {
      switch (status) {
        case 'in-stock':
          return 'In Stock';
        case 'low-stock':
          return 'Low Stock';
        case 'out-of-stock':
          return 'Out of Stock';
        default:
          return 'Unknown';
      }
    }
  };

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        item.featured ? 'ring-2 ring-blue-200 bg-blue-50/30' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {itemName}
              </CardTitle>
              {item.featured && (
                <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-800">
                  {locale === 'fr' ? 'Vedette' : 'Featured'}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="text-sm text-gray-600 line-clamp-2 mb-4">
          {itemDescription}
        </CardDescription>
        
        <div className="flex items-center justify-between mb-4">
          <Badge 
            variant="outline" 
            className={`text-xs font-medium ${getStockStatusColor(item.stockStatus)}`}
          >
            {getStockStatusText(item.stockStatus)}
          </Badge>
          
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className={`flex flex-col sm:flex-row gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-1'
        }`}>
          <Button 
            size="sm" 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddToQuote(item);
            }}
            disabled={item.stockStatus === 'out-of-stock'}
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{locale === 'fr' ? 'Demander devis' : 'Request Quote'}</span>
            <span className="sm:hidden">{locale === 'fr' ? 'Devis' : 'Quote'}</span>
          </Button>
          
          <div className="flex gap-2 sm:gap-1">
            <Button 
              size="sm" 
              variant="outline"
              className="flex-1 sm:flex-none text-xs sm:text-sm px-2 sm:px-3"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(item);
              }}
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-0" />
              <span className="ml-1 sm:hidden">{locale === 'fr' ? 'Voir' : 'View'}</span>
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
              className="flex-1 sm:flex-none text-xs sm:text-sm px-2 sm:px-3"
              onClick={(e) => {
                e.stopPropagation();
                // Share functionality
                if (navigator.share) {
                  navigator.share({
                    title: itemName,
                    text: itemDescription,
                    url: window.location.href
                  });
                }
              }}
            >
              <Share2 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-0" />
              <span className="ml-1 sm:hidden">{locale === 'fr' ? 'Partager' : 'Share'}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
