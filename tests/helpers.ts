import type { Page } from '@playwright/test';
import type { Editor } from '@wordpress/e2e-test-utils-playwright';

// editor.canvas is always the iframe, which trunk has and stable does not
export const canvasRoot = async (page: Page, editor: Editor) =>
	(await page.locator('[name="editor-canvas"]').count()) > 0
		? editor.canvas
		: page;
