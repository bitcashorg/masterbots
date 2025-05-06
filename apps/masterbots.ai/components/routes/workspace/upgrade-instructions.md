# Yoopta Rich Text Editor Integration - Upgrade Instructions

To complete the Yoopta integration with the improved minimalist UI:

1. **Replace the workspace-content.tsx file**:
   ```bash
   cd /Users/merivercap/CodeProjects/Masterbots/masterbots/apps/masterbots.ai/components/routes/workspace/
   cp workspace-content.tsx workspace-content.tsx.backup
   cp workspace-content-updated.tsx workspace-content.tsx
   ```

2. **What's changed**:
   - The toggle button has been moved to the top tab bar, making it more intuitive
   - The button now has a cleaner, minimal design with small icons
   - The toggle shows "Rich" or "Plain" instead of longer text
   - The button now shows in a color that matches the active tab

3. **Visual improvements**:
   - The toggle is more noticeable yet less intrusive
   - Uses familiar icons (pencil for rich editing, code brackets for plain text)
   - Maintains the clean, minimal UI design of the workspace
   - The button appears in the same row as the tab navigation for better context

4. **Functionality**:
   - All functionality remains the same
   - The Yoopta editor works as before but is now more discoverable

These changes make the rich text editor toggle more intuitive and aligned with UI design best practices.