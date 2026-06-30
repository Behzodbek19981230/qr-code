import {
	buildStartKeyboard,
	buildStartMessage,
	isStartCommand,
	TELEGRAM_BOT_MODE,
	TELEGRAM_BOT_TOKEN,
} from '@/lib/telegram';

type TelegramUpdate = {
	update_id?: number;
	message?: {
		chat?: {
			id?: number | string;
		};
		text?: string;
	};
};

type PollerState = {
	started: boolean;
	stopped: boolean;
	offset: number;
};

declare global {
	var __telegramPollerState: PollerState | undefined;
}

const POLL_TIMEOUT_MS = 25_000;
const RETRY_DELAY_MS = 5_000;
const REQUEST_TIMEOUT_MS = 30_000;

function getBotApiUrl(method: string) {
	return `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}`;
}

async function sendTelegramMessage(
	chatId: number | string,
	text: string,
	options?: { parseMode?: 'HTML' | 'MarkdownV2' },
) {
	const response = await fetch(getBotApiUrl('sendMessage'), {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			chat_id: chatId,
			text,
			parse_mode: options?.parseMode,
			reply_markup: buildStartKeyboard(),
		}),
	});

	if (!response.ok) {
		const details = await response.text().catch(() => '');
		throw new Error(`Telegram sendMessage failed: ${response.status} ${details}`);
	}
}

async function deleteWebhook() {
	const response = await fetch(getBotApiUrl('deleteWebhook'), {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({ drop_pending_updates: false }),
	});

	if (!response.ok) {
		const details = await response.text().catch(() => '');
		throw new Error(`Telegram deleteWebhook failed: ${response.status} ${details}`);
	}
}

async function getUpdates(offset: number) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

	const response = await fetch(
		`${getBotApiUrl('getUpdates')}?offset=${offset}&timeout=${Math.floor(POLL_TIMEOUT_MS / 1000)}`,
		{
			method: 'GET',
			signal: controller.signal,
		},
	);

	clearTimeout(timeoutId);

	if (!response.ok) {
		const details = await response.text().catch(() => '');
		throw new Error(`Telegram getUpdates failed: ${response.status} ${details}`);
	}

	const payload = (await response.json()) as {
		ok: boolean;
		result?: TelegramUpdate[];
	};

	return payload.result ?? [];
}

async function handleUpdate(update: TelegramUpdate) {
	if (!isStartCommand(update)) {
		return;
	}

	const chatId = update.message?.chat?.id;

	if (!chatId) {
		return;
	}

	await sendTelegramMessage(chatId, buildStartMessage(), { parseMode: 'HTML' });
}

async function runPollingLoop(state: PollerState) {
	let retryDelay = RETRY_DELAY_MS;

	while (!state.stopped) {
		try {
			const updates = await getUpdates(state.offset);
			retryDelay = RETRY_DELAY_MS;

			for (const update of updates) {
				if (typeof update.update_id === 'number') {
					state.offset = update.update_id + 1;
				}

				await handleUpdate(update);
			}
		} catch (error) {
			console.error('[telegram-bot] polling failed', error);
			await new Promise((resolve) => setTimeout(resolve, retryDelay));
			retryDelay = Math.min(retryDelay * 2, 60_000);
		}
	}
}

export async function startTelegramBot() {
	if (!TELEGRAM_BOT_TOKEN) {
		return;
	}

	if (TELEGRAM_BOT_MODE !== 'polling') {
		return;
	}

	if (globalThis.__telegramPollerState?.started) {
		return;
	}

	const state = globalThis.__telegramPollerState ?? {
		started: false,
		stopped: false,
		offset: 0,
	};

	state.started = true;
	globalThis.__telegramPollerState = state;

	await deleteWebhook().catch((error) => {
		console.error('[telegram-bot] unable to delete webhook', error);
	});

	void runPollingLoop(state);
}
