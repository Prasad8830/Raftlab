# Public APIs Hub

A modern, responsive web application that helps developers discover and explore public APIs. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🔍 **Search & Filter** - Search APIs by name and filter by category, authentication type, and HTTPS support
- 📱 **Responsive Design** - Fully responsive interface that works seamlessly on desktop, tablet, and mobile devices
- 🌓 **Dark Mode** - Built-in dark mode support for comfortable viewing
- ⚡ **Client-Side Filtering** - Instant filtering without page reloads
- 🔗 **URL Persistence** - Filter selections are saved in URL for easy sharing
- 📊 **API Details** - View detailed information about each API
- 🎨 **Modern UI** - Clean, intuitive interface with Tailwind CSS styling

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with dark mode support
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useMemo)
- **Package Manager**: npm/yarn

## Project Structure

```
raftlab-frontend/
├── src/
│   ├── app/
│   │   ├── apis/
│   │   │   ├── page.tsx          # Main APIs listing page with filters
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual API detail page
│   │   ├── about/
│   │   │   └── page.tsx          # About page
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Navigation header with hamburger menu
│   │   │   └── Footer.tsx        # Footer with links and social
│   │   └── ui/
│   │       ├── APICard.tsx       # API card component
│   │       ├── APIList.tsx       # Main list with filtering logic
│   │       ├── Badge.tsx         # Badge component for tags
│   │       ├── Button.tsx        # Reusable button component
│   │       ├── FilterSidebar.tsx # Filter sidebar with checkboxes
│   │       └── SearchBar.tsx     # Search input component
│   ├── lib/
│   │   ├── api-data.ts          # API data access functions
│   │   └── utils.ts             # Utility functions
│   └── types/
│       └── api.ts               # TypeScript interfaces
├── data/
│   └── apis.json                # API data source
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── eslint.config.mjs
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd raftlab-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Filtering APIs

1. Navigate to the **APIs** page from the navigation bar
2. Use the **filter sidebar** (desktop) or **floating filter button** (mobile) to:
   - Select categories
   - Choose authentication types
   - Filter by HTTPS support
3. Click **"Show All APIs"** to clear all filters
4. Use the **search bar** to search by API name

### Viewing API Details

Click on any API card to view:
- Full API description
- Base URL
- Authentication details
- HTTPS support status
- Category information

## Features in Detail

### Responsive Design

- **Desktop**: Full sidebar with filters visible
- **Tablet**: Adjustable sidebar layout
- **Mobile**: Floating chevron button to open filter drawer

### URL-Based Filter Persistence

Filters are encoded in the URL, allowing you to:
- Share filtered API lists with others
- Bookmark specific filter combinations
- Navigate back to previous filter states

### Search Integration

- Real-time search across all APIs
- Search results update instantly
- Search works alongside filters for precise results

## API Data Structure

APIs are stored in `data/apis.json` with the following structure:

```json
{
  "id": "unique-id",
  "name": "API Name",
  "description": "Brief description",
  "slug": "api-name",
  "baseUrl": "https://api.example.com",
  "category": "Category Name",
  "authType": "Auth Type",
  "httpsSupport": true,
  "documentation": "https://docs.example.com"
}
```

## Customization

### Adding New Filters

1. Edit [src/components/ui/FilterSidebar.tsx](src/components/ui/FilterSidebar.tsx)
2. Add new filter buttons and handlers
3. Update the filtering logic in [src/components/ui/APIList.tsx](src/components/ui/APIList.tsx)

### Modifying Styles

- Global styles: [src/app/globals.css](src/app/globals.css)
- Component-specific: Use Tailwind classes directly in components
- Dark mode: Automatically supported with `dark:` prefix

## Resources
- [Public APIs Repository](https://github.com/public-apis/public-apis)
