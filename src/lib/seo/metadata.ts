import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  structuredData?: object;
}

const defaultMetadata = {
  siteName: 'Broadway Enterprise',
  domain: 'https://broadway-enterprise.com',
  defaultImage: '/images/og-default.jpg',
  twitterHandle: '@BroadwayEnt',
  locale: 'en_US',
  type: 'website' as const
};

export function generateMetadata(config: SEOConfig, locale: string = 'en'): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = defaultMetadata.defaultImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    noIndex = false
  } = config;

  const fullTitle = title.includes(defaultMetadata.siteName) 
    ? title 
    : `${title} | ${defaultMetadata.siteName}`;

  const canonicalUrl = canonical || `${defaultMetadata.domain}/${locale}`;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${defaultMetadata.domain}${ogImage}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    canonical: canonicalUrl,
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: defaultMetadata.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      type: ogType
    },

    // Twitter
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: defaultMetadata.twitterHandle,
      site: defaultMetadata.twitterHandle
    },

    // Additional meta tags
    other: {
      'theme-color': '#2563eb',
      'msapplication-TileColor': '#2563eb',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no'
    }
  };
}

// Page-specific SEO configurations
export const seoConfigs = {
  home: {
    title: 'Broadway Enterprise - Leading STEM Education Platform',
    description: 'Transform your educational institution with cutting-edge laboratory equipment, custom designs, and comprehensive STEM programs. Trusted by 500+ institutions worldwide.',
    keywords: ['STEM education', 'laboratory equipment', 'scientific instruments', 'educational technology', 'lab design', 'research equipment'],
    ogType: 'website' as const
  },

  catalog: {
    title: 'Scientific Equipment Catalog - Broadway Enterprise',
    description: 'Browse our comprehensive catalog of premium laboratory equipment from leading manufacturers. Find microscopes, analyzers, safety equipment, and more.',
    keywords: ['laboratory equipment', 'scientific instruments', 'microscopes', 'analyzers', 'lab supplies', 'research tools'],
    ogType: 'website' as const
  },

  designs: {
    title: 'Laboratory Design Portfolio - Broadway Enterprise',
    description: 'Explore our custom laboratory designs tailored for research and education. From concept to completion, we create spaces that inspire innovation.',
    keywords: ['laboratory design', 'lab planning', 'research facilities', 'educational spaces', 'custom labs', 'lab architecture'],
    ogType: 'website' as const
  },

  programs: {
    title: 'STEM Programs - Broadway Enterprise',
    description: 'Engaging STEM programs designed to inspire students across all age groups. Expert-led curricula with hands-on activities and real-world applications.',
    keywords: ['STEM programs', 'science education', 'educational programs', 'student engagement', 'hands-on learning', 'STEM curriculum'],
    ogType: 'website' as const
  },

  contact: {
    title: 'Contact Us - Broadway Enterprise',
    description: 'Get in touch with our team of experts. We\'re here to help with your laboratory needs, STEM programs, and any questions you may have.',
    keywords: ['contact', 'support', 'consultation', 'laboratory experts', 'customer service'],
    ogType: 'website' as const
  },

  admin: {
    title: 'Admin Dashboard - Broadway Enterprise',
    description: 'Manage your Broadway Enterprise account, content, and settings.',
    keywords: ['admin', 'dashboard', 'management'],
    noIndex: true
  },

  signin: {
    title: 'Sign In - Broadway Enterprise',
    description: 'Sign in to your Broadway Enterprise account to access exclusive features and manage your preferences.',
    keywords: ['sign in', 'login', 'account access'],
    noIndex: true
  },

  signup: {
    title: 'Create Account - Broadway Enterprise',
    description: 'Join Broadway Enterprise to access premium laboratory equipment, custom designs, and educational programs.',
    keywords: ['sign up', 'create account', 'register', 'join'],
    noIndex: true
  },

  profile: {
    title: 'Profile Settings - Broadway Enterprise',
    description: 'Manage your account settings, preferences, and profile information.',
    keywords: ['profile', 'settings', 'account management'],
    noIndex: true
  }
};

// Structured data generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Broadway Enterprise',
    url: defaultMetadata.domain,
    logo: `${defaultMetadata.domain}/images/logo.png`,
    description: 'Leading provider of laboratory equipment, custom designs, and STEM education programs for educational institutions worldwide.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Innovation Drive',
      addressLocality: 'Science Park',
      addressRegion: 'SP',
      postalCode: '12345',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'customer service',
      email: 'info@broadway-enterprise.com'
    },
    sameAs: [
      'https://twitter.com/BroadwayEnt',
      'https://linkedin.com/company/broadway-enterprise',
      'https://facebook.com/BroadwayEnterprise'
    ]
  };
}

export function generateProductSchema(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.[0] || defaultMetadata.defaultImage,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Broadway Enterprise'
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'USD',
      availability: product.stockStatus === 'in-stock' 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock'
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 0
    } : undefined
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
