# ChiaOS

ChiaOS is Chia Yuen Kai's personal career operating system: a clean original setup landing page that unlocks into an activated system portfolio for development skill, creativity, vibe coding, project proof, and career identity.

Live site: https://chiaos-portfolio.vercel.app/

GitHub repo: https://github.com/Yoriichi-0u0/chiaos-portfolio

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Three.js
- React Three Fiber
- Drei
- npm
- Vercel deployment target

## Routes

- `/` is the Original Setup landing page: clean CV summary, key skills preview, featured mission preview, CV download, and Activate ChiaOS action.
- `/system` is the Activated ChiaOS System: scroll-guided 3D System Director, activation sequence, identity, education, operations, mission files, skill system, Life OS, career timeline, build logs, roadmap, local Ask ChiaOS assistant, and command palette.
- ChiaOS versioning follows Chia's live age in the frontend, using a major age version and minor progress through the current age year.

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
- `src/lib/version.ts` contains the dynamic ChiaOS age/version calculation.
- `src/hooks/useActiveSection.ts` drives the `/system` scroll-guided director state.
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

Production URL:

```text
https://chiaos-portfolio.vercel.app/
```

Optional CLI path:

```bash
npm install -g vercel
vercel
vercel --prod
```

## Notes

- The Original Setup route is the clean CV landing page.
- The Activated ChiaOS System route is the full creative development experience.
- Ask ChiaOS uses only local site data in v1 and does not call external APIs.
- Replace all items in `TODO_PLACEHOLDERS.md` before treating the public site as final.
