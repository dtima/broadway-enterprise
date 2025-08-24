const fs = require('fs');
const path = require('path');

// Read the enhanced catalog
const catalogPath = path.join(__dirname, '../data/enhanced-catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// Track used IDs and fix duplicates
const usedIds = new Map(); // Map to track first occurrence
const duplicatesFixed = [];

catalog.items.forEach((item, index) => {
  const originalId = item.id;
  
  if (usedIds.has(originalId)) {
    // This is a duplicate, create unique ID
    let counter = 2;
    let newId = `${originalId}-${counter}`;
    
    // Keep incrementing until we find a unique ID
    while (usedIds.has(newId)) {
      counter++;
      newId = `${originalId}-${counter}`;
    }
    
    item.id = newId;
    usedIds.set(newId, index);
    duplicatesFixed.push({
      original: originalId,
      new: newId,
      name: item.nameEn,
      index: index
    });
  } else {
    usedIds.set(originalId, index);
  }
});

// Write the fixed catalog back
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));

console.log(`Processed ${catalog.items.length} items`);
console.log(`Fixed ${duplicatesFixed.length} duplicate IDs:`);
duplicatesFixed.forEach(fix => {
  console.log(`  ${fix.original} -> ${fix.new} (${fix.name})`);
});

// Verify no duplicates remain
const finalIds = catalog.items.map(item => item.id);
const finalDuplicates = finalIds.filter((id, index) => finalIds.indexOf(id) !== index);

if (finalDuplicates.length === 0) {
  console.log('✅ All IDs are now unique!');
} else {
  console.log('❌ Still have duplicates:', finalDuplicates);
}
