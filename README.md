# Obsidian React Plugin iOS Issue Demo

This repository demonstrates a compatibility issue when building Obsidian plugins using React, specifically when running on iOS devices. While the plugin works correctly on desktop versions of Obsidian, it fails to load on iOS devices.

## The Issue

The plugin fails to load on iOS devices when using React 18's `createRoot()` API. The specific line causing the issue is:

```typescript
  onOpen() {
    const { contentEl } = this;
    this.modalEl.classList.add("bg-blue-500");

    // Create a React root and render the HelloWorldPopup component
    // This line works on Desktop, but fails on iPhone:
    this.root = ReactDOM.createRoot(contentEl);
    this.root.render(<div>Hello World</div>);
  }
```

## Environment Information

- Obsidian Desktop: Works ✅
- Obsidian iOS: Fails ❌
- React version: 18.x
- TypeScript version: 5.x
