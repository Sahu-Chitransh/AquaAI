# Fish Species Classification Web App

A comprehensive web application for fish species identification and classification using AI. This app features a modern, responsive design with a complete catalog of 484 fish species.

## Features

- **Homepage**: Beautiful landing page with app overview and statistics
- **Species Catalog**: Browse through 484 fish species with detailed information
- **Classification**: Upload fish photos for AI-powered species identification
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Search & Filter**: Find species by name, habitat, or other criteria
- **Detailed Species Info**: Comprehensive data including habitat, diet, conservation status, and more

## Fish Species Database

The app includes a comprehensive database of 484 fish species with the following information for each:
- Common and scientific names
- Habitat and geographic distribution
- Size, diet, and temperament
- Conservation status
- Family classification
- Depth range
- Detailed descriptions

## Image Integration

To use your own fish images:

1. Prepare a zip file with fish images
2. Name each image file with the species name (matching the species ID in the database)
3. Place images in the `public/images/fish/` directory
4. Update the `imageUrl` field in `src/data/fishSpecies.ts` to point to your local images

Example:
```typescript
imageUrl: '/images/fish/clownfish.jpg'
```

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for development and building
- **Responsive Design** with mobile-first approach

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Customization

### Adding More Species

To add more species to the catalog:

1. Open `src/data/fishSpecies.ts`
2. Add new species objects to the `fishSpeciesData` array
3. Include all required fields: id, name, scientificName, habitat, size, diet, description, imageUrl, conservation, region, family, depth, temperament

### Integrating Your AI Model

To integrate your trained classification model:

1. Replace the mock classification in `src/pages/ClassifyPage.tsx`
2. Add your model inference logic in the `classifyImage` function
3. Update the confidence calculation and result handling

### Styling Customization

The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Component styles in individual React components
- Global styles in `src/index.css`

## Performance Optimization

- Images are loaded from external CDN (Pexels) for demo purposes
- Consider implementing lazy loading for large species catalogs
- Use image optimization for production deployment
- Implement caching strategies for better performance

## Deployment

The app can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

Build the app with `npm run build` and deploy the `dist` folder.