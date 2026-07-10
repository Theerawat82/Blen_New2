const fs = require('fs');
const path = require('path');

const filepath = path.join('c:', 'Blender', 'index.html');
let content = fs.readFileSync(filepath, 'utf-8');

// 1. Replace the heart icon with a new logo mockup based on the user's elderly couple image
content = content.replace(
    /<span class="text-2xl">❤️<\/span>/g,
    '<div class="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#EC2127] flex-shrink-0 border-2 border-white"><i class="fas fa-user-friends text-xl"></i></div>'
);

// 2. Fix the input placeholder from getting cut off by giving it more height/padding 
content = content.replace(
    /id="customUserQuestion" placeholder="พิมพ์ถามคำถามสุขภาพที่นี่\.\.\." class="flex-1 bg-white border-2 border-slate-200 rounded-xl p-2\.5 text-sm focus:outline-none focus:border-\[#EC2127\]"/g,
    'id="customUserQuestion" placeholder="พิมพ์ถามคำถามสุขภาพที่นี่..." class="flex-1 bg-white border-2 border-slate-200 rounded-xl py-4 px-3 text-sm focus:outline-none focus:border-[#EC2127] min-h-[3.5rem] leading-normal"'
);

// 3. Fix the calendar block overflow (12 ก.ค.)
content = content.replace(
    /<div class="bg-\[#EC2127\] text-white p-2 rounded-lg text-center font-bold text-xs min-w-\[50px\]">/g,
    '<div class="bg-[#EC2127] text-white p-3 rounded-xl text-center font-bold text-xs min-w-fit max-w-[80px] shadow-sm">'
);

fs.writeFileSync(filepath, content, 'utf-8');
console.log('Final tweaks applied!');
