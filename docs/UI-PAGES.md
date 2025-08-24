# Broadway Enterprise — UI Page Designs

Author: CTO

Scope: Broadway Enterprise website and Admin Dashboard

Format: Each page lists Purpose, Route, SEO, Layout, Sections, States, Responsive, Data, i18n, Analytics, Accessibility.

---

## Home

- **Route**: `/`
- **Purpose**: Introduce Broadway Enterprise; showcase core services and mission.
- **SEO**: Title “Broadway Corporation — Farmhouse, Enterprise, Intelligence, Resorts”; meta description; OG image.
- **Layout**: AppShell → Header, Hero, Mission, Core Services, Target Audience, Learning Activities, CTA, Footer.
- **Sections**:
  - Hero with eyebrow "🧪 Enterprise" and tagline "Systems That Power Africa's Future"
  - Mission statement: "Beyond Infrastructure: A Gateway to Scientific Discovery"
  - Core services grid (3 cards: Lab Design, Community Development, Cognitive Development)
  - Target audience showcase (Evening Students, Science Enthusiasts, Practical Learners)
  - Learning activities grid (Scrabble, Chess, Memory Games, STEM Puzzles)
  - Contact CTA band
- **States**: Loading skeletons for lists; empty states if no posts/events; error banners.
- **Responsive**: Mobile-first single column; tablet 2-column grid; desktop 3-column grid.
- **Data**: enterprise info, testimonials, featured equipment.
- **i18n**: `home.hero.title`, `home.mission.title`, `home.services.*`, etc.
- **Analytics**: `click_hero_cta`, `view_service_card`, `click_learning_activity`.
- **Accessibility**: Proper heading hierarchy, alt text for images, keyboard navigation.

---

## Farmhouse — Overview

- **Route**: `/farmhouse`
- **Purpose**: Explain Farmhouse division and route to sub-areas.
- **SEO**: Title “Farmhouse — Sustainable Agriculture”; description; OG image.
- **Layout**: Hero, Overview copy, Subsection cards, Gallery teaser, Events teaser, CTA.
- **Sections**: Intro; Cards for Scorpion, BSF, Fish; Gallery carousel; Upcoming events; Contact CTA.
- **States**: Empty for events/galleries; fallbacks for images.
- **Responsive**: 3-up cards → 1-up; gallery horizontal scroll on mobile.
- **Data**: divisions(farmhouse), galleries, events.
- **i18n**: `farmhouse.overview.*`
- **Analytics**: `click_subsection_card`, `view_gallery_item`.
- **Accessibility**: Image alt for farms; section landmarks.

---

## Farmhouse — Scorpion Farm

- **Route**: `/farmhouse/scorpion`
- **Purpose**: Detail scorpion farming with education/tour info.
- **SEO**: “Scorpion Farm — Farmhouse”.
- **Layout**: Hero, What/Why, Process steps, Gallery, Visit info, Inquiry form CTA.
- **Sections**: Stepper component; media gallery; FAQ accordion.
- **Data**: `pages(farmhouse-scorpion)`, `galleries(scorpion)`.

---

## Farmhouse — BSF Farm

- **Route**: `/farmhouse/bsf`
- **Purpose**: Black Soldier Fly farm overview.
- **Layout**: Hero, Benefits, Process, Gallery, CTA.
- **Data**: `pages(farmhouse-bsf)`, `galleries(bsf)`.

---

## Farmhouse — Fish Farm

- **Route**: `/farmhouse/fish`
- **Purpose**: Fish farm overview.
- **Layout**: Hero, Species grid, Operations, Gallery, CTA.
- **Data**: `pages(farmhouse-fish)`, `galleries(fish)`.

---

## Farmhouse — Galleries

- **Route**: `/farmhouse/galleries`
- **Purpose**: Visual showcase; filterable by farm.
- **Layout**: Filters toolbar, Masonry/Responsive grid, Lightbox modal.
- **States**: Empty/gallery placeholder; loading skeleton tiles.
- **Data**: media with tags (scorpion, bsf, fish).

---

## Broadway Laboratories

