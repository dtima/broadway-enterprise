'use client';

import { useState, useEffect } from 'react';
import { X, Gift, Phone, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromotionalPopupProps {
  onClose?: () => void;
}

export function PromotionalPopup({ onClose }: PromotionalPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if popup should be shown (not dismissed in last 10 minutes)
    const lastDismissed = localStorage.getItem('be-promo-popup-dismissed');
    const now = Date.now();
    const tenMinutesInMs = 10 * 60 * 1000; // 10 minutes in milliseconds

    if (!lastDismissed || (now - parseInt(lastDismissed)) > tenMinutesInMs) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    // Store dismissal timestamp
    localStorage.setItem('be-promo-popup-dismissed', Date.now().toString());
    
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose?.();
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ 
            scale: isClosing ? 0.8 : 1, 
            opacity: isClosing ? 0 : 1, 
            y: isClosing ? 20 : 0 
          }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            duration: 0.3 
          }}
          className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header with Gradient Background */}
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white p-6 pb-8">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
            
            <div className="relative text-center">
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold mb-2"
              >
                Back to School with Broadway Enterprise! 🎓
              </motion.div>
              
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-semibold bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full inline-block"
              >
                Get 20-30% off all lab equipment
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Free Gifts Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Gift className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-800">+ FREE gifts!</h3>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Our list of free gifts include:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Light Microscope(s)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Electronic Balance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Adult Human Skeleton
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Free glassware on every 10 purchased! 🎁
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              {/* Contact Button */}
              <a
                href="tel:+237677181487"
                className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                <Phone className="w-5 h-5" />
                Contact us: +237 677 181 487
              </a>

              {/* Catalog Button */}
              <a
                href="https://be.broadway-corp.com/en/catalog/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                View our catalog
              </a>
            </motion.div>

            {/* Limited Time Notice */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                ⏰ Limited time offer • Valid while supplies last
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
