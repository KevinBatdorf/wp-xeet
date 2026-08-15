import type { Page } from '@playwright/test';
import type { Editor } from '@wordpress/e2e-test-utils-playwright';

const BLOCK = '[data-type="kevinbatdorf/xeet-wp"]';

// Trunk renders blocks inside the canvas iframe and stable does not, and the
// iframe element exists either way, so ask which root actually holds the block.
export const canvasRoot = async (page: Page, editor: Editor) => {
	const inFrame = await editor.canvas
		.locator(BLOCK)
		.count()
		.catch(() => 0);
	return inFrame > 0 ? editor.canvas : page;
};
