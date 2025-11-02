# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**React Dashboard Website with Squidex CMS Integration** - A minimal, A4-styled responsive dashboard application featuring a black & white theme with dark mode toggle, powered by Squidex headless CMS for content management.

## Quick Commands

```bash
# Development
npm run dev          # Start Vite dev server on http://localhost:3001

# Building
npm run build        # Create optimized production build

# Code Quality
npm run lint         # Run ESLint on all files

# Preview
npm run preview      # Preview production build locally
```

## Technology Stack

- **React 19.1.1** - UI framework
- **Vite 7.1.7** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Squidex CMS** - Headless CMS for content
- **ESLint 9** - Code linting with React Hooks support

## Development Setup

### Prerequisites
- Node.js 18+
- Squidex account and configured credentials

### Initial Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```
   VITE_SQUIDEX_APP_NAME=platform
   VITE_SQUIDEX_CLIENT_ID=<your_client_id>
   VITE_SQUIDEX_CLIENT_SECRET=<your_client_secret>
   VITE_SQUIDEX_URL=https://squidex.thepk.in
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

### Squidex Setup Required
The application requires a Squidex CMS instance with a "blog" schema containing:
- `title` (String)
- `content` (String/Rich Text)
- `author` (String)
- `excerpt` (String)
- `publishDate` (DateTime)
- `slug` (String)
- `tags` (Array)
- `featuredImage` (Asset)
- `status` (String)

Create client credentials in Squidex Settings > Clients and add to `.env`.

## Architecture

### Directory Structure

```
src/
├── components/          # Reusable React components
│   ├── Layout.jsx      # Main layout wrapper
│   ├── Navigation.jsx  # Navigation bar
│   ├── DarkModeToggle.jsx
│   └── ArticleDisplay.jsx
├── pages/              # Route pages
│   ├── Home.jsx
│   ├── Articles.jsx    # Article list
│   ├── SingleArticle.jsx # Article detail
│   ├── About.jsx
│   └── tools/          # Tool pages
│       ├── APITester.jsx
│       ├── CodeFormatter.jsx
│       ├── ColorPaletteGenerator.jsx
│       ├── GitCommitGenerator.jsx
│       ├── JsonValidator.jsx
│       ├── PasswordGenerator.jsx
│       ├── QRGenerator.jsx
│       ├── RegexBuilder.jsx
│       ├── Base64Converter.jsx
│       └── TwoFAGenerator.jsx
├── contexts/           # React Context providers
│   └── ThemeContext.jsx # Dark mode state
├── services/           # API integration
│   └── cmsService.js   # Squidex CMS service
├── styles/             # CSS files
├── App.jsx             # Main app component
└── main.jsx            # React entry point
```

### Key Architectural Patterns

**Theme Management:**
- Dark mode state managed via React Context (`ThemeContext.jsx`)
- Applied globally across all components
- Dark mode toggle accessible in `DarkModeToggle.jsx`

**CMS Integration:**
- `src/services/cmsService.js` handles all Squidex communication
- OAuth2 client credentials flow for authentication
- Rich text to HTML conversion for article content
- Error handling with fallback mock data for offline development
- Supports paragraphs, lists, headings, images, code blocks, tables, etc.

**Routing:**
- Client-side routing via React Router v7
- Main routes:
  - `/` - Home
  - `/articles` - Article listing
  - `/article/:id` - Article detail
  - `/tools/*` - Tools hub with sub-routes
  - `/about` - About page

**UI Design:**
- A4 page-style layout with shadow effects
- Times New Roman serif font
- Responsive design (desktop, tablet, mobile)
- Black & white theme with dark mode alternative

## Development Notes

### ESLint Configuration
- Located in `eslint.config.js` (flat config format)
- Custom rule: unused variables must match pattern `^[A-Z_]` (allows unused props)
- Targets only `.js` and `.jsx` files
- Ignores `dist` directory

### Vite Configuration
- Dev server configured for:
  - Port: 3001
  - Host: 0.0.0.0 (all interfaces)
  - Allowed hosts: `thepk.in`, `localhost`, `127.0.0.1`
- See `vite.config.js` for full configuration

### Docker Support
- Dockerfile provided using Node 18 Alpine
- Dev server runs on port 3001 inside container
- Build: `docker build -t frontend .`
- Run: `docker run -p 3001:3001 frontend`

## Common Development Tasks

**Adding a new page:**
1. Create page component in `src/pages/`
2. Add route in `App.jsx`
3. Add navigation link in `Navigation.jsx`

**Fetching article data:**
- Import `cmsService` from `src/services/cmsService.js`
- Use `getArticles()` to fetch all articles with pagination
- Use `getArticleBySlug(slug)` to fetch single article

**Styling:**
- Global styles in `src/index.css` and `src/App.css`
- Component-specific styles in `src/styles/`
- Dark mode: check `ThemeContext` for current theme
- A4 page design reference in existing CSS

**Running single tool tests:**
- Tools are simple functional components - test by running dev server and navigating to `/tools/<tool-name>`
- Tools include: Code Formatter, Git Commit Generator, JSON Validator, Password Generator, 2FA Generator, QR Generator, Color Palette Generator, API Tester, Regex Builder, Base64 Converter

## Tool Pages Reference

### 1. Color Palette Generator (`src/pages/tools/ColorPaletteGenerator.jsx`)

**Purpose:** Generate color palettes based on color theory principles with visual display and export functionality.

**Features:**
- Base color input with hex color picker
- Palette generation algorithms:
  - Complementary: Opposite colors on color wheel
  - Analogous: Adjacent colors for harmony
  - Triadic: Three equally-spaced colors
  - Tetradic: Four colors in complementary pairs
  - Monochromatic: Variations of single color
  - Split-Complementary: Base + adjacent complement