- **Route**: `/laboratories`
- **Purpose**: Showcase physical lab facilities and access programs.
- **SEO**: Title "Broadway Laboratories — Broadway Enterprise"; meta description; OG image.
- **Layout**: Hero, Lab Showcase, Access Programs, Visit Information, CTA.
- **Sections**:
  - Hero with lab overview
  - Lab facility showcase with 360° views
  - Access program details
  - Visit guidelines and scheduling
  - Contact CTA for lab access
- **States**: Image galleries, loading states, contact forms.
- **Responsive**: Mobile image galleries, tablet grid, desktop immersive layout.
- **Data**: lab facilities, access programs, visit schedules.
- **i18n**: `laboratories.hero.title`, `laboratories.facilities.*`, `laboratories.access.*`.
- **Analytics**: `view_laboratories`, `view_lab_facility`, `request_lab_access`, `schedule_visit`.
- **Accessibility**: Image alt text, touch navigation, clear visit information.

---

## Enterprise — Catalog

- **Route**: `/catalog`
- **Purpose**: Browse and filter scientific equipment and supplies.
- **SEO**: “Enterprise Catalog — Lab Equipment”.
- **Layout**: Hero, Filters, Product Grid, Pagination, CTA.
- **Sections**: 
  - Hero with search and category navigation
  - Filter sidebar (drawer on mobile)
  - Product grid with cards
  - Pagination and load more
  - Contact CTA for custom requests
- **States**: Empty/search-no-results; loading skeleton cards; error banner.
- **Data**: products collection, categories, specifications.
- **i18n**: `catalog.hero.title`, `catalog.filters.*`, `catalog.products.*`.
- **Analytics**: `view_catalog`, `apply_filter`, `view_product_card`, `click_product`.
- **Accessibility**: Filter labels, grid semantics, keyboard navigation, screen reader support.

---

## Product Detail

- **Route**: `/catalog/[slug]`
- **Purpose**: Detailed product specifications; convert to inquiry.
- **SEO**: Title "[Product Name] — Broadway Enterprise"; meta description; OG image.
- **Layout**: Hero, Gallery, Specifications, Downloads, Related Products, Inquiry Form.
- **Sections**:
  - Hero with product title and key specs
  - Image gallery with carousel
  - Detailed specifications table
  - Downloadable documentation
  - Related products grid
  - Inquiry form CTA
- **States**: Image loading, form submission, success states.
- **Responsive**: Mobile gallery, tablet side-by-side, desktop immersive layout.
- **Data**: product by slug, related products, specifications.
- **i18n**: `product.hero.title`, `product.specs.*`, `product.inquiry.*`.
- **Analytics**: `view_product_detail`, `view_gallery`, `download_specs`, `submit_inquiry`.
- **Accessibility**: Image alt text, form validation, clear CTAs, mobile-friendly inputs.

---

## Laboratory Designs

- **Route**: `/designs`
- **Purpose**: Showcase laboratory design portfolio and case studies.
- **SEO**: Title "Laboratory Designs — Broadway Enterprise"; meta description; OG image.
- **Layout**: Hero, Portfolio Grid, Case Studies, CTA.
- **Sections**:
  - Hero with design philosophy
  - Portfolio grid with filterable categories
  - Case study highlights
  - Design process explanation
  - Consultation CTA
- **States**: Loading states, empty portfolio, error handling.
- **Responsive**: Mobile horizontal scroll, tablet grid, desktop masonry layout.
- **Data**: designs collection, case studies, testimonials.
- **i18n**: `designs.hero.title`, `designs.portfolio.*`, `designs.case_studies.*`.
- **Analytics**: `view_designs`, `filter_portfolio`, `view_case_study`, `request_consultation`.
- **Accessibility**: Image galleries with alt text, touch navigation, keyboard controls.

---

## STEM Programs

- **Route**: `/stem`
- **Purpose**: Promote educational programs and capture student interest.
- **SEO**: Title "STEM Programs — Broadway Enterprise"; meta description; OG image.
- **Layout**: Hero, Program Overview, Age Groups, Registration, CTA.
- **Sections**:
  - Hero with program benefits
  - Age-appropriate program cards
  - Learning activities showcase
  - Registration flow
  - Contact CTA for inquiries
