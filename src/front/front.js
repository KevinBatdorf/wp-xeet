import copy from 'copy-to-clipboard';

const buttonClass = '[data-xeet-url-to-copy]:not(.xeet-copy-added)';
const handleCopyButton = () => {
	document.querySelectorAll(buttonClass).forEach((el) => {
		el.classList.add('xeet-copy-added');
		el.addEventListener('click', (e) => {
			e.preventDefault();
			copy(el.dataset.xeetUrlToCopy);
			// There are two nested svgs, one is display:none. Swap them
			const toggle = (display) => (display === 'none' ? 'block' : 'none');
			el.querySelectorAll('svg')?.forEach((svg) => {
				svg.style.display = toggle(svg.style.display);
			});
			const textSection = el.querySelector('[data-copy-text]');
			let textPrompts;
			try {
				textPrompts = JSON.parse(textSection.dataset.copyText);
			} catch (e) {
				// Fallback if something goes wrong
				textPrompts = {
					copied: 'Copied!',
					copyAllText: 'Copy link to Tweet',
				};
			}
			textSection.textContent = textPrompts.copied;
			setTimeout(() => {
				el.querySelectorAll('svg')?.forEach((svg) => {
					svg.style.display = toggle(svg.style.display);
				});
				textSection.textContent = textPrompts.copyAllText;
			}, 6000);
		});
	});
};

const init = () => handleCopyButton();
// Functions are idempotent, so we can run them on load, DOMContentLoaded, et al.
init();
// Useful for when the DOM is modified or loaded in late
window.wpXeetInit = init;
window.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', init);
