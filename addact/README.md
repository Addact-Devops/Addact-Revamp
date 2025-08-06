This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Export All Blog list in excel please use below command:

npx tsx scripts/exportBlogsToExcel.ts

## Update Redirection

Add your redirects rule in below file. this file contains source and destination column. `(DONT Change Name of columns)`
`public/redirects.xlxs`

After updating run this command and it will update `redirect.js`
`node generateRedirects.js`
