# File Storage App

A modern, production-ready file storage application built with Next.js and Vercel Blob.

## Features

- **Centralized Blob Operations**: Single source of truth for all Vercel Blob SDK interactions
- **Universal File Support**: Handles images, PDFs, documents, videos, audio, and archives uniformly
- **Reusable Components**: Modular UI components with zero code duplication
- **Dark Mode**: Beautiful, smooth dark mode toggle
- **Type-Safe**: Full TypeScript support with proper interfaces
- **Graceful Degradation**: Mock mode for local development without environment variables

## Tech Stack

- Next.js 14 (App Router)
- Vercel Blob (@vercel/blob)
- Tailwind CSS
- Lucide React (icons)
- next-themes (dark mode)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and add your Vercel Blob token:

```bash
cp .env.local.example .env.local
```

Add your `BLOB_READ_WRITE_TOKEN` from your Vercel project settings.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
file-storage-app/
├── app/
│   ├── actions/
│   │   └── storage.ts              # Centralized Vercel Blob utilities
│   ├── layout.tsx                  # Root layout + ThemeProvider
│   ├── page.tsx                    # Home: file list + upload
│   ├── globals.css                 # Tailwind directives + custom styles
│   └── file/
│       └── [id]/
│           └── page.tsx           # Individual file detail view
│
├── components/
│   ├── ui/
│   │   ├── file-card.tsx           # Reusable file display card
│   │   ├── file-icon.tsx           # Polymorphic icon component
│   │   ├── upload-wrapper.tsx      # Universal upload component
│   │   ├── theme-toggle.tsx        # Dark mode toggle
│   │   └── file-grid.tsx           # Grid layout for files
│   └── layout/
│       └── header.tsx              # App header with navigation
│
├── lib/
│   ├── blob-utils.ts               # Helper functions for blob operations
│   ├── file-types.ts               # File type detection & mapping
│   ├── formatters.ts               # Size, date formatters
│   └── utils.ts                    # Utility functions
│
└── types/
    └── file.ts                     # TypeScript interfaces
```

## Key Components

### Centralized Storage Actions (`app/actions/storage.ts`)

All Vercel Blob operations are centralized in server actions:

- `uploadFile(formData)`: Upload any file type
- `deleteFile(url)`: Delete a file by URL
- `listFiles()`: List all files with metadata

Includes fallback mock mode for local development without `BLOB_READ_WRITE_TOKEN`.

### Polymorphic FileIcon Component

Single component that handles all file types via type discrimination:

```tsx
<FileIcon type="image" />  // Returns image icon
<FileIcon type="pdf" />    // Returns PDF icon
```

### Universal UploadWrapper

Handles all upload scenarios:

- Drag-and-drop support
- Click-to-upload
- File description input
- Progress indicators

## Deployment

This app is designed for Vercel deployment. Simply push to your Vercel repository and it will automatically deploy with Vercel Blob configured.

## License

MIT
