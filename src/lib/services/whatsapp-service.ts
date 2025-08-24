import { QuoteRequest } from '@/types/catalog';

export class WhatsAppService {
  private static readonly WHATSAPP_NUMBER = '+237677181487';
  private static readonly WHATSAPP_API_URL = 'https://wa.me/';

  static async sendQuoteRequest(quoteRequest: QuoteRequest): Promise<void> {
    try {
      // Format the message for WhatsApp
      const message = this.formatQuoteMessage(quoteRequest);
      
      // Create WhatsApp URL with pre-filled message
      const whatsappUrl = `${this.WHATSAPP_API_URL}${this.WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in new window/tab
      window.open(whatsappUrl, '_blank');
      
      // Log the quote request for analytics (optional)
      console.log('Quote request sent via WhatsApp:', quoteRequest);
      
    } catch (error) {
      console.error('Error sending WhatsApp quote request:', error);
      throw new Error('Failed to send quote request via WhatsApp');
    }
  }

  private static formatQuoteMessage(quoteRequest: QuoteRequest): string {
    const { items, customerInfo } = quoteRequest;
    
    let message = `🔬 *BROADWAY ENTERPRISE - QUOTE REQUEST*\n\n`;
    
    // Customer Information
    message += `👤 *Customer Information:*\n`;
    message += `• Name: ${customerInfo.name}\n`;
    message += `• Email: ${customerInfo.email}\n`;
    if (customerInfo.phone) {
      message += `• Phone: ${customerInfo.phone}\n`;
    }
    if (customerInfo.organization) {
      message += `• Organization: ${customerInfo.organization}\n`;
    }
    message += `\n`;
    
    // Requested Items
    message += `📋 *Requested Items:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (Qty: ${item.quantity})\n`;
    });
    message += `\n`;
    
    // Additional Message
    if (customerInfo.message) {
      message += `💬 *Additional Message:*\n${customerInfo.message}\n\n`;
    }
    
    // Footer
    message += `📅 Request Date: ${new Date().toLocaleDateString()}\n`;
    message += `🌐 Website: broadway-corp.com\n`;
    message += `\nPlease provide a detailed quote for the above items. Thank you!`;
    
    return message;
  }

  // Alternative method for direct API integration (if WhatsApp Business API is available)
  static async sendQuoteRequestAPI(quoteRequest: QuoteRequest): Promise<void> {
    // This would be used if you have WhatsApp Business API credentials
    // For now, we'll use the web URL method above
    throw new Error('WhatsApp Business API not configured. Using web URL method instead.');
  }

  // Validate phone number format
  static validatePhoneNumber(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  // Format phone number for WhatsApp
  static formatPhoneNumber(phone: string): string {
    return phone.replace(/\s/g, '').replace(/^\+/, '');
  }
}
