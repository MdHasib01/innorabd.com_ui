// Preserve historical colours while allowing the current photographed collection.
const fs = require('node:fs');
const path = require('node:path');
const target = path.resolve(__dirname, '../../server/src/config/campaign.js');
const before = "variants: ['pink', 'burgundy', 'black'],";
const after = "variants: ['pink', 'burgundy', 'black', 'red', 'lavender'],";
const contents = fs.readFileSync(target, 'utf8');
if (contents.includes(after)) {
  console.log('The server already accepts red and lavender.');
} else {
  if (!contents.includes(before)) throw new Error('Campaign configuration changed; review before applying.');
  fs.writeFileSync(target, contents.replace(before, after));
  console.log('Updated server colour validation; preserved historical orders.');
}
