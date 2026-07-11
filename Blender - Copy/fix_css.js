const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf-8');

const cssFix = `
        /* iOS Text Overflow & Flexbox Fixes */
        .flex-1 { min-width: 0 !important; }
        button { white-space: normal !important; word-wrap: break-word !important; overflow-wrap: break-word !important; }
        p, span, h1, h2, h3, h4, h5, h6, div { word-wrap: break-word; overflow-wrap: break-word; }
        .max-w-\\[95\\%\\] { min-width: 0 !important; }
`;

content = content.replace('</style>', cssFix + '    </style>');
content = content.replace(/flex-1(?![\s"]*min-w-0)/g, 'flex-1 min-w-0');
content = content.replace('class="max-w-md mx-auto', 'class="w-full max-w-md mx-auto');

fs.writeFileSync('index.html', content, 'utf-8');
console.log('Fixed globally via JS script.');
