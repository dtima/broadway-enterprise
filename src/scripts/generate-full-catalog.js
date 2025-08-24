const fs = require('fs');
const path = require('path');

// Read the original catalog
const originalCatalog = JSON.parse(fs.readFileSync(path.join(__dirname, '../../docs/Catalog.json'), 'utf8'));

// Category mapping based on item names
const categorizeItem = (itemName) => {
  const name = itemName.toLowerCase();
  
  if (name.includes('flask') || name.includes('beaker') || name.includes('tube') || 
      name.includes('cylinder') || name.includes('burette') || name.includes('pipette') ||
      name.includes('conical') || name.includes('volumetric') || name.includes('glass') ||
      name.includes('reagent bottle') || name.includes('separating funnel') || 
      name.includes('watch glass') || name.includes('crucible')) {
    return 'glassware';
  }
  
  if (name.includes('balance') || name.includes('scale') || name.includes('measuring') ||
      name.includes('thermometer') || name.includes('micrometer') || name.includes('vernier') ||
      name.includes('meter rule') || name.includes('calliper') || name.includes('gauge')) {
    return 'measuring';
  }
  
  if (name.includes('bunsen') || name.includes('tripod') || name.includes('clamp') ||
      name.includes('stand') || name.includes('spatula') || name.includes('brush') ||
      name.includes('rack') || name.includes('holder') || name.includes('wire') ||
      name.includes('gauze') || name.includes('clip') || name.includes('forceps') ||
      name.includes('dissecting') || name.includes('lens') || name.includes('safety') ||
      name.includes('goggle') || name.includes('glove') || name.includes('filter paper')) {
    return 'tools';
  }
  
  if (name.includes('microscope') || name.includes('slide') || name.includes('petri') ||
      name.includes('specimen') || name.includes('skeleton') || name.includes('model') ||
      name.includes('chart') || name.includes('syringe') || name.includes('dissecting')) {
    return 'biology';
  }
  
  if (name.includes('voltmeter') || name.includes('ammeter') || name.includes('rheostat') ||
      name.includes('wire') || name.includes('cell') || name.includes('diode') ||
      name.includes('transistor') || name.includes('resistor') || name.includes('led') ||
      name.includes('capacitor') || name.includes('galvanometer') || name.includes('ldr') ||
      name.includes('thermistor') || name.includes('potentiometer')) {
    return 'electronics';
  }
  
  if (name.includes('acid') || name.includes('sodium') || name.includes('potassium') ||
      name.includes('chloride') || name.includes('sulphate') || name.includes('nitrate') ||
      name.includes('carbonate') || name.includes('hydroxide') || name.includes('oxide') ||
      name.includes('solution') || name.includes('indicator') || name.includes('reagent') ||
      name.includes('alcohol') || name.includes('benzene') || name.includes('glucose') ||
      name.includes('starch') || name.includes('fehling') || name.includes('benedict')) {
    return 'chemicals';
  }
  
  if (name.includes('lens') || name.includes('mirror') || name.includes('prism') ||
      name.includes('magnet') || name.includes('spring') || name.includes('pulley') ||
      name.includes('mass') || name.includes('pendulum') || name.includes('compass')) {
    return 'physics';
  }
  
  return 'tools'; // Default category
};

// Generate enhanced catalog
const enhancedCatalog = {
  categories: [
    {
      id: "glassware",
      name: "Glassware",
      nameEn: "Glassware",
      nameFr: "Verrerie",
      icon: "🧪",
      description: "Laboratory glassware for precise measurements and reactions",
      descriptionFr: "Verrerie de laboratoire pour mesures précises et réactions"
    },
    {
      id: "measuring",
      name: "Measuring Equipment",
      nameEn: "Measuring Equipment",
      nameFr: "Équipement de mesure",
      icon: "⚖️",
      description: "Precision instruments for accurate measurements",
      descriptionFr: "Instruments de précision pour mesures exactes"
    },
    {
      id: "tools",
      name: "Lab Tools",
      nameEn: "Lab Tools",
      nameFr: "Outils de laboratoire",
      icon: "🔧",
      description: "Essential laboratory tools and equipment",
      descriptionFr: "Outils et équipements essentiels de laboratoire"
    },
    {
      id: "chemicals",
      name: "Chemicals",
      nameEn: "Chemicals",
      nameFr: "Produits chimiques",
      icon: "⚗️",
      description: "Laboratory chemicals and reagents",
      descriptionFr: "Produits chimiques et réactifs de laboratoire"
    },
    {
      id: "electronics",
      name: "Electronics",
      nameEn: "Electronics",
      nameFr: "Électronique",
      icon: "⚡",
      description: "Electronic instruments and devices",
      descriptionFr: "Instruments et appareils électroniques"
    },
    {
      id: "biology",
      name: "Biology Equipment",
      nameEn: "Biology Equipment",
      nameFr: "Équipement de biologie",
      icon: "🔬",
      description: "Biological research and study equipment",
      descriptionFr: "Équipement de recherche et d'étude biologique"
    },
    {
      id: "physics",
      name: "Physics Equipment",
      nameEn: "Physics Equipment",
      nameFr: "Équipement de physique",
      icon: "⚛️",
      description: "Physics laboratory instruments and apparatus",
      descriptionFr: "Instruments et appareils de laboratoire de physique"
    }
  ],
  items: []
};

// Convert all items
originalCatalog.items.forEach((itemName, index) => {
  if (itemName.trim() === '' || itemName === 'NEW EQUIPMENT' || itemName === 'NEW') {
    return; // Skip empty or placeholder items
  }
  
  const category = categorizeItem(itemName);
  const id = itemName.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  const item = {
    id: id || `item-${index}`,
    nameEn: itemName,
    nameFr: itemName, // Would need translation for full French support
    description: `High-quality ${itemName.toLowerCase()} for laboratory use`,
    descriptionFr: `${itemName} de haute qualité pour usage en laboratoire`,
    category: category,
    icon: category === 'glassware' ? '🧪' :
          category === 'measuring' ? '⚖️' :
          category === 'tools' ? '🔧' :
          category === 'chemicals' ? '⚗️' :
          category === 'electronics' ? '⚡' :
          category === 'biology' ? '🔬' :
          category === 'physics' ? '⚛️' : '🔧',
    stockStatus: Math.random() > 0.1 ? 'in-stock' : (Math.random() > 0.5 ? 'low-stock' : 'out-of-stock'),
    featured: Math.random() > 0.8,
    tags: [category, 'laboratory', 'equipment']
  };
  
  enhancedCatalog.items.push(item);
});

// Write the enhanced catalog
fs.writeFileSync(
  path.join(__dirname, '../data/enhanced-catalog.json'),
  JSON.stringify(enhancedCatalog, null, 2)
);

console.log(`Generated enhanced catalog with ${enhancedCatalog.items.length} items across ${enhancedCatalog.categories.length} categories`);
