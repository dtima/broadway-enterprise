const fs = require('fs');
const path = require('path');

// Read the enhanced catalog
const catalogPath = path.join(__dirname, '../data/enhanced-catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// Track used IDs and fix duplicates
const usedIds = new Set();
const duplicates = [];

catalog.items.forEach((item, index) => {
  if (usedIds.has(item.id)) {
    duplicates.push({ index, id: item.id, name: item.nameEn });
    // Create unique ID by appending index
    item.id = `${item.id}-${index}`;
  }
  usedIds.add(item.id);
});

// Write the fixed catalog
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));

console.log(`Fixed ${duplicates.length} duplicate IDs:`);
duplicates.forEach(dup => {
  console.log(`- ${dup.id} (${dup.name}) -> ${dup.id}-${dup.index}`);
});

console.log(`Total items: ${catalog.items.length}`);
console.log(`Unique IDs: ${usedIds.size}`);
