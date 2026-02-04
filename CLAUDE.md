# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ARK-ALL-Web is the web version of UM-ARK-ALL, a student application for the University of Macau. It's built with Next.js and provides web interfaces for student services, club management, and campus information.

## Architecture

### Tech Stack
- **Framework**: Next.js 13 with Pages Router
- **Language**: TypeScript/JavaScript (mixed codebase)
- **Styling**: Tailwind CSS with custom theme configuration
- **State Management**: Zustand for global state (language settings)
- **Internationalization**: i18next with react-i18next
- **Animation**: Framer Motion for page transitions
- **3D Graphics**: React Three Fiber (@react-three/fiber, @react-three/drei)
- **UI Components**: Headless UI, Heroicons

### Directory Structure

```
/pages              # Next.js pages (routes)
  /api              # API routes
  /club             # Club-related pages
  _app.js           # App entry with providers
  index.js          # Home page
  ...

/components
  /limited          # Page-specific components (Ark, Benefits, FAQ, etc.)
  /micros           # Small reusable components
  /uiComponents     # UI component library (ContentBlock, Frames, etc.)
  footer.js         # Main footer component
  navbar.js         # Main navigation
  popupWidget.js    # Support widget
  ...

/lib
  serverActions.tsx # Server-side API actions (createActivity, editActivity, etc.)
  authentication.tsx # Auth utilities

/utils
  /functions        # Utility functions
    u_format.js     # Date formatting, FormData conversion
  pathMap.js        # API endpoints, URLs, constants
  uiMap.js          # Theme colors and design tokens
  settings.js       # App settings

/states
  state.tsx         # Zustand global state (language)

/types
  index.d.tsx       # TypeScript type definitions

/public
  /img              # Images
  /translations.json # i18n translations
  ...
```

## Development Commands

### Installation
```bash
yarn install
```

### Development Server
```bash
yarn dev
# Runs on http://localhost:3000
```

### Production Build
```bash
yarn build
yarn start
```

## Coding Conventions

### Naming Conventions (Project-Specific)

#### React State Variables
- Prefix state variables with `m_` (meaning "Mine" - scoped to current component)
- Example: `const [m_clubNum, setClubNum] = useState("")`
- Setters use lowercase `set` prefix: `setClubNum`, `setActivityData`

#### Data Processing Variables
- Prefix with `_` for pre-processed data (to be processed)
- Suffix with `_` for post-processed data (already processed)
- Example:
  ```typescript
  let _data = m_activityData.content;  // Pre-processed
  let data = {startdatetime, enddatetime, ...rest};  // Processed
  ```

#### TypeScript Interfaces
- Prefix with uppercase `I`
- Example: `IGetActivityById`, `ICreateActivity`
- Pre/post processing versions: `_ICreateActivity`, `ICreateActivity`

### Styling Guidelines

#### Tailwind CSS Usage
- Use Tailwind classes exclusively for styling (avoid inline `style={{}}`)
- Custom theme colors defined in `tailwind.config.js` and `utils/uiMap.js`
- Access via `themeColor`, `themeColorLight`, `success`, `warning`, `alert` classes

#### Theme Colors (from `utils/uiMap.js`)
- Primary: `themeColor` (#4796d6 light, #4a9cde dark)
- Secondary: `secondThemeColor` (#FF8627)
- Semantic: `success` (#27ae60), `warning` (#f39c12), `alert` (#f75353)
- Text hierarchy: `black.main`, `black.second`, `black.third`

### Internationalization (i18n)

- Translations in `/public/translations.json`
- Supported languages: Chinese (zh), English (en), Japanese (ja)
- Use `useTranslation()` hook: `const { t } = useTranslation()`
- Access translations via keys: `t('key_name')`

### API Integration

#### API Endpoints
- Defined in `utils/pathMap.js`
- Base URI: `https://umall.one/api/` (production), `http://localhost:8000/api/` (dev)

#### Server Actions
- Located in `lib/serverActions.tsx`
- Key functions: `createActivity`, `editActivity`, `deleteActivity`, `getActivityById`, `getClubXX`

### 3D Graphics

- Built with React Three Fiber
- Components in `components/limited/ArkModel/` and `components/limited/ArkSkyBox/`
- Used for homepage hero section

## Common Tasks

### Adding a New Page
1. Create page file in `/pages` (e.g., `newpage.js` or `newpage.tsx`)
2. Follow existing page structure (import Navbar, Footer, use ARKMain wrapper)
3. Add route to navigation if needed in `components/navbar.js`

### Adding a New API Endpoint
1. Add endpoint constants to `utils/pathMap.js` in `GET` or `POST` object
2. Create server action in `lib/serverActions.tsx` if needed
3. Use `axios` for HTTP requests, follow existing patterns

### Adding Translations
1. Edit `/public/translations.json`
2. Add keys for each language (zh, en, ja)
3. Use `t('key')` in components

### Styling Components
1. Use Tailwind classes exclusively
2. Reference custom theme colors from `tailwind.config.js`
3. For dynamic colors based on theme, use Tailwind's `dark:` prefix

## Environment Variables

The project uses Next.js built-in environment handling:
- `NODE_ENV`: Set automatically by Next.js (`development` or `production`)
- No custom `.env` files are currently used

API base URIs are defined in `utils/pathMap.js` based on `NODE_ENV`.

## Deployment

- Production URL: https://umall.one (or configured domain)
- Built as static export (`output: 'standalone'` in `next.config.js`)
- Deployment is handled through GitHub Actions (see `.github/workflows/`)

## Troubleshooting

### Common Issues

1. **i18n not loading translations**: Check that `translations.json` is properly formatted and keys exist for all languages

2. **Theme colors not applying**: Ensure Tailwind classes use the custom color names (e.g., `text-themeColor`, `bg-themeColor`)

3. **API requests failing**: Check `NODE_ENV` and verify `BASE_URI` is pointing to correct environment

4. **3D graphics not rendering**: Ensure browser supports WebGL and check console for Three.js errors

### Getting Help

- Check existing dev docs in `/documents/devdocs/`
- Review GitHub issues at https://github.com/UM-ARK
