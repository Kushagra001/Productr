import json

def hex_from_color(color):
    r = int(color.get('r', 0) * 255)
    g = int(color.get('g', 0) * 255)
    b = int(color.get('b', 0) * 255)
    return f"#{r:02x}{g:02x}{b:02x}"

def extract_styles():
    with open(".tmp/figma_dump.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    
    styles = data.get("styles", {})
    # Figma separates Style Metadata (styles key) from the Node definitions
    # But often the actual color values are embedded in nodes or a separate 'document' lookup.
    # The 'styles' key in GET /v1/files/:key only gives metadata.
    # To get values, we traverse the document for nodes using these styles, or we rely on the component definitions using them.
    # For a simple approach, we scan the document tree for 'fills' and 'strokes' and map generic names if possible.
    # HOWEVER, a better way for Agents is to simply look for distinct colors used in the 'Home' frame.
    
    # Let's extract all unique solid colors found in the document to generate a palette.
    colors = set()
    
    def traverse(node):
        if "fills" in node:
            for fill in node["fills"]:
                if fill.get("type") == "SOLID" and fill.get("visible", True):
                    c = fill.get("color")
                    if c:
                        colors.add(hex_from_color(c))
        
        if "children" in node:
            for child in node["children"]:
                traverse(child)

    traverse(data.get("document", {}))
    
    # Generate CSS
    css = ":root {\n"
    sorted_colors = sorted(list(colors))
    for i, c in enumerate(sorted_colors):
        css += f"  --color-{i+1}: {c};\n"
    css += "}\n"
    
    print("Generated CSS tokens:")
    print(css)
    
    # Save to client
    os.makedirs("client/src", exist_ok=True)
    with open("client/src/design_tokens.css", "w") as f:
        f.write(css)

import os
if __name__ == "__main__":
    extract_styles()
