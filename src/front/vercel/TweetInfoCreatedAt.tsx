import { EnrichedTweet } from 'react-tweet';
import s from './tweet-info-created-at.module.css';

export const TweetInfoCreatedAt = ({ tweet }: { tweet: EnrichedTweet }) => {
	const createdAt = new Date(tweet.created_at);
	const currentLocale = navigator.language;

	// Format for current locale.
	const formattedDate = `${createdAt.toLocaleString(currentLocale, {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	})} · ${createdAt.toLocaleDateString(currentLocale, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})}`;

	return (
		<a
			className={s.root}
			href={tweet.url}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={formattedDate}>
			<time dateTime={createdAt.toISOString()}>{formattedDate}</time>
		</a>
	);
};
