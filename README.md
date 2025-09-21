# Software Development Tree Visualization

An interactive Next.js/TypeScript web application that visualizes software development roles and specializations in a beautiful tree structure using D3.js.

## Features

- **Interactive Tree Visualization**: Built with react-d3-tree for smooth, interactive tree navigation
- **Dark/Light Mode Toggle**: Seamless theme switching with next-themes
- **Search & Filter**: Real-time search functionality to filter nodes by name
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Node Details Sidebar**: Click on any node to view detailed information
- **Modern UI**: Clean, minimal design with Tailwind CSS and subtle animations
- **Expandable/Collapsible Nodes**: Click on category nodes to expand or collapse their children

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: react-d3-tree (D3.js-based)
- **Theme Management**: next-themes
- **Icons**: Lucide React
- **Fonts**: System UI fonts for optimal performance

## Data Structure

The application visualizes a comprehensive tree of software development roles organized by categories:

- **Frontend Development**: React, Vue.js, Angular developers, UI/UX designers
- **Backend Development**: API, Node.js, Python, Java, C#, PHP developers
- **Mobile Development**: iOS, Android, React Native, Flutter developers
- **DevOps & Infrastructure**: Cloud architects, SREs, platform engineers
- **Data & Analytics**: Data scientists, ML engineers, BI developers
- **Quality Assurance**: QA engineers, automation testers, security testers
- **Product & Management**: Product managers, Scrum masters, engineering managers
- **Security**: Security engineers, cybersecurity specialists, penetration testers

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd copilot-benchmark
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Explore the Tree**: The tree starts with "Software Development" as the root node
2. **Expand Categories**: Click on blue category nodes to expand/collapse their children
3. **View Details**: Click on any node to see details in the sidebar
4. **Search**: Use the search bar to filter nodes by name (e.g., "React", "Python")
5. **Toggle Theme**: Click the theme toggle button to switch between light and dark modes
6. **Zoom & Pan**: Use mouse wheel to zoom and drag to pan around the tree

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles and theme variables
├── components/
│   ├── theme-provider.tsx  # Theme context provider
│   ├── theme-toggle.tsx    # Dark/light mode toggle button
│   ├── search-filter.tsx   # Search input component
│   └── tree-visualization.tsx # Main D3 tree component
├── lib/
│   └── tree-filter.ts      # Tree filtering utility functions
└── public/
    └── data/
        └── software-development-tree.json # Tree data structure
```

## Customization

### Adding New Roles or Categories

Edit the JSON file at `public/data/software-development-tree.json` to add new categories or job roles:

```json
{
  "name": "Software Development",
  "children": [
    {
      "name": "New Category",
      "children": [
        { "name": "New Role 1" },
        { "name": "New Role 2" }
      ]
    }
  ]
}
```

### Styling

The application uses Tailwind CSS for styling. Key design principles:

- **Minimal & Clean**: Simple, uncluttered interface
- **Modern Typography**: System UI fonts for best readability
- **Ample Whitespace**: Generous spacing for visual breathing room
- **Subtle Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

### Theme Customization

Modify the theme colors in `src/app/globals.css` and the tree node colors in `src/components/tree-visualization.tsx`.

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 14+

## Performance

- Static generation for optimal loading times
- Dynamic imports for D3 components to reduce initial bundle size
- Efficient tree filtering algorithms
- Responsive image optimization

## License

MIT License - feel free to use this project for your own tree visualization needs!
