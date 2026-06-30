import { NextResponse } from 'next/server';
import {
	TELEGRAM_BOT_TOKEN,
	TELEGRAM_BOT_USERNAME,
	buildStartKeyboard,
	isStartCommand,
	TELEGRAM_WEBHOOK_SECRET,
	type TelegramUpdate,
} from '@/lib/telegram';

export const runtime = 'nodejs';

async function sendTelegramMessage(chatId: number | string, text: string) {
	if (!TELEGRAM_BOT_TOKEN) {
		return false;
	}

	const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			chat_id: chatId,
			text,
			reply_markup: buildStartKeyboard(),
		}),
	});

	return response.ok;
}

export async function POST(request: Request) {
	if (TELEGRAM_WEBHOOK_SECRET) {
		const secret = request.headers.get('x-telegram-bot-api-secret-token');

		if (secret !== TELEGRAM_WEBHOOK_SECRET) {
			return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
		}
	}

	let update: TelegramUpdate;

	try {
		update = (await request.json()) as TelegramUpdate;
	} catch {
		return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
	}

	if (!isStartCommand(update)) {
		return NextResponse.json({ ok: true });
	}

	const chatId = update.message?.chat?.id;

	if (!chatId) {
		return NextResponse.json({ ok: false, error: 'Missing chat id' }, { status: 400 });
	}

	const message =
		`Salom! ${TELEGRAM_BOT_USERNAME} botiga xush kelibsiz. ` + 'Appni ochish uchun pastdagi knopkani bosing.';

	const sent = await sendTelegramMessage(chatId, message);

	return NextResponse.json({ ok: true, sent });
}
