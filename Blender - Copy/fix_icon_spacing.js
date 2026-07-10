const fs = require('fs');
const path = require('path');

const filepath = path.join('c:', 'Blender', 'index.html');
let content = fs.readFileSync(filepath, 'utf-8');

// 1. Reduce icon sizes in bottom nav from text-3xl to text-2xl
content = content.replace(/<i class="fas fa-home text-3xl mb-1"><\/i>/g, '<i class="fas fa-home text-2xl mb-1"></i>');
content = content.replace(/<i class="fas fa-trophy text-3xl mb-1"><\/i>/g, '<i class="fas fa-trophy text-2xl mb-1"></i>');
content = content.replace(/<i class="fas fa-user-md text-3xl mb-1"><\/i>/g, '<i class="fas fa-user-md text-2xl mb-1"></i>');
content = content.replace(/<i class="fas fa-heartbeat text-3xl mb-1"><\/i>/g, '<i class="fas fa-heartbeat text-2xl mb-1"></i>');
content = content.replace(/<i class="fas fa-gift text-3xl mb-1"><\/i>/g, '<i class="fas fa-gift text-2xl mb-1"></i>');

// 2. Ensure bottom nav has gap so icons never touch
content = content.replace(
    /flex justify-between items-center z-40 shadow-\[0_-4px_6px_-1px_rgba\(0,0,0,0\.05\)\]/g,
    'flex justify-between items-center gap-2 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]'
);

// 3. Since we changed icon size, we might need to adjust the AI badge a little bit so it doesn't float too far away or clip
content = content.replace(
    /<span class="absolute -top-2 right-2 bg-rose-500 text-white font-bold text-xs px-1.5 rounded-full scale-90 border-2 border-white">AI<\/span>/g,
    '<span class="absolute -top-1 right-3 bg-rose-500 text-white font-bold text-xs px-1.5 rounded-full scale-75 border-2 border-white">AI</span>'
);

fs.writeFileSync(filepath, content, 'utf-8');
console.log('Icon sizes and spacing adjusted!');
