<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# PocketUse website

This repo contains the PocketUse marketing site and its Vercel deployment settings.

## Run Locally

**Prerequisites:** Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy to GitHub and Vercel

The repository is already connected to GitHub at `origin` and is ready to import into Vercel.

1. Push your latest changes to GitHub.
2. In Vercel, import the GitHub repository.
3. Use these build settings:
   `npm run build`
   Output directory: `dist`
4. Set environment variables in Vercel if you want the contact form to send email notifications:
   `RESEND_API_KEY`

The site uses React Router, so Vercel rewrites all routes to `index.html` while still preserving the `/premium-apps` redirect.

## Contact Form

The contact form works without email delivery configured. If you add `RESEND_API_KEY`, the serverless function at `api/contact.ts` will send mail through Resend in production.
