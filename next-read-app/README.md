# NexRead

NexRead is a futuristic library web application built with Next.js, React,
TypeScript, Tailwind CSS, and shadcn/ui. The current app focuses on the user
book discovery flow: browsing recommended books, filtering the book list,
searching books, and opening author-specific book pages.

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui components
- lucide-react icons
- React Hook Form for auth form handling
- Local mock data for books and authors

## Current Features

- Authentication pages for login and registration.
- Shared user header with NexRead logo, search form, cart action,
  notification action, profile action, and dark/light theme toggle.
- Header search redirects to `/book-list?search=...` and filters books by
  title, author, or category.
- Home page sections:
  - Hero section
  - Book categories
  - Recommended for you
  - Popular authors
  - Shared footer
- Book category cards link to filtered Book List views using search params.
- Book List page with:
  - Category filtering
  - Rating filtering
  - Search query filtering
  - Shared book card styling
- Popular Authors cards link to author detail pages.
- Author detail page shows author summary and books by selected author.
- Mock author data includes author id, name, book count, borrow count, rating,
  and avatar asset.
- Mock book data includes title, author, category, rating, and cover gradient.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Main Routes

- `/` - user home page
- `/login` - login page
- `/register` - registration page
- `/book-list` - book list page
- `/book-list?category=Fiction` - book list filtered by category
- `/book-list?rating=4` - book list filtered by rating group
- `/book-list?search=white%20fang` - book list filtered by search query
- `/authors/[id]` - books by selected author
- `/admin/dashboard` - admin dashboard placeholder
- `/admin/books` - admin books placeholder
- `/admin/authors` - admin authors placeholder
- `/admin/categories` - admin categories placeholder
- `/admin/loans` - admin loans placeholder
- `/admin/reports` - admin reports placeholder
- `/admin/reviews` - admin reviews placeholder
- `/admin/settings` - admin settings placeholder
- `/admin/users` - admin users placeholder

## Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   ├── (user)/
│   ├── admin/
│   └── globals.css
├── assets/
│   ├── icons/
│   ├── images/
│   └── logos/
├── components/
│   ├── home/
│   ├── layout/
│   ├── shared/
│   └── ui/
├── data/
│   ├── mock-authors.ts
│   └── mock-books.ts
├── lib/
├── services/
├── types/
└── utils/
```

## Data Notes

The app currently uses mock data in `src/data`.

- `mock-books.ts` is used by Recommended for You, Book List, search, category
  filters, rating filters, and author book pages.
- `mock-authors.ts` is used by Popular Authors and author detail pages.

When the backend API is ready, these data sources can be replaced with fetchers
or service functions while keeping most UI components intact.

## Styling Notes

- Tailwind CSS 4 is configured through `globals.css`.
- The color palette is exposed through CSS variables and Tailwind theme tokens.
- Reusable UI primitives live in `src/components/ui`.
- Book cards across Recommended for You, Book List, and Author detail pages use
  the same visual properties for consistency.

## Conventions

- Use TypeScript for application code.
- Keep reusable layout components in `components/layout`.
- Keep home-specific sections in `components/home`.
- Keep shared shadcn-style primitives in `components/ui`.
- Put route-specific filtering state in search params when the result should be
  shareable or reload-safe.
- Keep mock data in `src/data` until the backend integration is ready.
