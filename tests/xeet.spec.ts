import { expect, test } from '@wordpress/e2e-test-utils-playwright';
import { canvasRoot } from './helpers';

test.beforeEach(async ({ requestUtils }) => {
	await requestUtils.login();
});

test('Plugin is active and block is registered', async ({
	page,
	admin,
	editor,
}) => {
	await admin.createNewPost({ title: 'Test post' });
	await editor.insertBlock({ name: 'kevinbatdorf/xeet-wp' });
	const CANVAS = await canvasRoot(page, editor);
	await expect(
		CANVAS.locator('[data-type="kevinbatdorf/xeet-wp"]'),
	).toBeVisible();
});
