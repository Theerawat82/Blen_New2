const fs = require('fs');
const path = require('path');

const filepath = path.join('c:', 'Blender', 'index.html');
let content = fs.readFileSync(filepath, 'utf-8');

// The new Tailwind config
const tailwindConfig = `
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontSize: {
                        'xs': ['calc(0.75rem * var(--text-scale, 1))', { lineHeight: 'calc(1rem * var(--text-scale, 1))' }],
                        'sm': ['calc(0.875rem * var(--text-scale, 1))', { lineHeight: 'calc(1.25rem * var(--text-scale, 1))' }],
                        'base': ['calc(1rem * var(--text-scale, 1))', { lineHeight: 'calc(1.5rem * var(--text-scale, 1))' }],
                        'lg': ['calc(1.125rem * var(--text-scale, 1))', { lineHeight: 'calc(1.75rem * var(--text-scale, 1))' }],
                        'xl': ['calc(1.25rem * var(--text-scale, 1))', { lineHeight: 'calc(1.75rem * var(--text-scale, 1))' }],
                        '2xl': ['calc(1.5rem * var(--text-scale, 1))', { lineHeight: 'calc(2rem * var(--text-scale, 1))' }],
                        '3xl': ['calc(1.875rem * var(--text-scale, 1))', { lineHeight: 'calc(2.25rem * var(--text-scale, 1))' }],
                        '4xl': ['calc(2.25rem * var(--text-scale, 1))', { lineHeight: 'calc(2.5rem * var(--text-scale, 1))' }],
                        '5xl': ['calc(3rem * var(--text-scale, 1))', { lineHeight: 'calc(1 * var(--text-scale, 1))' }],
                        '6xl': ['calc(3.75rem * var(--text-scale, 1))', { lineHeight: 'calc(1 * var(--text-scale, 1))' }],
                    }
                }
            }
        }
    </script>
`;

if (!content.includes('tailwind.config = {')) {
    content = content.replace(
        '<script src="https://cdn.tailwindcss.com"></script>',
        '<script src="https://cdn.tailwindcss.com"></script>\n' + tailwindConfig
    );
}

// Update the CSS sizing classes
// Using regex to handle any potential spacing differences
const cssRegex = /\.size-normal\s*\{\s*font-size:\s*150%;\s*\}\s*\.size-large\s*\{\s*font-size:\s*180%;\s*\}\s*\.size-xlarge\s*\{\s*font-size:\s*220%;\s*\}\s*\.size-xxlarge\s*\{\s*font-size:\s*270%;\s*\}/s;

const newCSS = `:root {
            --text-scale: 1;
        }
        html.size-normal {
            --text-scale: 1.5;
            font-size: 100%;
        }
        html.size-large {
            --text-scale: 1.8;
            font-size: 100%;
        }
        html.size-xlarge {
            --text-scale: 2.2;
            font-size: 100%;
        }
        html.size-xxlarge {
            --text-scale: 2.7;
            font-size: 100%;
        }`;

content = content.replace(cssRegex, newCSS);

// Make body inherit scaling too for plain text
content = content.replace(
    /background-color:\s*#f0f4f8;/g,
    `background-color: #f0f4f8;
            font-size: calc(1rem * var(--text-scale, 1));`
);

fs.writeFileSync(filepath, content, 'utf-8');
console.log('Update complete');
