# Broadway Enterprise - STEM Education Platform

A mobile-first Next.js 15+ application for Broadway Enterprise, focusing on STEM education, laboratory design, and scientific equipment across Africa.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🏗️ Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Radix UI
- **Animation**: Framer Motion
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Auth**: Firebase Auth with RBAC
- **i18n**: next-intl (EN/FR)
- **Package Manager**: pnpm

## 📱 Mobile-First Design

- **Breakpoints**: sm(640), md(768), lg(1024), xl(1280), 2xl(1536)
- **Performance**: LCP ≤ 1.5s mobile, Lighthouse ≥ 90
- **Accessibility**: WCAG 2.1 AA compliance
- **Touch**: 44px minimum touch targets

## 🎨 Design System

- **Primary**: `hsl(221 83% 53%)` - Enterprise blue
- **Accent**: `hsl(174 84% 40%)` - STEM teal
- **Typography**: Inter (default), Geist Mono (code)
- **Spacing**: 4px base unit scale
- **Radius**: 4, 8, 12, 16px

## 🔐 Security

- **CSP**: Content Security Policy headers
- **RBAC**: Role-based access (admin/editor/viewer)
- **Validation**: Zod schemas for all inputs
- **Rate Limiting**: API protection

## 📊 Analytics

- **Core Web Vitals**: Vercel Analytics
- **Error Tracking**: Sentry (optional)
- **Business Metrics**: Custom event tracking

## 🌍 Internationalization

- **Languages**: English (primary), French (secondary)
- **Framework**: next-intl
- **Content Parity**: All content available in both languages

## 📁 Project Structure (Features-Based)

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── features/              # Feature-based modules
│   ├── equipment/         # Equipment catalog feature
│   │   ├── components/    # Equipment-specific components
│   │   ├── services/      # Equipment data services
│   │   └── hooks/         # Equipment-specific hooks
│   ├── laboratory-design/ # Lab design feature
│   │   ├── components/    # Design-specific components
│   │   └── services/      # Design data services
│   ├── stem-programs/     # STEM programs feature
│   │   ├── components/    # Program-specific components
│   │   └── services/      # Program data services
│   ├── contact/           # Contact & forms feature
│   │   ├── components/    # Contact forms
│   │   └── services/      # Form submission services
│   └── admin/             # Admin dashboard feature
│       └── components/    # Admin-specific components
├── components/            # Shared UI components
│   ├── ui/               # Design system components
│   └── layout/           # Layout components
├── lib/                  # Utilities and configurations
│   ├── firebase/         # Firebase setup
│   ├── i18n/            # Internationalization
│   ├── utils/           # Utility functions
│   └── validations/     # Zod schemas
├── types/               # TypeScript type definitions
├── messages/            # i18n message files
└── middleware.ts        # Next.js middleware
```

## 🔧 Development

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint
pnpm lint:fix

# Formatting
pnpm format
pnpm format:check

# Testing
pnpm test
pnpm test:watch
pnpm test:coverage
```

## 🚀 Deployment

- **Primary**: Vercel
- **Fallback**: Firebase Hosting
- **Environment**: Production, Staging, Development

## 📝 License

Private - Broadway Enterprise
