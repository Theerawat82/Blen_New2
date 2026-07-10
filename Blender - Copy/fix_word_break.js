const fs = require('fs');
const path = require('path');

const filepath = path.join('c:', 'Blender', 'index.html');
let content = fs.readFileSync(filepath, 'utf-8');

// 1. Change arbitrary font sizes to scalable Tailwind sizes
content = content.replace(/text-\[10px\]/g, 'text-xs');
content = content.replace(/text-\[11px\]/g, 'text-sm');
content = content.replace(/text-\[9px\]/g, 'text-xs');
content = content.replace(/text-\[8px\]/g, 'text-xs');
content = content.replace(/text-\[12px\]/g, 'text-sm');

// 2. Change break-words to break-keep in the body tag to prevent mid-word splitting for Thai text
content = content.replace(
    'body class="text-slate-800 break-words leading-snug"',
    'body class="text-slate-800 break-keep leading-snug"'
);

// Also remove any explicit break-words that we added earlier to specific elements
content = content.replace(/break-words/g, 'break-keep');

// 3. Make chat bubble wider for large text
content = content.replace(/max-w-\[85%\]/g, 'max-w-[95%]');

// 4. Increase the height/min-height of the chat box area if it feels crammed
content = content.replace(/h-\[280px\]/g, 'min-h-[280px] h-auto max-h-[500px]');

// 5. In the input placeholder, it might be clipping if the input has fixed height or padding.
// The input is: <input type="text" id="customUserQuestion" placeholder="..." class="flex-1 bg-white border-2 border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-blue-600">
// We can remove fixed padding if it interferes, but p-2.5 is scalable. 
// Just ensuring `text-sm` is scaling correctly.

// 6. In the bottom nav, if the height of nav is fixed or absolute, it might clip text.
// <nav class="absolute bottom-0 ... py-2"> is actually okay as long as flex-col is allowed to expand.
// Wait, nav is absolute bottom-0. But the wrapper has `pb-24`. If nav gets taller, `pb-24` might not be enough.
content = content.replace(/pb-24/g, 'pb-32'); 
content = content.replace(/bottom-24/g, 'bottom-32'); // for the floating button

// 7. Fix the "AI สแกน สลิปตรวจ" and "กดซิงค์ ก้าวเดิน" which was forced into 3 lines.
// <span class="font-bold text-sm leading-tight">AI สแกนสลิปตรวจ</span>
// The gap or padding might be too much.
// We can just let break-keep handle it nicely.

fs.writeFileSync(filepath, content, 'utf-8');
console.log('Fixes applied');