- Color format options: HEX, RGB, HSL
- Large visual color swatches (150px height)
- Export options:
  - CSS variables (--color-1, --color-2, etc.)
  - JSON with all color formats
  - PNG swatch image download
- Save/load color palettes via localStorage
- Responsive grid layout

**Key Implementation:**
- Color conversion utilities: `hexToRgb()`, `rgbToHsl()`, `hslToRgb()`, `rgbToHex()`
- HSL color space used for mathematical palette generation
- Canvas API used for PNG export functionality
- localStorage key: `savedColorPalettes`

### 2. API Testing Tool (`src/pages/tools/APITester.jsx`)

**Purpose:** Comprehensive REST API testing with request/response management, similar to Postman.

**Features:**
- HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
- URL input with query parameter builder
- Headers management (add/remove dynamically)
- Query parameters management (add/remove dynamically)
- Request body editor with JSON formatting
- Sample requests (JSONPlaceholder GET, POST, GitHub API)
- Response analysis:
  - Status code with color-coded indicators (2xx=green, 3xx=blue, 4xx=orange, 5xx=red)
  - Response time in milliseconds
  - Response size in bytes
  - Response body (formatted JSON or raw text)
  - Response headers in table format
- Request history: Save/load previous requests
- Tab-based interface: Headers, Params, Body, Saved Requests
- Copy to clipboard functionality

**Key Implementation:**
- `fetch()` API for HTTP requests with performance timing
- Content-Type detection for automatic JSON parsing
- URL building with proper query string encoding
- localStorage key: `apiRequests`
- Status code color mapping: `getStatusColor(code)`

**Common Issues Fixed:**
- Response panel overflow: Added proper CSS containment with `max-width: 100%`, `overflow: hidden`, and `min-width: 0` on flex children
- Long response text wrapping: Added `word-break: break-word` and `white-space: pre-wrap`

### 3. Regex Builder (`src/pages/tools/RegexBuilder.jsx`)

**Purpose:** Build, test, and debug regular expressions with live matching and pattern management.

**Features:**
- Pattern input with `/pattern/flags` display
- Flag support and management:
  - g: Global (find all matches)
  - i: Case-insensitive
  - m: Multiline (^ and $ match line boundaries)
  - s: Dot-all (. matches newlines)
  - u: Unicode pattern matching
- Interactive flag checkboxes with descriptions
- Live testing:
  - Execute pattern against test string
  - Display all matches with positions
  - Show capture groups ($1, $2, etc.)
- Replace functionality:
  - Find and replace with group substitution
  - Display replaced result with copy button
- Pattern management:
  - Save patterns to localStorage
  - Load saved patterns
  - Delete saved patterns
- Example patterns (6 pre-built):
  - Email Address validation
  - URL detection
  - Phone number validation
  - Hex color code matching
  - IP address matching
  - Username validation (alphanumeric + underscore)
- Regex cheatsheet:
  - Character classes (., [abc], \d, \w, \s, etc.)
  - Quantifiers (*, +, ?, {n}, {n,m}, etc.)
  - Anchors (^, $, \b, \B)
  - Groups & alternation ((abc), (?:abc), a|b, etc.)
- Tab-based interface: Test, Replace, Saved, Examples
- Match visualization with badge numbering

**Key Implementation:**
- `RegExp()` constructor for dynamic pattern compilation
- `regex.exec()` in loop for global flag matching with capture groups
- `String.match()` for single match scenarios
- `String.replace()` for replacement functionality
- localStorage key: `savedRegex`
- Match grouping: `matchResult.slice(1)` extracts capture groups

**Error Handling:**
- Try-catch blocks for invalid regex patterns
- User-friendly error messages: `Regex Error: {message}`
- Validation for empty pattern and test string before execution

### 4. Base64 Converter (`src/pages/tools/Base64Converter.jsx`)

**Purpose:** Convert text and images to and from Base64 encoding with support for both standard and URL-safe variants.

**Features:**
- **Text Conversion Modes:**
  - Encode: Convert plain text to Base64
  - Decode: Convert Base64 back to readable text
  - URL-Safe Encode: Creates Base64 safe for URLs (replaces +, /, =)
  - URL-Safe Decode: Decodes URL-safe Base64
- **Image Support:**
  - Image to Base64: Upload images and convert to data URLs
  - Base64 to Image: Paste Base64 and preview image
  - Image preview display with download capability
- **Features:**
  - Mode selector for quick switching between conversion types
  - Copy output to clipboard
  - Save conversion history via localStorage
  - Unicode and special character support
  - Clear all button to reset input/output
  - Image file picker with dashed border UI
- **Tab-based Interface:**
  - Converter: Text-based conversions
  - Image Converter: Image handling
  - Saved: Conversion history
- **Educational Guide:**
  - What is Base64 explanation
  - Use cases and applications
  - Character set reference
  - Standard vs URL-Safe comparison

**Key Implementation:**
- `btoa()` and `atob()` for standard Base64 encoding/decoding
- `encodeURIComponent()` and `decodeURIComponent()` for Unicode support
- FileReader API for image file handling
- Data URLs for image preview and download
- Character replacement for URL-safe encoding: `+` → `-`, `/` → `_`, remove `=`
- localStorage key: `base64Conversions`
- Conversion history stored with truncated input/output (first 50 chars)

**Error Handling:**
- Try-catch blocks for encoding/decoding failures
- Validation for empty input before conversion
- Image format validation (must start with "data:image")
- User-friendly error messages for invalid Base64 data

## Deployment

- **Build output:** `dist/` directory (generated by `npm run build`)
- **Environment variables:** Must be set before build for Squidex connectivity
- **Docker:** Use provided Dockerfile for containerized deployment
- **Port:** Application runs on 3001 in development and production (via dev server)