export const TELEGRAM_BOT_USERNAME = process.env.TELEGRAM_BOT_USERNAME ?? 'smart_qr_generator_bot';

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? '';

export const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET ?? '';

export const TELEGRAM_APP_URL = process.env.TELEGRAM_APP_URL ?? 'https://t.me/smart_qr_generator_bot/smartqr';

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
					text: 'Appni ochish',
					url: TELEGRAM_APP_URL,
				},
			],
		],
	};
}

export function isStartCommand(update: TelegramUpdate) {
	return update.message?.text?.trim().startsWith('/start') ?? false;
}
