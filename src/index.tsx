import { useBlockProps as blockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import blockConfig from './block.json';
import { Settings } from './editor/Settings';
import type { EnrichedTweet } from 'react-tweet';
import { Xeet } from './front/Xeet';
import { NoTweet } from './editor/NoTweet';
import { xIcon } from './icons';

export type Attributes = {
	xeetId?: string;
	xeetData?: EnrichedTweet;
	theme?: 'light' | 'dark';
};

registerBlockType<Attributes>('kevinbatdorf/xeet-wp', {
	...blockConfig,
	icon: xIcon,
	attributes: {
		xeetId: { type: 'string' },
		xeetData: { type: 'object' },
		theme: { type: 'string', default: undefined },
	},
	title: __('Xeet', 'xeet-wp'),
	edit: ({ attributes, setAttributes }) => {
		const { xeetData, theme } = attributes;
		return (
			<>
				<Settings
					attributes={attributes}
					setAttributes={setAttributes}
				/>
				<div
					{...blockProps({ className: 'xeet-wp-editor xeet-wp' })}
					data-theme={theme}>
					{xeetData ? null : (
						<NoTweet
							attributes={attributes}
							setAttributes={setAttributes}
						/>
					)}
					<div className="pointer-events-none">
						{xeetData && <Xeet xeet={xeetData} />}
					</div>
				</div>
			</>
		);
	},
	save: ({ attributes }) => {
		const { theme, xeetData } = attributes;
		return (
			<div
				{...blockProps.save({
					className: 'xeet-wp',
				})}
				data-theme={theme}>
				{xeetData && <Xeet xeet={xeetData} />}
			</div>
		);
	},
});
