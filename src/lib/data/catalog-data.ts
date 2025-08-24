export interface CatalogItem {
  id: string;
  name: string;
  category: 'glassware' | 'measuring' | 'tools' | 'chemicals' | 'electronics' | 'biology' | 'safety' | 'accessories';
  icon: string;
  description: string;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  featured: boolean;
  tags: string[];
  specifications?: string[];
}

export const catalogCategories = [
  { id: 'glassware', name: 'Glassware', icon: '🧪', description: 'Laboratory glass containers and apparatus' },
  { id: 'measuring', name: 'Measuring Equipment', icon: '⚖️', description: 'Precision measurement tools and instruments' },
  { id: 'tools', name: 'Lab Tools', icon: '🔧', description: 'Essential laboratory tools and equipment' },
  { id: 'chemicals', name: 'Chemicals & Reagents', icon: '⚗️', description: 'Chemical compounds and laboratory reagents' },
  { id: 'electronics', name: 'Electronics', icon: '⚡', description: 'Electronic instruments and devices' },
  { id: 'biology', name: 'Biology Equipment', icon: '🔬', description: 'Biological and microscopy equipment' },
  { id: 'safety', name: 'Safety Equipment', icon: '🛡️', description: 'Personal protective equipment and safety gear' },
  { id: 'accessories', name: 'Accessories', icon: '📦', description: 'Supporting materials and accessories' }
];

export const catalogItems: CatalogItem[] = [
  // Glassware
  {
    id: 'volumetric-flask-250ml',
    name: 'Volumetric Flask 250ml',
    category: 'glassware',
    icon: '🧪',
    description: 'High-precision volumetric flask for accurate measurements',
    stockStatus: 'in-stock',
    featured: true,
    tags: ['precision', 'measurement', 'chemistry', 'volumetric'],
    specifications: ['Capacity: 250ml', 'Material: Borosilicate glass', 'Accuracy: ±0.1ml']
  },
  {
    id: 'conical-flask-250ml',
    name: 'Conical Flask 250ml',
    category: 'glassware',
    icon: '🧪',
    description: 'Erlenmeyer flask for mixing and heating solutions',
    stockStatus: 'in-stock',
    featured: true,
    tags: ['mixing', 'heating', 'chemistry', 'conical'],
    specifications: ['Capacity: 250ml', 'Material: Borosilicate glass', 'Heat resistant']
  },
  {
    id: 'test-tubes',
    name: 'Test Tubes',
    category: 'glassware',
    icon: '🧬',
    description: 'Standard test tubes for sample analysis',
    stockStatus: 'in-stock',
    featured: true,
    tags: ['sample', 'analysis', 'chemistry', 'test-tube'],
    specifications: ['Size: Standard', 'Material: Borosilicate glass', 'Pack of 50']
  },
  {
    id: 'burettes-50ml',
    name: 'Burettes 50ml',
    category: 'glassware',
    icon: '🧪',
    description: 'Precision burettes for titrations',
    stockStatus: 'in-stock',
    featured: true,
    tags: ['precision', 'titration', 'chemistry', 'burette'],
    specifications: ['Capacity: 50ml', 'Material: Borosilicate glass', 'Teflon stopcock']
  },

  // Measuring Equipment
  {
    id: 'electronic-balance-001',
    name: 'Electronic Balance 0.01g',
    category: 'measuring',
    icon: '⚖️',
    description: 'High-precision digital balance for accurate weighing',
    stockStatus: 'in-stock',
    featured: true,
    tags: ['precision', 'weighing', 'digital', 'balance'],
    specifications: ['Accuracy: ±0.01g', 'Capacity: 200g', 'Digital display']
  },
  {
    id: 'thermometer-01',
    name: 'Thermometer 0.1°C',
    category: 'measuring',
    icon: '🌡️',
    description: 'Precision thermometer for temperature measurements',
    stockStatus: 'in-stock',
    featured: false,
    tags: ['temperature', 'precision', 'measurement', 'thermometer'],
    specifications: ['Accuracy: ±0.1°C', 'Range: -10°C to 110°C', 'Mercury-free']
  },

  // Lab Tools
  {
    id: 'bunsen-burner',
    name: 'Bunsen Burner',
    category: 'tools',
    icon: '🔥',
    description: 'Standard laboratory burner for heating',
    stockStatus: 'in-stock',
    featured: true,
    tags: ['heating', 'flame', 'chemistry', 'burner'],
    specifications: ['Fuel: Natural gas', 'Adjustable flame', 'Stable base']
  },
  {
    id: 'magnetic-stirrer',
    name: 'Magnetic Stirrer',
    category: 'tools',
    icon: '🔧',
    description: 'Electronic stirrer for mixing solutions',
    stockStatus: 'in-stock',
    featured: true,
    tags: ['mixing', 'electronic', 'laboratory', 'stirrer'],
    specifications: ['Speed: Variable', 'Capacity: Up to 2L', 'Digital control']
  },

  // Safety Equipment
  {
    id: 'safety-goggles',
    name: 'Safety Goggles',
    category: 'safety',
    icon: '🛡️',
    description: 'Protective eyewear for laboratory safety',
    stockStatus: 'in-stock',
    featured: true,
    tags: ['safety', 'protection', 'eyewear', 'goggles'],
    specifications: ['Material: Polycarbonate', 'UV protection', 'Anti-fog coating']
  },

  // Biology Equipment
  {
    id: 'microscope-monocular',
    name: 'Monocular Light Microscope',
    category: 'biology',
    icon: '🔬',
    description: 'Basic light microscope for biological observations',
    stockStatus: 'in-stock',
    featured: true,
    tags: ['microscope', 'biology', 'observation', 'light'],
    specifications: ['Magnification: 40x-400x', 'Light source: LED', 'Monocular']
  }
];

export function getItemsByCategory(category: string): CatalogItem[] {
  return catalogItems.filter(item => item.category === category);
}

export function getFeaturedItems(): CatalogItem[] {
  return catalogItems.filter(item => item.featured);
}

export function searchItems(query: string): CatalogItem[] {
  const lowercaseQuery = query.toLowerCase();
  return catalogItems.filter(item => 
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
