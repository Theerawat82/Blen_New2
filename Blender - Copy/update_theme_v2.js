const fs = require('fs');
const path = require('path');

const filepath = path.join('c:', 'Blender', 'index.html');
let content = fs.readFileSync(filepath, 'utf-8');

// Update text sizes to be MUCH bigger
content = content.replace(/font-size: 110%;/g, 'font-size: 150%;');
content = content.replace(/font-size: 135%;/g, 'font-size: 180%;');
content = content.replace(/font-size: 160%;/g, 'font-size: 220%;');
content = content.replace(/font-size: 190%;/g, 'font-size: 270%;');

// Make the main theme RED.
// The header was bg-[#18181B], let's change it to bg-[#EC2127]
// We can specifically look for `<header class="bg-[#18181B]` and change it.
content = content.replace(/<header class="bg-\[#18181B\]/g, '<header class="bg-[#EC2127]');

// The gradient boxes: from-[#18181B] to-[#0F172A] -> from-[#EC2127] to-[#b8171e]
content = content.replace(/from-\[#18181B\] to-\[#0F172A\]/g, 'from-[#EC2127] to-[#b8171e]');
content = content.replace(/from-\[#18181B\] to-slate-900/g, 'from-[#EC2127] to-[#b8171e]');

// Because the header is now RED, the font size buttons inside the header need contrast.
// The active button was bg-[#EC2127]. We should change it to bg-white text-[#EC2127].
// The inactive ones were bg-[#18181B]. We can change them to bg-[#b8171e] or keep as black.
// Let's modify the buttons regex
const oldButtons = `<button onclick="changeFontSize('small')" class="bg-[#18181B] hover:bg-slate-800 text-xs font-bold py-1 px-2.5 rounded-full btn-senior text-white" title="ลดขนาดอักษร">ก-</button>
                    <button onclick="changeFontSize('normal')" class="bg-[#EC2127] text-sm font-bold py-1 px-3 rounded-full btn-senior text-white" id="fontNormalBtn" title="อักษรปกติ">ก</button>
                    <button onclick="changeFontSize('large')" class="bg-[#18181B] hover:bg-slate-800 text-base font-bold py-1 px-2.5 rounded-full btn-senior text-white" title="ขยายอักษร">ก+</button>
                    <button onclick="changeFontSize('xlarge')" class="bg-[#18181B] hover:bg-slate-800 text-lg font-bold py-1 px-2.5 rounded-full btn-senior text-white" title="ขยายอักษรมาก">ก++</button>`;

const newButtons = `<button onclick="changeFontSize('small')" class="bg-[#b8171e] hover:bg-[#8f1217] text-xs font-bold py-1 px-2.5 rounded-full btn-senior text-white" title="ลดขนาดอักษร">ก-</button>
                    <button onclick="changeFontSize('normal')" class="bg-white text-[#EC2127] text-sm font-bold py-1 px-3 rounded-full btn-senior" id="fontNormalBtn" title="อักษรปกติ">ก</button>
                    <button onclick="changeFontSize('large')" class="bg-[#b8171e] hover:bg-[#8f1217] text-base font-bold py-1 px-2.5 rounded-full btn-senior text-white" title="ขยายอักษร">ก+</button>
                    <button onclick="changeFontSize('xlarge')" class="bg-[#b8171e] hover:bg-[#8f1217] text-lg font-bold py-1 px-2.5 rounded-full btn-senior text-white" title="ขยายอักษรมาก">ก++</button>`;

content = content.replace(oldButtons, newButtons);

// And update the JS that toggles button classes
// It was removing '#EC2127' and adding '#18181B'
const oldJsAdd = `btn.classList.add('bg-[#18181B]');`;
const oldJsRem = `btn.classList.remove('bg-[#EC2127]');`;
const activeBtnAdd = `document.getElementById('fontNormalBtn').classList.add('bg-[#EC2127]');
                    document.getElementById('fontNormalBtn').classList.remove('bg-[#18181B]');`;

// We need to replace the whole changeFontSize logic again
const oldJSBlock = /function changeFontSize\(size\) \{.*?\}\s*\}/s;

const newJSBlock = `function changeFontSize(size) {
                const body = document.getElementById('mainBody');
                body.classList.remove('size-normal', 'size-large', 'size-xlarge', 'size-xxlarge');
                
                // Reset active styling
                document.querySelectorAll('[title="ลดขนาดอักษร"], [title="อักษรปกติ"], [title="ขยายอักษร"], [title="ขยายอักษรมาก"]').forEach(btn => {
                    btn.classList.remove('bg-white', 'text-[#EC2127]');
                    btn.classList.add('bg-[#b8171e]', 'text-white');
                });

                if (size === 'small') {
                    body.classList.add('size-normal');
                } else if (size === 'normal') {
                    body.classList.add('size-large');
                } else if (size === 'large') {
                    body.classList.add('size-xlarge');
                } else if (size === 'xlarge') {
                    body.classList.add('size-xxlarge');
                }
                
                // Highlight the correct button
                let activeBtn;
                if (size === 'small') activeBtn = document.querySelector('[title="ลดขนาดอักษร"]');
                if (size === 'normal') activeBtn = document.getElementById('fontNormalBtn');
                if (size === 'large') activeBtn = document.querySelector('[title="ขยายอักษร"]');
                if (size === 'xlarge') activeBtn = document.querySelector('[title="ขยายอักษรมาก"]');
                
                if (activeBtn) {
                    activeBtn.classList.remove('bg-[#b8171e]', 'text-white');
                    activeBtn.classList.add('bg-white', 'text-[#EC2127]');
                }
            }`;

content = content.replace(oldJSBlock, newJSBlock);

// Replace generic buttons that I set to #18181B back to red if they should be primary buttons
// Previously: <button onclick="openMedicationModal()" class="bg-[#1E293B] => became bg-[#18181B]
// Let's make these red too
content = content.replace(/class="bg-\[#18181B\] hover:bg-slate-800 text-white/g, 'class="bg-[#EC2127] hover:bg-[#b8171e] text-white');

fs.writeFileSync(filepath, content, 'utf-8');
console.log('Update complete');