- **States**: Registration forms, success states, loading indicators.
- **Responsive**: Mobile stacked cards, tablet 2-column, desktop 3-column grid.
- **Data**: programs collection, age groups, schedules, registrations.
- **i18n**: `stem.hero.title`, `stem.programs.*`, `stem.registration.*`.
- **Analytics**: `view_stem_programs`, `view_program_detail`, `start_registration`, `complete_registration`.
- **Accessibility**: Form validation, progress indicators, clear CTAs, mobile-friendly inputs.

---

## Technical Support

- **Route**: `/support`
- **Purpose**: Provide troubleshooting guides and technical assistance.
- **SEO**: Title "Technical Support — Broadway Enterprise"; meta description; OG image.
- **Layout**: Hero, FAQ Accordion, Contact Forms, Documentation, CTA.
- **Sections**:
  - Hero with support overview
  - FAQ accordion with common issues
  - Contact forms for technical support
  - Documentation and guides
  - Emergency contact CTA
- **States**: FAQ expansion, form submission, loading states.
- **Responsive**: Mobile accordion, tablet side-by-side, desktop multi-column.
- **Data**: FAQ collection, support tickets, documentation.
- **i18n**: `support.hero.title`, `support.faq.*`, `support.contact.*`.
- **Analytics**: `view_support`, `expand_faq`, `submit_support_ticket`, `download_docs`.
- **Accessibility**: Accordion controls, form validation, clear navigation, screen reader support.

---

## Contact

- **Route**: `/contact`
- **Purpose**: Capture inquiries and provide contact information.
- **SEO**: Title "Contact Us — Broadway Enterprise"; meta description; OG image.
- **Layout**: Hero, Contact Form, Office Information, Map, CTA.
- **Sections**:
  - Hero with contact overview
  - Contact form with validation
  - Office location and hours
  - Interactive map
  - Follow-up CTA
- **States**: Form validation, submission success, error handling.
- **Responsive**: Mobile full-width form, tablet side-by-side, desktop multi-column.
- **Data**: contact submissions, office information, map coordinates.
- **i18n**: `contact.hero.title`, `contact.form.*`, `contact.office.*`.
- **Analytics**: `view_contact`, `start_form`, `complete_form`, `submit_contact`.
- **Accessibility**: Form labels, validation messages, clear CTAs, mobile-friendly inputs.







---

## Event — Detail

- **Route**: `/events/[id]`
- **Layout**: Hero (title/date/location), Details, Gallery, Registration CTA.

---

## Jobs — List

- **Route**: `/jobs`
- **Layout**: Filters (department/location), Job cards, Pagination.
- **Data**: jobs (published, open).

---

## Job — Detail

- **Route**: `/jobs/[id]`
- **Layout**: Title, Meta, Description, Requirements, Apply CTA → Application form.

---

## Job — Application

- **Route**: `/jobs/[id]/apply`
- **Layout**: Multi-step form (Personal, Experience, Documents, Review, Submit), Progress indicator.
- **States**: Draft autosave; upload progress; success screen.

---

## Contact

- **Route**: `/contact`
- **Layout**: Contact form (name/email/subject/message), Map, Contacts, Newsletter opt-in.
- **States**: Validation inline; success banner; error retry.

---

## Search Results

- **Route**: `/search?q=`
- **Layout**: Search input, Filters by type (product, post, event), Results list.
- **States**: No results; suggestions.

---

## Legal — Privacy Policy

- **Route**: `/legal/privacy`
- **Layout**: ToC sidebar, Content sections, Last updated.

---

## Legal — Terms of Service

- **Route**: `/legal/terms`
- **Layout**: ToC sidebar, Content sections, Last updated.

---

## Auth — Admin Sign In

- **Route**: `/admin/sign-in`
- **Layout**: Form (email/password or provider), Error handling, Redirect post-login.

---

## 404 Not Found

