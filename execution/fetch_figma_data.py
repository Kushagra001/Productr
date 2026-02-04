import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

FIGMA_TOKEN = os.getenv("FIGMA_ACCESS_TOKEN")
FILE_KEY = "jz1CdCk9aaW5itU99sC6uB"  # Extracted from user URL
HEADERS = {"X-Figma-Token": FIGMA_TOKEN}

def fetch_figma_file():
    url = f"https://api.figma.com/v1/files/{FILE_KEY}"
    print(f"Fetching from {url}...")
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code != 200:
        print(f"Error: {response.status_code} - {response.text}")
        return None
    
    return response.json()

def extract_structure(node, depth=0):
    indent = "  " * depth
    info = []
    
    # Basic info
    name = node.get("name", "Unknown")
    type_ = node.get("type", "Unknown")
    id_ = node.get("id")
    
    # Only interested in top-level containers (Frames, Canvases, Groups) or Text
    if type_ in ["DOCUMENT", "CANVAS", "FRAME", "SECTION", "COMPONENT", "INSTANCE"]:
        info.append(f"{indent}- [{type_}] {name} (ID: {id_})")
    
    if type_ == "TEXT":
        chars = node.get("characters", "").replace("\n", " ")[:50] # Preview text
        if chars:
            info.append(f"{indent}- [TEXT] {name}: \"{chars}...\"")

    # Recursion
    if "children" in node:
        for child in node["children"]:
            # Limit recursion for deep nested vector elements to avoid noise
            if child.get("type") not in ["VECTOR", "BOOLEAN_OPERATION", "RECTANGLE", "ELLIPSE", "LINE"]: 
                 info.extend(extract_structure(child, depth + 1))
            elif child.get("type") == "TEXT":
                 info.extend(extract_structure(child, depth + 1))

    return info

def main():
    data = fetch_figma_file()
    if not data:
        return

    document = data.get("document", {})
    structure = extract_structure(document)
    
    print("\n--- Design Structure ---")
    print("\n".join(structure))
    
    # Save raw for inspection if needed
    with open(".tmp/figma_dump.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    import sys
    sys.stdout.reconfigure(encoding='utf-8')
    main()
