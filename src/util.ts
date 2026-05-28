import { enrichTweet } from 'react-tweet';

export const extractTwitterId = (input: string) =>
	/^\d+$/.test(input) ? input : (input.match(/\/status\/(\d+)/) || [])[1];

export const safeEnrichTweet = (tweet: any): any => {
	if (!tweet) return tweet;
	const safeTweet = { ...tweet };
	if (typeof safeTweet.text !== 'string') {
		safeTweet.text = safeTweet.text || '';
	}
	if (!Array.isArray(safeTweet.display_text_range)) {
		safeTweet.display_text_range = [0, safeTweet.text.length];
	}
	if (!safeTweet.entities) {
		safeTweet.entities = {};
	} else {
		safeTweet.entities = { ...safeTweet.entities };
	}
	const entities = safeTweet.entities;
	if (!Array.isArray(entities.hashtags)) entities.hashtags = [];
	if (!Array.isArray(entities.user_mentions)) entities.user_mentions = [];
	if (!Array.isArray(entities.urls)) entities.urls = [];
	if (!Array.isArray(entities.symbols)) entities.symbols = [];
	if (entities.media && !Array.isArray(entities.media)) {
		entities.media = [];
	}

	if (safeTweet.quoted_tweet) {
		safeTweet.quoted_tweet = safeEnrichTweet(safeTweet.quoted_tweet);
	}
	return enrichTweet(safeTweet);
};

