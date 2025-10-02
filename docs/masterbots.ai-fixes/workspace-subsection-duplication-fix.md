# Workspace Subsection Duplication Fix

## Issue Analysis from Console Logs

### The Evidence

From the console logs, we observed:

```
Chunk 1: totalSections: 7  (original sections)
Chunk 2: totalSections: 7  (still correct)
Chunk 3: totalSections: 7  (still correct)
Chunk 4: totalSections: 10 (NEW SECTIONS APPEARED!)
```

Then later, section IDs showed duplication:

- `secondary-audience-and-responsibilities`
- `secondary-audience-and-responsibilities-1` ← Duplicate!
- `executive-sponsors-and-governance`
- `executive-sponsors-and-governance-1` ← Duplicate!

### Root Cause: Hierarchical Content in Flat Parser

**The Problem:**

1. User expands `### Intended audience and responsibilities` section
2. AI generates content with **#### subsections** (child headings):

   ```markdown
   #### Primary audience and core responsibilities

   ...content...

   #### Secondary audience and responsibilities

   ...content...

   #### Executive sponsors and governance

   ...content...
   ```

3. Our parser treats ALL headings as **flat sections**, not hierarchical
4. Each #### becomes its own section with this structure:

   ```javascript
   Section "Intended audience..." (level 3)
     contentStart: 100
     contentEnd: 150  ← Points to FIRST #### heading!

   Section "Primary audience..." (level 4)
     contentStart: 150
     contentEnd: 200

   Section "Secondary audience..." (level 4)
     contentStart: 200
     contentEnd: 250
   ```

5. When we replace the ### section, we only replace from `contentStart` to `contentEnd`
6. This removes the parent's intro text but **leaves all the #### child sections** in the document
7. Next streaming chunk arrives and adds NEW #### sections
8. Result: **Duplication** - old #### sections + new #### sections

### Visual Diagram

**Before Replacement:**

```
### Intended audience...  ← contentStart: 100
Intro text here
#### Primary audience...  ← contentEnd: 150 (end of parent!)
...content...
#### Secondary audience... ← Position: 200
...content...
#### Next Same-Level Heading ← Position: 300
```

**After Replacement (WRONG):**

```
### Intended audience...  ← contentStart: 100
NEW CONTENT INCLUDING:
#### Primary audience... (NEW)
...new content...
#### Secondary audience... (NEW)  ← contentEnd: 150
...new content...
#### Primary audience... (OLD - still there!)  ← Position: 150+
...old content...
#### Secondary audience... (OLD - still there!)
...old content...
#### Next Same-Level Heading
```

## The Fix: Replace Parent AND All Children

Modified `replaceSectionContent` to:

1. **Start at `contentStart`** (same as before)
2. **Find the REAL end** by scanning forward from `contentEnd`
3. **Skip past ALL child headings** (deeper level than parent)
4. **Stop at next same-or-higher level heading** (sibling or parent)
5. **Replace everything from start to true end** (parent + all children)

### Algorithm

```typescript
// Start with the parser's contentEnd (first heading after section)
let end = section.contentEnd;

// Look ahead from contentEnd
const afterSectionContent = fullMarkdown.slice(end);
const headingRegex = /^(#{1,6})\s+(.+)$/gm;

while ((match = headingRegex.exec(afterSectionContent))) {
  const matchLevel = match[1].length;

  // If heading is same/higher level (≤ parent level), stop
  if (matchLevel <= section.level) {
    break;
  }

  // Otherwise it's a child - extend end past it
  end = matchPosition;
}
```

### Example

**Parent Section: Level 3 (###)**

Scanning forward:

- Find `####` (level 4) → Child, keep going
- Find `####` (level 4) → Child, keep going
- Find `####` (level 4) → Child, keep going
- Find `###` (level 3) → **STOP!** Same level, this is a sibling

**Result:** Replace from parent start to just before the sibling `###`

## Testing

To verify the fix:

1. **Expand a section** that generates #### subsections
2. **Watch console logs** for:

   ```
   Chunk 1: totalSections: 7
   Chunk 2: totalSections: 7  ← Should stay same!
   Chunk 3: totalSections: 7  ← Should stay same!
   Chunk 4: totalSections: 10 ← May increase as #### are added
   Chunk 5: totalSections: 10 ← Should stay stable now!
   ```

3. **Check final document** for:
   - ✅ Each #### subsection appears ONCE
   - ✅ No `-1` suffix duplicates
   - ✅ Content flows correctly parent → children

## Why This Works

### Before Fix

```
Replace(start: 100, end: 150)  ← Only parent intro
Old children (150-300) remain  ← LEFT BEHIND
New children added after       ← DUPLICATION
```

### After Fix

```
Replace(start: 100, end: 300)  ← Parent + ALL old children
New children added in their place ← CORRECT
```

## Edge Cases Handled

1. **No children**: If section has no subsections, `end` stays at `contentEnd`
2. **Multiple child levels**: Continues past ####, #####, etc. until reaching same level
3. **Last section**: If no same-level heading found, extends to end of document
4. **Empty content**: Handles sections with no content gracefully

## Related Files

- `/apps/pro-web/lib/markdown-utils.ts` - Section parser and replacement (FIXED)
- `/apps/pro-web/lib/hooks/use-workspace-chat.tsx` - Streaming logic (uses the fix)

## Key Insight

**Flat parsing + hierarchical content = Need to track hierarchy during replacement**

While the parser treats sections as flat, when we MODIFY sections that contain hierarchical content (child headings), we must respect that hierarchy to avoid leaving orphaned children behind.
