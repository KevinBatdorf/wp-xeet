import {
	type EnrichedTweet,
	// TweetActions,
	TweetBody,
	TweetContainer,
	TweetHeader,
	TweetInReplyTo,
	// TweetInfo,
	// TweetMedia,
	TweetReplies,
} from 'react-tweet';
import './style.css';
import { TweetActions } from './vercel/TweetActions';
import { TweetInfo } from './vercel/TweetInfo';
import { TweetMedia } from './vercel/TweetMedia';

export const Xeet = ({ xeet }: { xeet: EnrichedTweet }) => {
	return (
		<TweetContainer>
			<TweetHeader tweet={xeet} />
			{xeet.in_reply_to_status_id_str && <TweetInReplyTo tweet={xeet} />}
			<TweetBody tweet={xeet} />
			{xeet.mediaDetails?.length ? <TweetMedia tweet={xeet} /> : null}
			<TweetInfo tweet={xeet} />
			<TweetActions tweet={xeet} />
			<TweetReplies tweet={xeet} />
		</TweetContainer>
	);
};
