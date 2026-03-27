import { expect, test } from '@wordpress/e2e-test-utils-playwright';

test.beforeEach(async ({ requestUtils }) => {
	await requestUtils.login();
});

test('Plugin is active and block is registered', async ({
	admin,
	page,
	editor,
}) => {
	await admin.createNewPost({ title: 'Test post' });
	await editor.insertBlock({ name: 'kevinbatdorf/xeet-wp' });
	await expect(
		page.locator('[data-type="kevinbatdorf/xeet-wp"]'),
	).toBeVisible();
});
