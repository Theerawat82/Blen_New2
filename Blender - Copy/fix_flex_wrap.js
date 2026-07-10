const fs = require('fs');
const path = require('path');

const filepath = path.join('c:', 'Blender', 'index.html');
let content = fs.readFileSync(filepath, 'utf-8');

// Header row 1: Branding and Font controls
content = content.replace(
    '<div class="flex justify-between items-center">',
    '<div class="flex flex-wrap justify-between items-center gap-3">'
);

content = content.replace(
    '<div class="flex items-center gap-2">',
    '<div class="flex flex-wrap items-center gap-2">'
);

// Header row 2: Profile info and TrueMoney sync
content = content.replace(
    '<div class="mt-4 flex items-center justify-between border-t border-slate-700 pt-3">',
    '<div class="mt-4 flex flex-wrap items-center justify-between border-t border-slate-700 pt-3 gap-4">'
);

content = content.replace(
    '<div class="flex items-center gap-3">',
    '<div class="flex flex-wrap items-center gap-3">'
);

content = content.replace(
    '<div class="flex items-center gap-1.5">',
    '<div class="flex flex-wrap items-center gap-1.5">'
);

// Points and Streak row
content = content.replace(
    '<div class="flex justify-between items-start">',
    '<div class="flex flex-wrap justify-between items-start gap-4">'
);

// Mission cards rows
content = content.replace(
    /<div class="bg-white rounded-2xl p-4 border border-slate-200\/80 shadow-sm flex items-center gap-3">/g,
    '<div class="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-wrap items-center gap-3">'
);

content = content.replace(
    /<div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">/g,
    '<div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">'
);

// Medical Warning Banner
content = content.replace(
    '<div id="medWarningBanner" class="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-center gap-3 shadow-sm">',
    '<div id="medWarningBanner" class="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-wrap items-center gap-3 shadow-sm">'
);

// Medical Appointment card
content = content.replace(
    '<div class="p-3 bg-blue-50/70 border border-blue-200/50 rounded-xl flex items-start gap-3">',
    '<div class="p-3 bg-blue-50/70 border border-blue-200/50 rounded-xl flex flex-wrap items-start gap-3">'
);

// Allow body text to break words and improve line height globally to accommodate huge text
content = content.replace(
    '<body class="text-slate-800" id="mainBody">',
    '<body class="text-slate-800 break-words leading-snug" id="mainBody">'
);

// Write changes
fs.writeFileSync(filepath, content, 'utf-8');
console.log('Flex layout fixes applied!');
