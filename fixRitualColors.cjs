const fs = require('fs');
const path = require('path');

const ritualFile = path.join(__dirname, 'src/pages/Ritual.tsx');

if (fs.existsSync(ritualFile)) {
    let content = fs.readFileSync(ritualFile, 'utf8');
    let newContent = content;

    // Backgrounds
    newContent = newContent.replace(/bg-\[#0A0A0A\]/gi, 'bg-surface-dark');
    newContent = newContent.replace(/bg-\[#0D0D0D\]/gi, 'bg-bg');
    newContent = newContent.replace(/bg-\[#141414\]/gi, 'bg-surface2');
    newContent = newContent.replace(/bg-\[#1A1A1A\]/gi, 'bg-surface');
    newContent = newContent.replace(/bg-\[#121212\]/gi, 'bg-surface-dark');

    // Text colors
    newContent = newContent.replace(/text-\[#9A9A9A\]/gi, 'text-text-secondary');
    newContent = newContent.replace(/text-\[#777\]/gi, 'text-text-tertiary');
    newContent = newContent.replace(/text-\[#999\]/gi, 'text-text-secondary');
    newContent = newContent.replace(/text-\[#555\]/gi, 'text-text-tertiary');

    // Borders
    newContent = newContent.replace(/border-\[#222\]/gi, 'border-border');

    if (content !== newContent) {
        fs.writeFileSync(ritualFile, newContent);
        console.log(`Updated Ritual.tsx`);
    } else {
        console.log(`No changes made to Ritual.tsx`);
    }
}
