# ChiaOS

ChiaOS is Chia Yuen Kai's personal career operating system: a dual-mode portfolio for AI, cybersecurity, cloud architecture, software systems, project proof, and career direction.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- npm
- Vercel deployment target

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run lint
npm run build
```

## Project Structure

- `src/app/` contains the App Router entrypoints and global styles.
- `src/components/` contains layout, command palette, cards, and section components.
- `src/data/` contains typed local portfolio content.
- `src/lib/assistant.ts` contains the local Ask ChiaOS matching logic.
- `src/types/portfolio.ts` contains shared content types.
- `public/cv/` contains the placeholder CV path.

## GitHub Repository Setup

The dedicated repository should be named `chiaos-portfolio`.

```bash
git status --short --branch
git add .
git commit -m "Build ChiaOS portfolio v1"
gh repo create chiaos-portfolio --public --source=. --remote=origin --push
```

## Vercel Deployment

Recommended path:

1. Import the GitHub repository `Yoriichi-0u0/chiaos-portfolio` into Vercel.
2. Keep the default Next.js framework preset.
3. Use `npm install` as the install command.
4. Use `npm run build` as the build command.
5. Deploy from the `main` branch.
6. Replace placeholder URLs after the production deployment succeeds.

Optional CLI path:

```bash
npm install -g vercel
vercel
vercel --prod
```

## Notes

- Builder Mode is the default high-energy view.
- Signal Mode is the clean recruiter-friendly view.
- Mode preference is stored in `localStorage`.
- Ask ChiaOS uses only local site data in v1 and does not call external APIs.
- Replace all items in `TODO_PLACEHOLDERS.md` before treating the public site as final.
