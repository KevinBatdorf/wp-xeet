import { useBlockProps as blockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import blockConfig from './block.json';
import { Controls } from './editor/Controls';
import { Tweet } from 'react-tweet';

export type Attributes = {
	tweetId: string;
	theme?: 'light' | 'dark';
};

registerBlockType<Attributes>('kevinbatdorf/wp-xeet', {
	...blockConfig,
	icon: undefined,
	attributes: { tweetId: { type: 'string' } },
	title: __('WP Xeet', 'wp-xeet'),
	edit: ({ attributes, setAttributes }) => {
		const { tweetId: id, theme } = attributes;
		return (
			<>
				<Controls
					attributes={attributes}
					setAttributes={setAttributes}
				/>
				<div
					{...blockProps({
						className: 'wp-xeet-editor',
					})}
					data-theme={theme}>
					{id && <Tweet id={id} />}
				</div>
			</>
		);
	},
	save: ({ attributes }) => {
		const { tweetId: id, theme } = attributes;
		if (!id) return null;
		return (
			<div {...blockProps.save()} data-theme={theme}>
				<Tweet id={id} />
			</div>
		);
	},
});
