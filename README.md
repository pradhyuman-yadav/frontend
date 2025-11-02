# React Dashboard Website with Squidex CMS

A minimal dashboard-style React application with A4 page design, black & white theme, and Squidex CMS integration.

## Features

- **A4 Page Style**: Clean, document-like layout with shadow effects
- **Black & White Theme**: Monochromatic design with dark mode toggle
- **Squidex Integration**: Ready for Squidex headless CMS integration
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Clean Navigation**: Home, Articles, Categories, and About pages
- **Typography**: Times New Roman serif font for document-like feel

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your Squidex settings in `.env`:
   ```
   VITE_SQUIDEX_APP_NAME=your-app-name
   VITE_SQUIDEX_CLIENT_ID=your-client-id
   VITE_SQUIDEX_CLIENT_SECRET=your-client-secret
   VITE_SQUIDEX_URL=https://cloud.squidex.io
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Squidex Setup

1. Create a Squidex account at [cloud.squidex.io](https://cloud.squidex.io)
2. Create a new app in Squidex
3. Define an "articles" schema with fields:
   - `title` (String)
   - `content` (String/Rich Text)
   - `author` (String)
4. Create a client in Settings > Clients
5. Note the Client ID and Client Secret
6. Add these to your `.env` file

## Project Structure

- `src/components/` - Reusable React components
- `src/pages/` - Page components for routing
- `src/services/` - Squidex API integration
- `src/contexts/` - React context providers
- `src/styles/` - CSS styles with A4 page design

## Design Features

- **A4 Page Layout**: 210mm × 297mm with shadow effects
- **Black & White Theme**: Pure monochromatic design
- **Typography**: Times New Roman for document-like appearance
- **Responsive**: Adapts to different screen sizes
- **Print Ready**: Optimized for printing

## Built by Pradhyuman