'use client';

import clsx from 'clsx';
import type { MediaAnimatedGif, MediaVideo } from 'react-tweet/api';
import {
	EnrichedQuotedTweet,
	type EnrichedTweet,
	getMediaUrl,
	getMp4Video,
} from 'react-tweet';
import mediaStyles from './tweet-media.module.css';
import s from './tweet-media-video.module.css';
import { __ } from '@wordpress/i18n';

type Props = {
	tweet: EnrichedTweet | EnrichedQuotedTweet;
	media: MediaAnimatedGif | MediaVideo;
};

export const TweetMediaVideo = ({ tweet, media }: Props) => {
	// const [playButton, setPlayButton] = useState(true);
	// const [isPlaying, setIsPlaying] = useState(false);
	// const [ended, setEnded] = useState(false);
	const mp4Video = getMp4Video(media);

	return (
		<>
			<video
				className={mediaStyles.image}
				poster={getMediaUrl(media, 'small')}
				controls={false}
				muted
				preload="metadata"
				tabIndex={-1}
				onPlay={() => undefined}
				onPause={() => undefined}
				onEnded={() => undefined}>
				<source src={mp4Video.url} type={mp4Video.content_type} />
			</video>

			<button
				type="button"
				className={s.videoButton + ' ' + 'xeet-video-button'}
				aria-label={__('View video on Twitter', 'xeet-wp')}
				onClick={() => undefined}>
				<svg
					viewBox="0 0 24 24"
					className={s.videoButtonIcon}
					aria-hidden="true">
					<g>
						<path d="M21 12L4 2v20l17-10z"></path>
					</g>
				</svg>
			</button>

			<div className={s.watchOnTwitter}>
				<a
					href={tweet.url}
					className={s.anchor + ' xeet-watch-link'}
					target="_blank"
					data-continue-watching-text={__(
						'Continue watching on Twitter',
						'xeet-wp',
					)}
					rel="noopener noreferrer">
					{__('Watch on Twitter', 'xeet-wp')}
				</a>
			</div>

			<a
				href={tweet.url}
				className={clsx(s.anchor, s.viewReplies, 'xeet-view-replies')}
				// todo:
				// 1. when video ends then show this
				// 2. if they press play after it ends then hide this
				// alow for unlimited loop
				target="_blank"
				rel="noopener noreferrer">
				{__('View replies', 'xeet-wp')}
			</a>
		</>
	);
};
