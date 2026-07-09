# Booky

Booky is a library web application built with Next.js, React, TypeScript,
Tailwind CSS, and shadcn/ui.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available routes:

- `/` — user home
- `/login` — login
- `/register` — registration
- `/admin` — admin dashboard

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   ├── (user)/
│   └── (admin)/
├── assets/
│   ├── icons/
│   ├── images/
│   └── logos/
├── components/
│   ├── auth/
│   └── ui/
├── lib/
└── types/
```

Route groups organize pages without changing their URL. Shared application
components live in `components`, imported source assets live in `assets`, and
files that must be served directly by URL belong in the root `public` folder.

## Conventions

- Use TypeScript for application code.
- Use lowercase kebab-case for asset and component filenames.
- Put reusable primitives in `components/ui`.
- Put feature-specific shared components in their feature folder.
- Do not create empty folders for features that do not exist yet.