- **Route**: `/404`
- **Layout**: Friendly message, Search, Popular links.

---

## 500 Error

- **Route**: `/500`
- **Layout**: Apology, Retry action, Contact link.

---

## Admin — Dashboard

- **Route**: `/admin`
- **Purpose**: Snapshot of KPIs and quick access to Enterprise modules.
- **Layout**: KPI cards (traffic, equipment inquiries, program registrations), Recent items, Quick links.
- **Access**: Authenticated (role: admin/editor).
- **Analytics**: `admin_view_dashboard`.

---

## Admin — Equipment Management

- **Route**: `/admin/equipment`
- **Purpose**: Manage equipment inventory, pricing, and specifications.
- **Layout**: Equipment table, Filters, CRUD operations, Import/Export, Analytics.
- **Sections**: Equipment list, Add/Edit forms, Category management, Pricing updates.
- **States**: Loading states, form validation, success/error messages.
- **Responsive**: Mobile-friendly table, tablet side-by-side, desktop full-featured.
- **Data**: equipment collection, categories, specifications, pricing.
- **i18n**: `admin.equipment.*`, `admin.categories.*`, `admin.pricing.*`.
- **Analytics**: `manage_equipment`, `update_pricing`, `export_inventory`.
- **Accessibility**: Table navigation, form validation, clear CTAs, keyboard shortcuts.

---

## Admin — Lab Designs

- **Route**: `/admin/designs`
- **Purpose**: Manage laboratory design portfolio and case studies.
- **Layout**: Designs table, Filters, Portfolio editor, Case study manager, Analytics.
- **Sections**: Design list, Add/Edit forms, Portfolio categories, Case study editor.
- **States**: Loading states, form validation, image upload progress.
- **Responsive**: Mobile-friendly table, tablet side-by-side, desktop full-featured.
- **Data**: designs collection, case studies, portfolio categories, testimonials.
- **i18n**: `admin.designs.*`, `admin.portfolio.*`, `admin.case_studies.*`.
- **Analytics**: `manage_designs`, `update_portfolio`, `edit_case_study`.
- **Accessibility**: Table navigation, form validation, image alt text, keyboard shortcuts.

---

## Admin — STEM Programs

- **Route**: `/admin/stem`
- **Purpose**: Manage STEM educational programs and registrations.
- **Layout**: Programs table, Calendar view, Program editor, Registration manager, Analytics.
- **Sections**: Program list, Add/Edit forms, Age groups, Schedule management, Registration tracking.
- **States**: Loading states, form validation, registration updates.
- **Responsive**: Mobile-friendly table, tablet side-by-side, desktop full-featured.
- **Data**: programs collection, age groups, schedules, registrations.
- **i18n**: `admin.stem.*`, `admin.programs.*`, `admin.registrations.*`.
- **Analytics**: `manage_programs`, `update_schedule`, `track_registrations`.
- **Accessibility**: Table navigation, form validation, calendar controls, keyboard shortcuts.

---

## Admin — Technical Support

- **Route**: `/admin/support`
- **Purpose**: Manage FAQ, support tickets, and documentation.
- **Layout**: Support dashboard, FAQ manager, Ticket system, Documentation editor, Analytics.
- **Sections**: FAQ list, Ticket management, Documentation editor, Support analytics.
- **States**: Loading states, form validation, ticket updates.
- **Responsive**: Mobile-friendly interface, tablet side-by-side, desktop full-featured.
- **Data**: FAQ collection, support tickets, documentation, analytics.
- **i18n**: `admin.support.*`, `admin.faq.*`, `admin.tickets.*`.
- **Analytics**: `manage_faq`, `update_documentation`, `track_tickets`.
- **Accessibility**: Table navigation, form validation, clear CTAs, keyboard shortcuts.

---

## Admin — Lab Assets

