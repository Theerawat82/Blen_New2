const fs = require('fs');
const path = require('path');

const filepath = path.join('c:', 'Blender', 'index.html');
let content = fs.readFileSync(filepath, 'utf-8');

// 1. Change "Gemini Key:" to "รหัส:"
content = content.replace(/Gemini Key:/g, 'รหัส:');

// 2. Change placeholder for AI key
content = content.replace(
    /placeholder="ใส่รหัสเพื่อใช้งาน AI จริง \(หรือปล่อยว่างเพื่อจำลอง\)"/g,
    'placeholder="T-x89F2mB9A1"'
);
// Make sure to change the type from password to text if they want to see the random placeholder clearly, 
// but placeholder on password shows text in many browsers anyway. We can just leave type="password".

// 3. True Health background color to darker red
content = content.replace(
    /<span class="text-xs bg-\[#FF0000\] text-white px-2 py-0.5 rounded-full font-bold">True Health<\/span>/g,
    '<span class="text-xs bg-[#b8171e] text-white px-2 py-0.5 rounded-full font-bold">True Health</span>'
);

// 4. Remove text from bottom nav and make icons bigger
// Replace the span texts in the nav
content = content.replace(/<span class="text-xs font-bold mt-1">หน้าแรก<\/span>/g, '');
content = content.replace(/<span class="text-xs font-bold mt-1">ภารกิจ<\/span>/g, '');
content = content.replace(/<span class="text-xs font-bold mt-1">คุยกับหมอ AI<\/span>/g, '');
content = content.replace(/<span class="text-xs font-bold mt-1">สุขภาพ<\/span>/g, '');
content = content.replace(/<span class="text-xs font-bold mt-1">รางวัล<\/span>/g, '');

// Make icons bigger: replace text-lg with text-3xl inside the nav buttons
// We'll target the specific icons by their classes
content = content.replace(/<i class="fas fa-home text-lg"><\/i>/g, '<i class="fas fa-home text-3xl mb-1"></i>');
content = content.replace(/<i class="fas fa-trophy text-lg"><\/i>/g, '<i class="fas fa-trophy text-3xl mb-1"></i>');
content = content.replace(/<i class="fas fa-user-md text-lg"><\/i>/g, '<i class="fas fa-user-md text-3xl mb-1"></i>');
content = content.replace(/<i class="fas fa-heartbeat text-lg"><\/i>/g, '<i class="fas fa-heartbeat text-3xl mb-1"></i>');
content = content.replace(/<i class="fas fa-gift text-lg"><\/i>/g, '<i class="fas fa-gift text-3xl mb-1"></i>');

// Adjust the AI badge slightly since the icon is bigger
content = content.replace(
    /<span class="absolute -top-1 bg-rose-500 text-white font-bold text-xs px-1 rounded-full scale-90">AI<\/span>/g,
    '<span class="absolute -top-2 right-2 bg-rose-500 text-white font-bold text-xs px-1.5 rounded-full scale-90 border-2 border-white">AI</span>'
);

// Some extra tweaks for bottom nav height/padding
content = content.replace(
    /<nav class="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-3 flex justify-between items-center z-40 shadow-\[0_-4px_6px_-1px_rgba\(0,0,0,0\.05\)\]">/g,
    '<nav class="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-4 px-6 flex justify-between items-center z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">'
);

fs.writeFileSync(filepath, content, 'utf-8');
console.log('Final tweaks applied!');
