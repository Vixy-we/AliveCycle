# AliveCycle Prototype

This is the prototype landing page for AliveCycle, a decentralized environmental infrastructure service. The application is built using React (via Vite) and Tailwind CSS.

## Getting Started Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run the development server**:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173/` to view the project.

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, custom CSS animations
- **Icons**: Lucide React

## Deployment (Vercel)

This project is optimized for deployment on [Vercel](https://vercel.com). Because it uses Vite, Vercel will automatically detect the build settings, but here are the general steps:

1. Push your code to a GitHub repository (e.g. `https://github.com/Vixy-we/AliveCycle.git`).
2. Log into [Vercel](https://vercel.com/) and click **Add New...** -> **Project**.
3. Import your `AliveCycle` GitHub repository.
4. Vercel will automatically detect Vite and set the following build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your site will be live in less than a minute!
