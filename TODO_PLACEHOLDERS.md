# ChiaOS Placeholder Checklist

## Completed

- GitHub profile link
- GitHub repository link
- Final Vercel URL in README metadata and deployment notes
- Email contact
- LinkedIn profile link
- COS30049 project repository link

## Still Unresolved

Replace these before treating the public site as final:

- **Final CV PDF:**
  - The placeholder PDF has been removed. Every CV button now opens a "Request CV" email, configured in `src/data/cv.ts`.
  - To publish a reviewed PDF, add it under `public/cv/` and point `cv.href` at it.
  - The draft text in `docs/cv/CV_DRAFT_2026-11.md` is public in this repository, so it contains no contact details.
- **Semester stage:** inferred, not confirmed by an official record (see `education.currentStageSource`).

## Resolved 13 November 2026

- **Stage:** Year 3, Semester 1 (5 of 6), Semester 2 2026. Inferred from the progression that began in September 2024.
- **CGPA:** 3.51.
- **Realfun:** role is current.
- **Earth FM:** team BoboMimi, Chia (leader) and Jacy Chiong Yet Suu. Features are credited to the team.
- **FinGence:** Data Ingestion Lead and Integration Contributor.
- **Bird classifier:** individual assignment (AS01).
- **Sarawak Tourism:** supplementary UI/UX prototype, not the graded assessment.
- **Little Orbit:** no ownership claim made.
- **PagePilot:** public case study added from the live site, /privacy, /terms and the README's known limits.
- **COS30018 and COS40007:** public repositories linked.
- **AWS:** internal case study.
- **Database and networking:** described as completed units, with no misleading `#contact` links.
- **Images:**
  - Open Graph and Twitter image: `src/app/opengraph-image.png`, generated from `scripts/og-image.svg`.
  - Screenshots for Earth FM, PagePilot, Sarawak Tourism and Little Orbit are in `public/screenshots/`.

## Still needs Chia

- **Realfun start date:** ChiaOS says May 2023 and the September 2026 CV says May 2024. The site keeps May 2023 until a reliable source settles it.
- **Earth FM:** a feature-by-feature split with Jacy, only if it is documented.
- **Little Orbit:** whether anyone else contributed.
- **COS40007 README:** it shows the student ID. Decide whether to remove it before promoting the link more prominently.
- **Bird classifier demo:** add a Streamlit link only if it works without a sign-in.
- **FinGence:** no public screenshot, because the hosted app requires a sign-in.
- **Placeholder files:** `public/og-placeholder.svg` and `public/favicon.svg` are no longer referenced and can be deleted when convenient.
