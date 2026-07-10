import re
import sys

def process_html():
    filepath = r'c:\Blender\index.html'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Colors replacing:
    # #1E293B -> #18181B
    content = content.replace('#1E293B', '#18181B')
    
    # bg-slate-800, text-slate-800, etc. to TrueBlack #18181B where appropriate, but maybe better to leave Tailwind grays mostly alone except for main headers.
    # Actually, they said "เปลี่ยนสีเป็นสีสามสี" (Change colors to these 3 colors).
    # But they also said "อันไหนดูแล้วแปลกให้นายหาสีเพิ่มมาได้เลยแต่อย่าใช้สีเยอะน่ะ" (If any look weird, find more colors but don't use too many).
    
    # The main blue and teal/emerald branding needs to be replaced by True Red #EC2127.
    # Blue:
    content = re.sub(r'bg-blue-600', 'bg-[#EC2127]', content)
    content = re.sub(r'text-blue-600', 'text-[#EC2127]', content)
    content = re.sub(r'border-blue-600', 'border-[#EC2127]', content)
    
    content = re.sub(r'bg-blue-500', 'bg-[#EC2127]', content)
    content = re.sub(r'text-blue-500', 'text-[#EC2127]', content)
    
    content = re.sub(r'text-blue-400', 'text-[#EC2127]', content)
    content = re.sub(r'border-blue-400', 'border-[#EC2127]', content)

    content = re.sub(r'bg-blue-800', 'bg-[#b8171e]', content)
    content = re.sub(r'text-blue-800', 'text-[#b8171e]', content)

    content = re.sub(r'bg-blue-100', 'bg-[#fcd2d4]', content)
    content = re.sub(r'border-blue-100', 'border-[#fcd2d4]', content)
    content = re.sub(r'text-blue-100', 'text-[#fcd2d4]', content)
    
    content = re.sub(r'bg-blue-50', 'bg-[#fde8e9]', content)
    content = re.sub(r'hover:bg-blue-100', 'hover:bg-[#fcd2d4]', content)
    content = re.sub(r'hover:bg-blue-50', 'hover:bg-[#fde8e9]', content)
    content = re.sub(r'border-blue-200', 'border-[#f9a6a9]', content)
    
    # Emerald / Teal (sometimes used for primary actions)
    # Let's keep emerald for success/green things since True money uses some green, or maybe just replace them with Red/Black?
    # Actually True money uses Orange/Red.
    # Let's just make the main branding True Red.

    # Fix font sizes in CSS
    old_css = """        .size-normal {
            font-size: 100%;
        }
        .size-large {
            font-size: 118%;
        }
        .size-xlarge {
            font-size: 135%;
        }"""
    new_css = """        .size-normal {
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
        }"""
    if old_css in content:
        content = content.replace(old_css, new_css)
    else:
        print("Could not find old css")

    # Fix the font size buttons in HTML
    old_buttons = """<button onclick="changeFontSize('small')" class="bg-slate-700 hover:bg-slate-600 text-xs font-bold py-1 px-2.5 rounded-full btn-senior" title="ลดขนาดอักษร">ก-</button>
                    <button onclick="changeFontSize('normal')" class="bg-blue-600 text-sm font-bold py-1 px-3 rounded-full btn-senior" id="fontNormalBtn" title="อักษรปกติ">ก</button>
                    <button onclick="changeFontSize('large')" class="bg-slate-700 hover:bg-slate-600 text-base font-bold py-1 px-2.5 rounded-full btn-senior" title="ขยายอักษร">ก+</button>"""
    # Note: bg-blue-600 might have been replaced to bg-[#EC2127] by now in the buttons string, so let's match with regex or just replace in the already modified content
    
    # We will do a generic replacement for the buttons section
    # Let's just find the section by keywords
    content = re.sub(
        r'<button onclick="changeFontSize\(\'small\'\)"(.*?)>ก-</button>\s*<button onclick="changeFontSize\(\'normal\'\)"(.*?)>ก</button>\s*<button onclick="changeFontSize\(\'large\'\)"(.*?)>ก\+</button>',
        r'''<button onclick="changeFontSize('small')" class="bg-[#18181B] hover:bg-slate-800 text-xs font-bold py-1 px-2.5 rounded-full btn-senior text-white" title="ลดขนาดอักษร">ก-</button>
                    <button onclick="changeFontSize('normal')" class="bg-[#EC2127] text-sm font-bold py-1 px-3 rounded-full btn-senior text-white" id="fontNormalBtn" title="อักษรปกติ">ก</button>
                    <button onclick="changeFontSize('large')" class="bg-[#18181B] hover:bg-slate-800 text-base font-bold py-1 px-2.5 rounded-full btn-senior text-white" title="ขยายอักษร">ก+</button>
                    <button onclick="changeFontSize('xlarge')" class="bg-[#18181B] hover:bg-slate-800 text-lg font-bold py-1 px-2.5 rounded-full btn-senior text-white" title="ขยายอักษรมาก">ก++</button>''',
        content,
        flags=re.DOTALL
    )

    # Fix the JS function
    old_js = """            function changeFontSize(size) {
                const body = document.getElementById('mainBody');
                body.classList.remove('size-normal', 'size-large', 'size-xlarge');
                
                // Reset active styling
                document.querySelectorAll('[title="ลดขนาดอักษร"], [title="อักษรปกติ"], [title="ขยายอักษร"]').forEach(btn => {
                    btn.classList.remove('bg-blue-600');
                    btn.classList.remove('bg-[#EC2127]');
                    btn.classList.add('bg-slate-700');
                });

                if (size === 'small') {
                    body.classList.add('size-normal');
                } else if (size === 'normal') {
                    body.classList.add('size-large');
                    document.getElementById('fontNormalBtn').classList.add('bg-[#EC2127]');
                } else if (size === 'large') {
                    body.classList.add('size-xlarge');
                }
            }"""
    
    # Create new JS safely by just replacing the whole function body using regex
    new_js = """            function changeFontSize(size) {
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
            }"""
    
    # We'll replace the old JS with the new JS
    content = re.sub(
        r'function changeFontSize\(size\) \{.*?\}',
        new_js.strip(),
        content,
        flags=re.DOTALL
    )
    
    # Change any remaining slate-700 from font buttons to #18181B just in case
    # Actually wait, `bg-slate-700` might be used for other things too. Let's just leave it if it wasn't matched.

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Replacements done!")

if __name__ == '__main__':
    process_html()
