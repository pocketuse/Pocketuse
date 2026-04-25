const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function traverse(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverse(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content;

            // Simple text color replacements
            // text-white -> text-tint
            newContent = newContent.replace(/text-white/g, 'text-tint');
            newContent = newContent.replace(/text-\[#E8E8F0\]/g, 'text-text-primary');
            newContent = newContent.replace(/text-\[#7B7B9A\]/g, 'text-text-secondary');
            newContent = newContent.replace(/text-\[#5A5A7A\]/g, 'text-text-tertiary');
            
            // bg-white/x -> bg-tint/x
            newContent = newContent.replace(/bg-white\//g, 'bg-tint/');
            // border-white/x -> border-tint/x
            newContent = newContent.replace(/border-white\//g, 'border-tint/');
            // gradients
            newContent = newContent.replace(/from-white\//g, 'from-tint/');
            newContent = newContent.replace(/via-white\//g, 'via-tint/');
            newContent = newContent.replace(/to-white\//g, 'to-tint/');
            
            // Strict bg-white and border-white without opacity
            newContent = newContent.replace(/bg-white(?=[\s"'}`,])/g, 'bg-invert');
            newContent = newContent.replace(/border-white(?=[\s"'}`,])/g, 'border-invert');
            newContent = newContent.replace(/text-white(?=[\s"'}`,])/g, 'text-tint');

            // Hardcoded background colors
            newContent = newContent.replace(/bg-\[#07071a\]/gi, 'bg-surface-dark');
            newContent = newContent.replace(/bg-\[#0D0D1A\]/gi, 'bg-surface');
            newContent = newContent.replace(/bg-\[#0A0A1A\]/gi, 'bg-surface-dark');
            newContent = newContent.replace(/bg-\[#06060F\]/gi, 'bg-bg');
            newContent = newContent.replace(/bg-\[#080814\]/gi, 'bg-surface-dark');
            
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}
traverse(srcDir);
