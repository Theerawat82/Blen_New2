const fs = require('fs');
const path = require('path');

const filepath = path.join('c:', 'Blender', 'index.html');
let content = fs.readFileSync(filepath, 'utf-8');

// Color replacing
content = content.replace(/#1E293B/g, '#18181B');

// Blue to TrueRed #EC2127
content = content.replace(/bg-blue-600/g, 'bg-[#EC2127]');
content = content.replace(/text-blue-600/g, 'text-[#EC2127]');
content = content.replace(/border-blue-600/g, 'border-[#EC2127]');

content = content.replace(/bg-blue-500/g, 'bg-[#EC2127]');
content = content.replace(/text-blue-500/g, 'text-[#EC2127]');

content = content.replace(/text-blue-400/g, 'text-[#EC2127]');
content = content.replace(/border-blue-400/g, 'border-[#EC2127]');

content = content.replace(/bg-blue-800/g, 'bg-[#b8171e]');
content = content.replace(/text-blue-800/g, 'text-[#b8171e]');

content = content.replace(/bg-blue-100/g, 'bg-[#fcd2d4]');
content = content.replace(/border-blue-100/g, 'border-[#fcd2d4]');
content = content.replace(/text-blue-100/g, 'text-[#fcd2d4]');

content = content.replace(/bg-blue-50/g, 'bg-[#fde8e9]');
content = content.replace(/hover:bg-blue-100/g, 'hover:bg-[#fcd2d4]');
content = content.replace(/hover:bg-blue-50/g, 'hover:bg-[#fde8e9]');
content = content.replace(/border-blue-200/g, 'border-[#f9a6a9]');

// Font sizes in CSS
const old_css = `        .size-normal {
            font-size: 100%;
        }
        .size-large {
            font-size: 118%;
        }
        .size-xlarge {
            font-size: 135%;
        }`;

const new_css = `        .size-normal {
            font-size: 110%;
        }
        .size-large {
            font-size: 135%;
        }
        .size-xlarge {
            font-size: 160%;
        }
        .size-xxlarge {
            font-size: 190%;
        }`;

if (content.includes(old_css)) {
    content = content.replace(old_css, new_css);
} else {
    console.log("Could not find old css, falling back to regex");
    // Fallback regex
    content = content.replace(
        /\.size-normal\s*\{\s*font-size:\s*100%;\s*\}\s*\.size-large\s*\{\s*font-size:\s*118%;\s*\}\s*\.size-xlarge\s*\{\s*font-size:\s*135%;\s*\}/,
        new_css
    );
}

// Fix font size buttons
const buttonsRegex = /<button onclick="changeFontSize\('small'\)"(.*?)>ก-<\/button>\s*<button onclick="changeFontSize\('normal'\)"(.*?)>ก<\/button>\s*<button onclick="changeFontSize\('large'\)"(.*?)>ก\+<\/button>/s;

const newButtons = `<button onclick="changeFontSize('small')" class="bg-[#18181B] hover:bg-slate-800 text-xs font-bold py-1 px-2.5 rounded-full btn-senior text-white" title="ลดขนาดอักษร">ก-</button>
                    <button onclick="changeFontSize('normal')" class="bg-[#EC2127] text-sm font-bold py-1 px-3 rounded-full btn-senior text-white" id="fontNormalBtn" title="อักษรปกติ">ก</button>
                    <button onclick="changeFontSize('large')" class="bg-[#18181B] hover:bg-slate-800 text-base font-bold py-1 px-2.5 rounded-full btn-senior text-white" title="ขยายอักษร">ก+</button>
                    <button onclick="changeFontSize('xlarge')" class="bg-[#18181B] hover:bg-slate-800 text-lg font-bold py-1 px-2.5 rounded-full btn-senior text-white" title="ขยายอักษรมาก">ก++</button>`;

content = content.replace(buttonsRegex, newButtons);

// Fix JS
const jsRegex = /function changeFontSize\(size\)\s*\{[\s\S]*?if\s*\(size === 'large'\)\s*\{\s*body\.classList\.add\('size-xlarge'\);\s*\}\s*\}/s;

const new_js = `function changeFontSize(size) {
                const body = document.getElementById('mainBody');
                body.classList.remove('size-normal', 'size-large', 'size-xlarge', 'size-xxlarge');
                
                // Reset active styling
                document.querySelectorAll('[title="ลดขนาดอักษร"], [title="อักษรปกติ"], [title="ขยายอักษร"], [title="ขยายอักษรมาก"]').forEach(btn => {
                    btn.classList.remove('bg-[#EC2127]');
                    btn.classList.add('bg-[#18181B]');
                });

                if (size === 'small') {
                    body.classList.add('size-normal');
                } else if (size === 'normal') {
                    body.classList.add('size-large');
                    document.getElementById('fontNormalBtn').classList.add('bg-[#EC2127]');
                    document.getElementById('fontNormalBtn').classList.remove('bg-[#18181B]');
                } else if (size === 'large') {
                    body.classList.add('size-xlarge');
                } else if (size === 'xlarge') {
                    body.classList.add('size-xxlarge');
                }
            }`;

content = content.replace(jsRegex, new_js);

fs.writeFileSync(filepath, content, 'utf-8');
console.log("Replacements done!");
