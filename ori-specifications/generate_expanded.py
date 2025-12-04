#!/usr/bin/env python3
"""
Example: Generate icons, logos, symbols, and illustrations using DELM API
"""

import requests
import base64
from pathlib import Path

BASE_URL = "http://127.0.0.1:3005"

def save_image(data: dict, filename: str, key: str = "image"):
    """Save base64 image to file"""
    image_bytes = base64.b64decode(data[key])
    Path(filename).write_bytes(image_bytes)
    print(f"  Saved to {filename}")

def save_svg(content: str, filename: str):
    """Save SVG content to file"""
    Path(filename).write_text(content)
    print(f"  Saved to {filename}")

def generate_icons():
    """Generate SVG icons"""
    print("\n--- SVG Icons ---")

    # List available icons
    response = requests.get(f"{BASE_URL}/icons")
    if response.status_code == 200:
        icons = response.json()["icons"]
        print(f"Available icons: {len(icons)}")
        print(f"  Examples: {', '.join(icons[:10])}...")

    # Generate specific icons
    icons_to_generate = [
        {"name": "home", "size": 32, "color": "#3b82f6"},
        {"name": "user", "size": 24, "color": "#10b981"},
        {"name": "settings", "size": 48, "color": "#6366f1"},
        {"name": "search", "size": 24, "color": "#f59e0b"},
        {"name": "heart", "size": 32, "color": "#ef4444"}
    ]

    for icon in icons_to_generate:
        response = requests.post(
            f"{BASE_URL}/generate/icon",
            json={
                "name": icon["name"],
                "size": icon["size"],
                "color": icon["color"],
                "format": "svg"
            }
        )

        if response.status_code == 200:
            print(f"Generated {icon['name']} icon ({icon['size']}px)")
            save_svg(response.text, f"output/icon_{icon['name']}.svg")
        else:
            print(f"Error generating {icon['name']}: {response.text}")

def generate_symbols():
    """Generate decorative symbols"""
    print("\n--- Symbols ---")

    symbols = [
        {"type": "circle", "primary": "#3b82f6", "secondary": "#93c5fd"},
        {"type": "hexagon", "primary": "#10b981", "secondary": "#6ee7b7"},
        {"type": "star", "primary": "#f59e0b", "secondary": "#fcd34d"},
        {"type": "diamond", "primary": "#8b5cf6", "secondary": "#c4b5fd"},
        {"type": "badge", "primary": "#ef4444", "secondary": "#fca5a5"}
    ]

    for symbol in symbols:
        response = requests.post(
            f"{BASE_URL}/generate/symbol",
            json={
                "symbol_type": symbol["type"],
                "size": 64,
                "primary_color": symbol["primary"],
                "secondary_color": symbol["secondary"],
                "format": "svg"
            }
        )

        if response.status_code == 200:
            print(f"Generated {symbol['type']} symbol")
            save_svg(response.text, f"output/symbol_{symbol['type']}.svg")
        else:
            print(f"Error generating {symbol['type']}: {response.text}")

def generate_ai_images():
    """Generate images using Stable Diffusion"""
    print("\n--- AI Generated Images ---")
    print("(First run will download model, ~4GB)")

    # Simple AI image
    print("\nGenerating AI image...")
    response = requests.post(
        f"{BASE_URL}/generate/ai-image",
        json={
            "prompt": "abstract gradient background, blue and purple, smooth transitions",
            "width": 512,
            "height": 512,
            "num_steps": 4,
            "format": "base64"
        }
    )

    if response.status_code == 200:
        data = response.json()
        print(f"Generated AI image ({data['width']}x{data['height']})")
        save_image(data, "output/ai_abstract.png")
    else:
        print(f"Error: {response.text}")

def generate_logos():
    """Generate logos using AI"""
    print("\n--- AI Logos ---")

    logos = [
        {"description": "coffee shop", "style": "modern"},
        {"description": "tech startup", "style": "tech"},
        {"description": "bakery", "style": "vintage"},
        {"description": "fitness gym", "style": "bold"}
    ]

    for logo in logos:
        print(f"\nGenerating {logo['description']} logo ({logo['style']} style)...")
        response = requests.post(
            f"{BASE_URL}/generate/logo",
            json={
                "description": logo["description"],
                "style": logo["style"],
                "width": 512,
                "height": 512,
                "format": "base64"
            }
        )

        if response.status_code == 200:
            data = response.json()
            filename = f"output/logo_{logo['description'].replace(' ', '_')}.png"
            save_image(data, filename)
        else:
            print(f"Error: {response.text}")

def generate_illustrations():
    """Generate illustrations using AI"""
    print("\n--- AI Illustrations ---")

    illustrations = [
        {"description": "team collaboration in office", "style": "digital"},
        {"description": "mountain landscape", "style": "watercolor"},
        {"description": "city skyline", "style": "vector"},
        {"description": "workspace with laptop", "style": "isometric"}
    ]

    for illust in illustrations:
        print(f"\nGenerating {illust['description']} ({illust['style']})...")
        response = requests.post(
            f"{BASE_URL}/generate/illustration",
            json={
                "description": illust["description"],
                "style": illust["style"],
                "width": 768,
                "height": 512,
                "format": "base64"
            }
        )

        if response.status_code == 200:
            data = response.json()
            filename = f"output/illust_{illust['description'].split()[0]}.png"
            save_image(data, filename)
        else:
            print(f"Error: {response.text}")

def main():
    print("DELM Expanded Image Generation Examples")
    print("=" * 40)

    # Create output directory
    output_dir = Path("output")
    output_dir.mkdir(exist_ok=True)

    # SVG Generation (fast, no model needed)
    generate_icons()
    generate_symbols()

    # AI Generation (requires model download on first run)
    print("\n" + "=" * 40)
    print("AI Image Generation")
    print("Note: First run downloads ~4GB model")
    print("=" * 40)

    try:
        generate_ai_images()
        generate_logos()
        generate_illustrations()
    except Exception as e:
        print(f"\nAI generation error: {e}")
        print("Make sure mflux is installed: pip install mflux")

    print(f"\nAll images saved to {output_dir.absolute()}")
    print("To view: open output/")

if __name__ == "__main__":
    main()
