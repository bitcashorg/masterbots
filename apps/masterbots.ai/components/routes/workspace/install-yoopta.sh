#!/bin/bash

# Script to install Yoopta dependencies
echo "Installing Yoopta dependencies..."

# Navigate to the project root
cd $(dirname "$0")/../../../

# Install core Yoopta packages
npm install --save @yoopta/editor @yoopta/paragraph @yoopta/headings @yoopta/blockquote
npm install --save @yoopta/code @yoopta/lists @yoopta/divider @yoopta/link @yoopta/marks
npm install --save @yoopta/toolbar @yoopta/action-menu-list @yoopta/link-tool

echo "Yoopta dependencies installed successfully!"
echo "Please restart your development server to use the rich text editor."