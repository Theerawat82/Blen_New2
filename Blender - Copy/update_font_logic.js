const fs = require('fs');
const path = require('path');

const filepath = path.join('c:', 'Blender', 'index.html');
let content = fs.readFileSync(filepath, 'utf-8');

// Change target in changeFontSize
content = content.replace(
    /const body = document.getElementById\('mainBody'\);/g,
    `const body = document.documentElement;`
);

// Add the initial class to the html element (let's set default to size-large as requested "big")
content = content.replace(
    /<html lang="th">/g,
    `<html lang="th" class="size-large">`
);

// Remove the size-normal from the body class list as it's no longer needed there
content = content.replace(
    /<body class="size-normal text-slate-800"/g,
    `<body class="text-slate-800"`
);

// The CSS rules:
// Instead of `.size-normal { font-size: 150%; }` targeting any element, it's fine, but let's make sure it doesn't conflict if applied to root.
// Actually, applying `.size-normal { font-size: 150%; }` to `<html>` is perfectly valid. It will scale rem.

fs.writeFileSync(filepath, content, 'utf-8');
console.log('Update complete');
