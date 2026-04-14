# Lama Dev School Management Dashboard

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

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Lama Dev Youtube Channel](https://youtube.com/lamadev) 
- [Next.js](https://nextjs.org/learn)

## Email Notifications (SMTP)

This app can send real email notifications on validation events using SMTP (Nodemailer). Configure the following environment variables:

```
# SMTP server (use Outlook/Office365 or Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# System sender credentials (use an app password if using Gmail)
SMTP_USER=lorniotmarcel@gmail.com
SMTP_PASS=your-app-password

# Optional overrides
FROM_EMAIL=lorniotmarcel@gmail.com
FROM_NAME=Application Navette
```

Notes:
- For Gmail, you must generate an App Password and use it for `SMTP_PASS`.
- For Outlook/Office 365, use `SMTP_HOST=smtp.office365.com`, `SMTP_PORT=587`, `SMTP_SECURE=false` with your mailbox credentials.
- The notification sender defaults to `lorniotmarcel@gmail.com` unless `FROM_EMAIL` is provided.