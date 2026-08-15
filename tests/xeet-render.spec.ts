import { expect, test } from '@wordpress/e2e-test-utils-playwright';
import { canvasRoot } from './helpers';

test.beforeEach(async ({ requestUtils }) => {
	await requestUtils.login();
});

test('Renders a tweet when a valid URL is pasted', async ({
	page,
	admin,
	editor,
}) => {
	await admin.createNewPost({ title: 'Render test' });
	await editor.insertBlock({ name: 'kevinbatdorf/xeet-wp' });
	const CANVAS = await canvasRoot(page, editor);

	// Type a tweet URL into the placeholder input
	const input = CANVAS.getByPlaceholder('Enter URL to embed here...');
	await input.fill('https://x.com/jack/status/20');

	// Wait for the tweet to render — the NoTweet placeholder disappears
	// and the xeet data renders inside the block
	const block = CANVAS.locator('[data-type="kevinbatdorf/xeet-wp"]');
	await expect(block.locator('.react-tweet-theme')).toBeVisible({
		timeout: 30000,
	});

	// Verify tweet text content is present
	await expect(block.getByText('just setting up my twttr')).toBeVisible();
});

test('Shows placeholder when block is inserted without a tweet', async ({
	admin,
	editor,
}) => {
	await admin.createNewPost({ title: 'Empty test' });
	await editor.insertBlock({ name: 'kevinbatdorf/xeet-wp' });

	await expect(
		editor.canvas
			.getByLabel('Block: Xeet')
			.getByText('Paste a link to the Xeet URL'),
	).toBeVisible();
});

test('Block handles missing tweet entity fields without crashing', async ({
	admin,
	page,
	editor,
}) => {
	// Simulate the bug from PR #30: tweet data where entities arrays are absent.
	// enrichTweet() iterates over tweet.entities.hashtags etc. with for...of,
	// throwing "TypeError: r is not iterable" when they are undefined.
	// Fetch the real tweet then strip entity arrays so the data shape is valid.
	await page.route('**/react-tweet.vercel.app/**', async (route) => {
		const response = await route.fetch();
		const body = await response.json();
		if (body?.data?.entities) {
			body.data.entities = {};
		}
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify(body),
		});
	});

	await admin.createNewPost({ title: 'Missing entities test' });
	await editor.insertBlock({ name: 'kevinbatdorf/xeet-wp' });
	const CANVAS = await canvasRoot(page, editor);

	const input = CANVAS.getByPlaceholder('Enter URL to embed here...');
	await input.fill('https://x.com/jack/status/20');

	const block = CANVAS.locator('[data-type="kevinbatdorf/xeet-wp"]');
	await expect(block.locator('.react-tweet-theme')).toBeVisible({
		timeout: 15000,
	});
});

test('Block renders a tweet that contains a quoted tweet', async ({
	admin,
	page,
	editor,
}) => {
	await page.route('**/react-tweet.vercel.app/**', async (route) => {
		const response = await route.fetch();
		const body = await response.json();
		if (body?.data) {
			body.data.quoted_tweet = {
				...body.data,
				id_str: '999',
				text: 'this is the quoted tweet',
				entities: {
					hashtags: [],
					user_mentions: [],
					urls: [],
					symbols: [],
				},
			};
		}
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify(body),
		});
	});

	await admin.createNewPost({ title: 'Quoted tweet test' });
	await editor.insertBlock({ name: 'kevinbatdorf/xeet-wp' });
	const CANVAS = await canvasRoot(page, editor);

	const input = CANVAS.getByPlaceholder('Enter URL to embed here...');
	await input.fill('https://x.com/jack/status/20');

	const block = CANVAS.locator('[data-type="kevinbatdorf/xeet-wp"]');
	await expect(block.locator('.react-tweet-theme')).toBeVisible({
		timeout: 15000,
	});
});

test('Block renders a tweet with an empty media array without crashing', async ({
	admin,
	page,
	editor,
}) => {
	// Bug: safeEnrichTweet setting entities.media = [] causes fixRange inside
	// enrichTweet to crash — it checks `if (tweet.entities.media)` which passes
	// for a truthy empty array, then accesses media[0].indices on undefined.
	await page.route('**/react-tweet.vercel.app/**', async (route) => {
		const response = await route.fetch();
		const body = await response.json();
		if (body?.data?.entities) {
			body.data.entities = { ...body.data.entities, media: [] };
		}
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify(body),
		});
	});

	await admin.createNewPost({ title: 'Empty media test' });
	await editor.insertBlock({ name: 'kevinbatdorf/xeet-wp' });
	const CANVAS = await canvasRoot(page, editor);

	const input = CANVAS.getByPlaceholder('Enter URL to embed here...');
	await input.fill('https://x.com/jack/status/20');

	const block = CANVAS.locator('[data-type="kevinbatdorf/xeet-wp"]');
	await expect(block.locator('.react-tweet-theme')).toBeVisible({
		timeout: 15000,
	});
});

test('Invalid input does not clear the field', async ({
	page,
	admin,
	editor,
}) => {
	await admin.createNewPost({ title: 'Invalid input test' });
	await editor.insertBlock({ name: 'kevinbatdorf/xeet-wp' });
	const CANVAS = await canvasRoot(page, editor);

	const input = CANVAS.getByPlaceholder('Enter URL to embed here...');
	await input.fill('not-a-valid-url');

	// Field should still have the typed value
	await expect(input).toHaveValue('not-a-valid-url');

	// Block should still show the placeholder, not a tweet
	await expect(
		editor.canvas
			.getByLabel('Block: Xeet')
			.getByText('Paste a link to the Xeet URL'),
	).toBeVisible();
});
