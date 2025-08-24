'use client';

import Link from 'next/link';
import { useTranslations } from '@/lib/i18n/pure-static';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-primary" />
              <span className="font-bold">Broadway Enterprise</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t('quickLinks')}</h4>
            <nav className="space-y-2">
              <Link
                href="/catalog"
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                {t('catalog')}
              </Link>
              <Link
                href="/designs"
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                {t('designs')}
              </Link>
              <Link
                href="/stem"
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                {t('stemPrograms')}
              </Link>
              <Link
                href="/laboratories"
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                {t('laboratories')}
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t('support')}</h4>
            <nav className="space-y-2">
              <Link
                href="/support"
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                {t('technicalSupport')}
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                {t('contact')}
              </Link>
              <Link
                href="/legal/privacy"
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                {t('privacy')}
              </Link>
              <Link
                href="/legal/terms"
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                {t('terms')}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t('contactInfo')}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>enquiries@broadway-corp.com</p>
              <p>+237 677 181 487</p>
              <p>No 225 Batibo St, Simbock</p>
              <p>Yaoundé, Cameroon</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Broadway Enterprise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
