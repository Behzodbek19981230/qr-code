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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# qr-code

## Telegram bot backend

This app can start the Telegram bot automatically when Next starts in Node runtime.

Add these environment variables:

```bash
TELEGRAM_BOT_TOKEN=123456:ABCDEF...
TELEGRAM_BOT_USERNAME=smart_qr_generator_bot
TELEGRAM_APP_URL=https://t.me/smart_qr_generator_bot/smartqr
TELEGRAM_WEBHOOK_SECRET=some-random-secret
TELEGRAM_BOT_MODE=polling
```

With `TELEGRAM_BOT_MODE=polling`, `next dev` and `next start` will launch the bot from the server startup hook.

If you prefer webhook mode in production, keep the `/api/telegram/webhook` route and set the webhook once after deploying the app:

```bash
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://your-domain.com/api/telegram/webhook&secret_token=<YOUR_SECRET>
```

When a user sends `/start`, the bot replies with a button that opens the Telegram app link.
