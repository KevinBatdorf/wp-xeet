import { expect, test } from '@wordpress/e2e-test-utils-playwright';

test.beforeEach(async ({ requestUtils }) => {
	await requestUtils.login();
});

test('Renders a tweet when a valid URL is pasted', async ({
	admin,
	page,
	editor,
}) => {
	await admin.createNewPost({ title: 'Render test' });
	await editor.insertBlock({ name: 'kevinbatdorf/xeet-wp' });

	// Type a tweet URL into the placeholder input
	const input = page.getByPlaceholder('Enter URL to embed here...');
	await input.fill('https://x.com/jack/status/20');

	// Wait for the tweet to render — the NoTweet placeholder disappears
	// and the xeet data renders inside the block
	const block = page.locator('[data-type="kevinbatdorf/xeet-wp"]');
	await expect(block.locator('.react-tweet-theme')).toBeVisible({
		timeout: 30000,
	});

	// Verify tweet text content is present
	await expect(block.getByText('just setting up my twttr')).toBeVisible();
});

test('Shows placeholder when block is inserted without a tweet', async ({
	admin,
	page,
	editor,
}) => {
	await admin.createNewPost({ title: 'Empty test' });
	await editor.insertBlock({ name: 'kevinbatdorf/xeet-wp' });

	await expect(
		page.getByLabel('Block: Xeet').getByText('Paste a link to the Xeet URL'),
	).toBeVisible();
});

test('Invalid input does not clear the field', async ({
	admin,
	page,
	editor,
}) => {
	await admin.createNewPost({ title: 'Invalid input test' });
	await editor.insertBlock({ name: 'kevinbatdorf/xeet-wp' });

	const input = page.getByPlaceholder('Enter URL to embed here...');
	await input.fill('not-a-valid-url');

	// Field should still have the typed value
	await expect(input).toHaveValue('not-a-valid-url');

	// Block should still show the placeholder, not a tweet
	await expect(
		page.getByLabel('Block: Xeet').getByText('Paste a link to the Xeet URL'),
	).toBeVisible();
});
