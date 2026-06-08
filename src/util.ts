import { enrichTweet } from 'react-tweet';
import type { EnrichedTweet } from 'react-tweet';

type Tweet = Parameters<typeof enrichTweet>[0];
type TweetEntities = Tweet['entities'];

export const extractTwitterId = (input: string) =>
	/^\d+$/.test(input) ? input : (input.match(/\/status\/(\d+)/) || [])[1];

const sanitizeEntities = (
	entities: Partial<TweetEntities> | null | undefined,
): TweetEntities => ({
	hashtags: entities?.hashtags ?? [],
	urls: entities?.urls ?? [],
	user_mentions: entities?.user_mentions ?? [],
	symbols: entities?.symbols ?? [],
	...(entities?.media?.length && { media: entities.media }),
});

export const safeEnrichTweet = (tweet: Tweet): EnrichedTweet =>
	enrichTweet({
		...tweet,
		entities: sanitizeEntities(tweet.entities),
		...(tweet.quoted_tweet && {
			quoted_tweet: {
				...tweet.quoted_tweet,
				entities: sanitizeEntities(tweet.quoted_tweet.entities),
			},
		}),
	});