- **Route**: `/admin/assets`
- **Purpose**: Manage laboratory images, videos, and documentation assets.
- **Layout**: Asset grid, Upload system, Folder organization, Preview tools, Analytics.
- **Sections**: Asset library, Upload interface, Folder management, Asset editor.
- **States**: Upload progress, loading states, preview generation.
- **Responsive**: Mobile-friendly grid, tablet side-by-side, desktop full-featured.
- **Data**: assets collection, folders, tags, metadata.
- **i18n**: `admin.assets.*`, `admin.upload.*`, `admin.folders.*`.
- **Analytics**: `manage_assets`, `upload_files`, `organize_folders`.
- **Accessibility**: Grid navigation, upload controls, preview tools, keyboard shortcuts.

---

## Admin — Lab Access Programs

- **Route**: `/admin/lab-access`
- **Purpose**: Manage laboratory access programs and visit scheduling.
- **Layout**: Programs table, Calendar view, Access manager, Visit scheduler, Analytics.
- **Sections**: Program list, Access management, Visit scheduling, Safety guidelines.
- **States**: Loading states, form validation, schedule updates.
- **Responsive**: Mobile-friendly table, tablet side-by-side, desktop full-featured.
- **Data**: access programs, visit schedules, safety guidelines, registrations.
- **i18n**: `admin.lab_access.*`, `admin.programs.*`, `admin.scheduling.*`.
- **Analytics**: `manage_access_programs`, `update_schedules`, `track_visits`.
- **Accessibility**: Table navigation, calendar controls, form validation, keyboard shortcuts.

---



---

## Admin — Enterprise Inquiries

- **Route**: `/admin/inquiries`
- **Purpose**: Manage equipment inquiries, consultation requests, and support tickets.
- **Layout**: Inquiries dashboard, Ticket system, Response templates, Analytics, Export tools.
- **Sections**: Inquiry list, Ticket management, Response system, Analytics dashboard.
- **States**: Loading states, ticket updates, response tracking.
- **Responsive**: Mobile-friendly interface, tablet side-by-side, desktop full-featured.
- **Data**: inquiries collection, tickets, response templates, analytics.
- **i18n**: `admin.inquiries.*`, `admin.tickets.*`, `admin.responses.*`.
- **Analytics**: `manage_inquiries`, `update_tickets`, `track_responses`.
- **Accessibility**: Table navigation, ticket management, form validation, keyboard shortcuts.

---

## Admin — Program Registrations

- **Route**: `/admin/registrations`
- **Purpose**: Manage STEM program registrations and participant data.
- **Layout**: Registrations dashboard, Participant management, Program tracking, Analytics, Export tools.
- **Sections**: Registration list, Participant details, Program tracking, Analytics dashboard.
- **States**: Loading states, registration updates, data exports.
- **Responsive**: Mobile-friendly interface, tablet side-by-side, desktop full-featured.
- **Data**: registrations collection, participants, programs, analytics.
- **i18n**: `admin.registrations.*`, `admin.participants.*`, `admin.programs.*`.
- **Analytics**: `manage_registrations`, `track_participants`, `export_data`.
- **Accessibility**: Table navigation, data management, form validation, keyboard shortcuts.

---

## Admin — Settings

- **Route**: `/admin/settings`
- **Layout**: Tabs (Locales, SEO defaults, Roles, Integrations), Forms with validation.

---

## Global Components and Patterns

- **Header**: Logo, primary navigation (Home, Catalog, Designs, STEM, Laboratories, Support, Contact), language switcher (EN/FR), search, admin link.
- **Footer**: Sitemap, social links, legal links, contact information.
- **Forms**: Validation on blur, summary on submit, disabled submit during network requests.
- **Tables**: Column sorting, server-side pagination, keyboard navigation, mobile-friendly.
- **Modals/Drawers**: Focus trap, ESC to close, backdrop click optional, mobile-optimized.
- **Loading**: Skeletons for list-heavy pages, spinners for single actions, progressive loading.
- **Error handling**: Inline errors with retry options, toast notifications for transient issues.
- **Theming**: Light theme by default, support for high-contrast mode, enterprise aesthetics.
- **Internationalization**: All user-facing strings via translation keys, EN/FR parity, cultural adaptation.
- **Accessibility**: WCAG 2.1 AA compliance, logical headings and landmarks, comprehensive alt text, mobile-first accessibility.
