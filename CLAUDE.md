# 🚀 Get Started with Yoopta Editor

## Installing

First, install the core package `@yoopta/editor` with the default plugin `@yoopta/paragraph` and peer dependencies:

```bash
yarn add @yoopta/editor @yoopta/paragraph slate slate-react
# or
npm install @yoopta/editor @yoopta/paragraph slate slate-react
```

---

## Usage

Initialize the editor instance, import `YooptaEditor` component, and pass a list of plugins:

```tsx
import { useMemo, useState } from "react";
import YooptaEditor, { createYooptaEditor, YooptaContentValue } from "@yoopta/editor";
import Paragraph from "@yoopta/paragraph";

const plugins = [Paragraph];

const Editor = () => {
  const editor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState<YooptaContentValue>();

  const onChange = (value: YooptaContentValue, options: YooptaOnChangeOptions) => {
    setValue(value);
  };

  return (
    <YooptaEditor
      editor={editor}
      plugins={plugins}
      placeholder="Type something"
      value={value}
      onChange={onChange}
    />
  );
};
```

---

## Plugins

Here is a list of available plugins:

```
@yoopta/paragraph
@yoopta/blockquote
@yoopta/accordion
@yoopta/code
@yoopta/embed
@yoopta/image
@yoopta/link
@yoopta/file
@yoopta/callout
@yoopta/video
@yoopta/lists
@yoopta/headings
@yoopta/table
@yoopta/divider
```

Install them with:

```bash
yarn add @yoopta/embed @yoopta/headings @yoopta/image @yoopta/link @yoopta/lists @yoopta/paragraph @yoopta/video @yoopta/blockquote @yoopta/callout @yoopta/code @yoopta/file @yoopta/accordion @yoopta/table @yoopta/divider

# or

npm install @yoopta/embed @yoopta/headings @yoopta/image @yoopta/link @yoopta/lists @yoopta/paragraph @yoopta/video @yoopta/blockquote @yoopta/callout @yoopta/code @yoopta/file @yoopta/accordion @yoopta/table @yoopta/divider
```

---

## Example Usage with Multiple Plugins

```tsx
import { useMemo, useState } from 'react';
import YooptaEditor, { createYooptaEditor, YooptaContentValue } from '@yoopta/editor';
import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';

const plugins = [Paragraph, Blockquote];

export default function Editor() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState<YooptaContentValue>();

  const onChange = (value: YooptaContentValue, options: YooptaOnChangeOptions) => {
    setValue(value);
  };

  return (
    <div>
      <YooptaEditor
        editor={editor}
        placeholder="Type text.."
        value={value}
        onChange={onChange}
        plugins={plugins}
      />
    </div>
  );
}
```

---

## Tools

Yoopta Editor provides useful tools for working with content.

### Available Tools:

```
@yoopta/action-menu-list
@yoopta/toolbar
@yoopta/link-tool
@yoopta/chat-gpt-assistant (in progress)
```

### How to Use:

```tsx
import { useMemo, useState } from 'react';
import YooptaEditor, { createYooptaEditor, YooptaContentValue } from '@yoopta/editor';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import ActionMenu, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';

const TOOLS = {
  Toolbar: {
    tool: Toolbar,
    render: DefaultToolbarRender,
  },
  ActionMenu: {
    tool: ActionMenu,
    render: DefaultActionMenuRender,
  },
  LinkTool: {
    tool: LinkTool,
    render: DefaultLinkToolRender,
  },
};

export default function Editor() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState<YooptaContentValue>();

  const onChange = (value: YooptaContentValue, options: YooptaOnChangeOptions) => {
    setValue(value);
  };

  return (
    <div>
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        placeholder="Type text.."
        value={value}
        onChange={onChange}
        tools={TOOLS}
      />
    </div>
  );
}
```

---

## Marks

Marks are simple text formats provided by the `@yoopta/marks` package.

### Available Marks:

- **Bold**
- **Italic**
- **CodeMark**
- **Underline**
- **Strike**
- **Highlight**

### How to Use:

```tsx
import { useMemo, useState } from 'react';
import YooptaEditor, { createYooptaEditor, YooptaContentValue } from '@yoopta/editor';
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

export default function Editor() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState<YooptaContentValue>();

  const onChange = (value: YooptaContentValue, options: YooptaOnChangeOptions) => {
    setValue(value);
  };

  return (
    <div>
      <YooptaEditor
        editor={editor}
        placeholder="Type text.."
        plugins={plugins}
        tools={TOOLS}
        value={value}
        onChange={onChange}
        marks={MARKS}
      />
    </div>
  );
}
```