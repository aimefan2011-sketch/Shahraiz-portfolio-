# Shahraiz Ahmad - Portfolio

A modern, AI-powered portfolio website built with Next.js, React, and Tailwind CSS.

## Features

- Responsive design with smooth animations
- AI-powered chat assistant (Gemini API)
- Dark theme with glassmorphism effects
- Project showcase with case studies
- Skills, certifications, and achievements sections
- Contact form

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI Components:** shadcn/ui
- **Database:** Supabase (optional)
- **AI:** Google Gemini (optional)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. (Optional) Add your API keys to `.env`:
   - `GEMINI_API_KEY` - For AI assistant functionality
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` - For database features

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/chat/           # AI chat API route
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── sections/           # Page sections
│   └── ui/                 # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and data
├── public/                 # Static assets
│   └── certificates/       # Certification images
└── tailwind.config.ts      # Tailwind configuration
```

## License

MIT
