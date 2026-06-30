export const TELEGRAM_BOT_USERNAME = process.env.TELEGRAM_BOT_USERNAME ?? 'qrcodeer_bot';

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? '';

export const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET ?? '';

export const TELEGRAM_APP_URL = process.env.TELEGRAM_APP_URL ?? 't.me/qrcodeer_bot/app';

export const TELEGRAM_BOT_MODE = process.env.TELEGRAM_BOT_MODE ?? 'polling';

export type TelegramUpdate = {
	message?: {
		chat?: {
			id?: number | string;
		};
		text?: string;
	};
};

export function buildStartKeyboard() {
	return {
		inline_keyboard: [
			[
				{
					text: '🚀 Appni ochish',
					url: TELEGRAM_APP_URL,
				},
			],
		],
	};
}

export function buildStartMessage() {
	return [
		`👋 <b>Xush kelibsiz!</b>`,
		`${TELEGRAM_BOT_USERNAME} orqali QR app tayyor.`,
		`Pastdagi tugmani bossangiz, app darhol ochiladi.`,
	].join('\n');
}

export function isStartCommand(update: TelegramUpdate) {
	return update.message?.text?.trim().startsWith('/start') ?? false;
}
