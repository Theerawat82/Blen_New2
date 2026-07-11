const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf-8');

const search = `<div class="flex justify-between text-sm font-bold mb-1.5">
                            <span class="text-slate-600">ก้าวสะสมทั้งบ้านตอนนี้:</span>
                            <span class="text-[#EC2127]" id="familyTotalDisplay">18,640 / 50,000 ก้าว</span>
                        </div>`.replace(/\r\n/g, '\n');

const replace = `<div class="flex justify-between items-start gap-4 text-sm font-bold mb-1.5">
                            <span class="text-slate-600 flex-1">ก้าวสะสมทั้งบ้านตอนนี้:</span>
                            <div class="text-right flex-shrink-0">
                                <span class="text-[#EC2127]" id="familyTotalDisplay">18,640 / 50,000 ก้าว</span>
                            </div>
                        </div>`.replace(/\r\n/g, '\n');

// normalize index.html to standard LF
content = content.replace(/\r\n/g, '\n');

if (content.includes(search)) {
    content = content.replace(search, replace);
    fs.writeFileSync('index.html', content, 'utf-8');
    console.log("Success");
} else {
    console.log("Not found");
}
