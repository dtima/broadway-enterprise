'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CatalogItem, QuoteRequest } from '@/types/catalog';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ item: CatalogItem; quantity: number }>;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onSubmitQuote: (request: QuoteRequest) => void;
  locale: string;
}

export function QuoteModal({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onSubmitQuote,
  locale
}: QuoteModalProps) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const quoteRequest: QuoteRequest = {
      items: items.map(({ item, quantity }) => ({
        id: item.id,
        name: locale === 'fr' ? item.nameFr : item.nameEn,
        quantity
      })),
      customerInfo
    };

    try {
      await onSubmitQuote(quoteRequest);
      onClose();
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
        organization: '',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getItemName = (item: CatalogItem) => {
    return locale === 'fr' ? item.nameFr : item.nameEn;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {locale === 'fr' ? 'Demande de devis' : 'Request Quote'}
          </DialogTitle>
          <DialogDescription>
            {locale === 'fr' 
              ? 'Remplissez vos informations pour recevoir un devis personnalisé'
              : 'Fill in your information to receive a personalized quote'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selected Items */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {locale === 'fr' ? 'Articles sélectionnés' : 'Selected Items'}
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map(({ item, quantity }) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-medium">{getItemName(item)}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, quantity - 1))}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center">{quantity}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {locale === 'fr' ? 'Vos informations' : 'Your Information'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">
                  {locale === 'fr' ? 'Nom complet *' : 'Full Name *'}
                </Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">
                  {locale === 'fr' ? 'Email *' : 'Email *'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">
                  {locale === 'fr' ? 'Téléphone' : 'Phone'}
                </Label>
                <Input
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="organization">
                  {locale === 'fr' ? 'Organisation/École' : 'Organization/School'}
                </Label>
                <Input
                  id="organization"
                  value={customerInfo.organization}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, organization: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="message">
                {locale === 'fr' ? 'Message additionnel' : 'Additional Message'}
              </Label>
              <Textarea
                id="message"
                rows={4}
                value={customerInfo.message}
                onChange={(e) => setCustomerInfo({ ...customerInfo, message: e.target.value })}
                placeholder={locale === 'fr' 
                  ? 'Décrivez vos besoins spécifiques ou questions...'
                  : 'Describe your specific needs or questions...'
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || items.length === 0 || !customerInfo.name || !customerInfo.email}
            >
              {isSubmitting 
                ? (locale === 'fr' ? 'Envoi...' : 'Sending...') 
                : (locale === 'fr' ? 'Envoyer la demande' : 'Send Request')
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
