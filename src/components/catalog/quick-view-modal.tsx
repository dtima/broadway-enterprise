'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Share2, X } from 'lucide-react';
import { CatalogItem } from '@/types/catalog';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CatalogItem | null;
  locale: string;
  onAddToQuote: (item: CatalogItem) => void;
}

export function QuickViewModal({ isOpen, onClose, item, locale, onAddToQuote }: QuickViewModalProps) {
  if (!item) return null;

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

  const getCategoryName = (categoryId: string) => {
    const categoryNames = {
      glassware: locale === 'fr' ? 'Verrerie' : 'Glassware',
      measuring: locale === 'fr' ? 'Équipement de mesure' : 'Measuring Equipment',
      tools: locale === 'fr' ? 'Outils de laboratoire' : 'Lab Tools',
      chemicals: locale === 'fr' ? 'Produits chimiques' : 'Chemicals',
      electronics: locale === 'fr' ? 'Électronique' : 'Electronics',
      biology: locale === 'fr' ? 'Équipement de biologie' : 'Biology Equipment'
    };
    return categoryNames[categoryId as keyof typeof categoryNames] || categoryId;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-3xl">
                {item.icon}
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {itemName}
                </DialogTitle>
                <DialogDescription className="text-lg text-gray-600 mt-1">
                  {getCategoryName(item.category)}
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Featured Badge */}
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className={`${getStockStatusColor(item.stockStatus)} font-medium`}
            >
              {getStockStatusText(item.stockStatus)}
            </Badge>
            
            {item.featured && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {locale === 'fr' ? 'Vedette' : 'Featured'}
              </Badge>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {locale === 'fr' ? 'Description' : 'Description'}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {itemDescription}
            </p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {locale === 'fr' ? 'Étiquettes' : 'Tags'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {locale === 'fr' ? 'Spécifications' : 'Specifications'}
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {locale === 'fr' ? 'Catégorie:' : 'Category:'}
                </span>
                <span className="font-medium">{getCategoryName(item.category)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {locale === 'fr' ? 'Code produit:' : 'Product Code:'}
                </span>
                <span className="font-medium font-mono">{item.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {locale === 'fr' ? 'Disponibilité:' : 'Availability:'}
                </span>
                <span className="font-medium">{getStockStatusText(item.stockStatus)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                onAddToQuote(item);
                onClose();
              }}
              disabled={item.stockStatus === 'out-of-stock'}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {locale === 'fr' ? 'Ajouter au devis' : 'Add to Quote'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: itemName,
                    text: itemDescription,
                    url: window.location.href
                  });
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {locale === 'fr' ? 'Partager' : 'Share'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
