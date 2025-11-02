# Eagle GroupTagger - AI Coding Agent Instructions

## Project Overview

**GroupTagger** is an Eagle.cool desktop plugin that streamlines batch tagging of images using a React-based UI. Users navigate through untagged items and efficiently apply tags from predefined groups.

**Key Technology Stack:**
- React 19 with React Router v7 for navigation
- Vite as the build system (SPA, relative base paths: `./`)
- Eagle Plugin API for image library integration
- Minimal dependencies (React, React-DOM, React-Router-DOM)

## Architecture

### Plugin Lifecycle & Eagle API Integration

The plugin bootstraps via two entry points:

1. **`js/plugin.js`** - Low-level Eagle lifecycle hooks:
   - `eagle.onPluginCreate()` - Plugin initialization (manifest access)
   - `eagle.onPluginShow()` - UI shown (fetch data here)
   - `eagle.onPluginRun()` - Main execution trigger
   - `eagle.onPluginHide()` / `eagle.onPluginBeforeExit()` - Cleanup hooks

2. **`src/main.jsx`** - React app entry point:
   - HashRouter-based routing (use `#/` URLs in plugin context)
   - Two routes: `/` (Home) → `/tags/:groupId` (Tagging workspace)

### Data Flow

```
App Component (root)
├─ Fetches tagGroups via eagle.tagGroup.get() on plugin run
├─ Shares via context (Outlet context: { tagGroups, setTagGroups })
│
└─ Routes:
   ├─ Home: Lists tag groups, navigates to /tags/:groupId
   └─ Tagging:
      ├─ Fetches all items via eagle.item.getAll()
      ├─ Filters items (excludes those already tagged with group's tags)
      ├─ Presents items sequentially for tagging
      └─ Persists via item.save() for each tag addition
```

### Key Components

| Component | Purpose | Context Usage |
|-----------|---------|----------------|
| `App.jsx` | Root layout, tag group state | Provides `tagGroups` to children |
| `Home.jsx` | Tag group selection UI | Consumes `tagGroups`, routes to `/tags/:groupId` |
| `Tagging.jsx` | Main tagging interface | Manages local state for items, history, current index |

## Critical Patterns & Conventions

### Eagle API Usage

- **Always use await**: All Eagle API calls are async (`eagle.tagGroup.get()`, `eagle.item.getAll()`, `item.save()`)
- **Global `eagle` object**: Directly available in React components (not imported)
- **Tag persistence**: Call `item.save()` after modifying `item.tags` array to persist changes
- **Thumbnail access**: Items have `.thumbnailURL` property for display

### State Management

- **No global state library**: Props and context (React Router Outlet context)
- **Derived state approach** in Tagging.jsx:
  - `filteredItems` - All items needing tags
  - `currentIndex` - Current position in workflow
  - `history` - Undo stack (tracks items & added tags)
- **History format**: `[{ item, added_tag: 'tagName' | 'skip' }, ...]`

### Build & Development

```bash
npm run dev       # Vite dev server (http://localhost:5173)
npm run build     # Production build → dist/
npm run build:watch  # Continuous rebuild during development
```

- Vite config uses relative base (`./`), required for plugin loading
- Entry point: `index.html` → `src/main.jsx`
- Dist output loads via `manifest.json` mainUrl: `dist/index.html`

## Development Workflow

1. **Local Dev**: Run `npm run dev` for HMR feedback
2. **Plugin Testing**: In Eagle, load plugin from `/dist` directory
3. **Build & Deploy**: `npm run build` → test in Eagle with the dist folder
4. **Watch Mode**: Use `build:watch` during iterative development

## Common Pitfalls & Notes

- **Array mutations**: Always create new array references for React state (e.g., `[...history, newItem]`)
- **Tag deduplication**: Check `!currentItem.tags.includes(tag)` before adding (done in Tagging.jsx)
- **Empty state handling**: Gracefully handle when no tag groups or items exist
- **Image URLs**: Validate `thumbnailURL` exists before rendering `<img>`
- **Filter logic**: Items are included if they do **not** have any tags from the current group

## Key Files Reference

- `manifest.json` - Plugin metadata (ID, version, window size 640x480)
- `package.json` - Dev: Vite + React; no production dependencies on Build tools
- `vite.config.js` - Relative base, React plugin, dist output
- `js/plugin.js` - Eagle lifecycle examples (can be integrated into React as needed)
- `src/pages/Tagging.css` - Image gallery layout (3-column display with preview)

## Integration with Eagle Plugin API

Refer to [Eagle Plugin API Documentation](https://developer.eagle.cool/plugin-api) for:
- Tag group structure & queries
- Item properties & filtering
- Plugin lifecycle event details

For Japanese-specific guidance, see `AGENTS.md`.
