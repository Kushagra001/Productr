import json
import os

def analyze_components():
    try:
        with open(".tmp/figma_dump.json", "r", encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        print("Error: .tmp/figma_dump.json not found. Run fetch_figma_data.py first.")
        return

    components = data.get("components", {})
    document = data.get("document", {})
    styles = data.get("styles", {})

    print(f"Found {len(components)} Components and {len(styles)} Styles.")

    print("\n--- Components ---")
    for comp_id, comp_data in components.items():
        name = comp_data.get("name", "Unnamed")
        desc = comp_data.get("description", "")
        print(f"- {name} (ID: {comp_id})")
        if desc:
            print(f"  Description: {desc}")
    
    # Styles (Colors, Fonts)
    print("\n--- Styles ---")
    for style_id, style_data in styles.items():
        name = style_data.get("name", "Unnamed")
        s_type = style_data.get("styleType", "Unknown")
        print(f"- [{s_type}] {name}")

    # Helper to traverse for text to find "Labels" or "Headers"
    # (Simple traversal to find top-level frames/pages)
    print("\n--- Top Level Frames ---")
    for child in document.get("children", []): # Canvas (Pages)
        print(f"Page: {child.get('name')}")
        for grand_child in child.get("children", []): # Frames/Artboards
             if grand_child.get("type") == "FRAME":
                 print(f"  Frame: {grand_child.get('name')} (ID: {grand_child.get('id')})")

if __name__ == "__main__":
    analyze_components()
