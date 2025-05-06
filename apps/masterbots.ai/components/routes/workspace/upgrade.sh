#!/bin/bash

# This script upgrades the workspace content component to use Yoopta editor

# Create backup of original file
cp workspace-content.tsx workspace-content.tsx.backup

# Replace the original file with the new implementation
cp workspace-content-yoopta.tsx workspace-content.tsx

echo "Workspace content updated to include Yoopta editor!"
echo "A backup of the original file has been created at workspace-content.tsx.backup"