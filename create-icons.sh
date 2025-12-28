#!/bin/bash

# Script to create placeholder icons
# This creates simple colored squares as placeholder icons
# Replace these with actual icons for production

echo "Creating placeholder icons..."

# Create icons directory if it doesn't exist
mkdir -p public/icons

# You can use ImageMagick to create placeholder icons:
# brew install imagemagick (on macOS)

# If ImageMagick is available, create colored square icons
if command -v convert &> /dev/null; then
    convert -size 16x16 xc:#4A90E2 public/icons/icon16.png
    convert -size 32x32 xc:#4A90E2 public/icons/icon32.png
    convert -size 48x48 xc:#4A90E2 public/icons/icon48.png
    convert -size 128x128 xc:#4A90E2 public/icons/icon128.png
    echo "✓ Placeholder icons created using ImageMagick"
else
    echo "⚠ ImageMagick not found. Please create icons manually or:"
    echo "  - macOS: brew install imagemagick"
    echo "  - Ubuntu: sudo apt-get install imagemagick"
    echo ""
    echo "Alternatively, create icons online at:"
    echo "  - https://www.favicon-generator.org/"
    echo "  - https://realfavicongenerator.net/"
    echo ""
    echo "Place the icons in public/icons/ with these names:"
    echo "  - icon16.png (16x16)"
    echo "  - icon32.png (32x32)"
    echo "  - icon48.png (48x48)"
    echo "  - icon128.png (128x128)"
fi
