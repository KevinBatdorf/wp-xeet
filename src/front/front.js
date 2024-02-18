import copy from 'copy-to-clipboard';

const xeet = '.xeet-wp';
const copyUrlButtonClass = '[data-xeet-url-to-copy]:not(.xeet-copy-added)';
const handleCopyButton = () => {
	document.querySelectorAll(copyUrlButtonClass).forEach((el) => {
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
const handlePlayButton = () => {
	const xeetPlay = document.querySelectorAll(
		`${xeet} .xeet-video-button:not(.xeet-play-added)`,
	);
	const onPlay = (e) => {
		e.preventDefault();
		const video = e.target;
		video.closest('.xeet-video-container').classList.add('xeet-is-playing');
		video.controls = true;
		video.addEventListener('pause', onPause);
		video.addEventListener('ended', onEnded);
		// Update "watch on" button text
		const wo = '[data-continue-watching-text]';
		const watchOn = video
			.closest('.xeet-video-container')
			.querySelector(wo);
		if (watchOn) {
			watchOn.textContent = watchOn.dataset.continueWatchingText;
		}
		video
			.closest('.xeet-video-container')
			.classList.remove('xeet-is-finished');
	};
	const onPause = (e) => {
		e.preventDefault();
		const video = e.target;
		video
			.closest('.xeet-video-container')
			.classList.remove('xeet-is-playing');
		video.removeEventListener('pause', onPause);
	};
	const onEnded = (e) => {
		e.preventDefault();
		const video = e.target;
		video
			.closest('.xeet-video-container')
			.classList.add('xeet-is-finished');
		video.removeEventListener('ended', onEnded);
	};
	xeetPlay.forEach((el) => {
		el.classList.add('xeet-play-added');
		el.addEventListener('click', (e) => {
			e.preventDefault();
			const video = el
				.closest('.xeet-video-container')
				.querySelector('video');

			el.remove();
			video.play();
			video.focus();
			video.addEventListener('play', onPlay);
		});
	});
};

const init = () => {
	handleCopyButton();
	handlePlayButton();
};
// Functions are idempotent, so we can run them on load, DOMContentLoaded, et al.
init();
// Useful for when the DOM is modified or loaded in late
window.wpXeetInit = init;
window.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', init);
