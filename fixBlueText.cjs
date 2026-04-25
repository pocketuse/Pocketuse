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
            
            // This replace needs to look at the whole className string
            // But a simpler approach: finding occurrences of from-blue or bg-blue near text-tint
            // Let's just simply replace `text-tint` back to `text-white` anywhere it matches on a line with `from-blue` or `bg-blue`!
            let lines = content.split('\n');
            let updated = false;
            lines = lines.map(line => {
                if ((line.includes('from-blue') || line.includes('bg-blue') || line.includes('bg-emerald') || line.includes('bg-violet') || line.includes('bg-pink') || line.includes('from-pink')) && line.includes('text-tint')) {
                    updated = true;
                    return line.replace(/text-tint/g, 'text-white');
                }
                if ((line.includes('from-blue') || line.includes('bg-blue') || line.includes('bg-emerald') || line.includes('bg-violet') || line.includes('bg-pink') || line.includes('from-pink')) && line.includes('text-bg')) {
                    updated = true;
                    return line.replace(/text-bg/g, 'text-white');
                }
                return line;
            });
            
            if (updated) {
                fs.writeFileSync(fullPath, lines.join('\n'));
                console.log(`Fixed blue text in ${fullPath}`);
            }
        }
    }
}
traverse(srcDir);
