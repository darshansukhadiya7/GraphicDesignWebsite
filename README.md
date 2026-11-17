# A&M Graphic Designers Website

A premium React + Vite static website for A&M Graphic Designers, an Ahmedabad-based creative agency offering brand identity, web design, packaging, social media, and printing services.

## Features

- High-end premium creative agency design system
- Sticky transparent navigation with mobile menu
- Animated hero with a creative-workspace photo composition
- Services, portfolio, process, industries, and contact sections
- Centered section labels and headings
- Compact service and portfolio grids with six-item previews and load-more controls
- Animated service and project detail modals
- Industry photography, hover states, and a horizontal-to-vertical process timeline
- Contact inquiries sent to the configured email through FormSubmit, with visitor email as Reply-To
- WhatsApp enquiry link
- SEO metadata, robots.txt, sitemap.xml, and structured data
- Framer Motion and custom CSS animation system

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Firebase Hosting deployment

1. Install the Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in:
   ```bash
   firebase login
   ```
3. Initialize Firebase in the project root:
   ```bash
   firebase init hosting
   ```
4. Set the public directory to `dist`.
5. Configure the site and deploy:
   ```bash
   firebase deploy
   ```

The first FormSubmit submission may require confirming the activation email sent to the configured inbox.

## Project structure

```text
src/
  components/
  data/
  styles/
  App.jsx
  main.jsx
public/
  robots.txt
  sitemap.xml
  favicon.svg
```
