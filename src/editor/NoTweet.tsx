import { Placeholder, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import type { Attributes } from '..';
import { xIcon } from '../icons';
import { extractTwitterId } from '../util';

type NoTweetProps = {
	attributes: Attributes;
	setAttributes: (attributes: Attributes) => void;
};
export const NoTweet = ({ attributes, setAttributes }: NoTweetProps) => {
	const [inputValue, setInputValue] = useState(attributes.xeetId || '');
	const [error, setError] = useState('');

	return (
		<div className="xeet-wp-editor">
			<Placeholder
				icon={xIcon}
				label={'Share a Xeet'}
				instructions={__(
					'Paste a link to the Xeet URL you want to display on your site.',
					'xeet-wp',
				)}
			>
				<TextControl
					__nextHasNoMarginBottom
					label={__('Xeet (or Tweet) ID', 'xeet-wp')}
					placeholder={__('Enter URL to embed here...', 'xeet-wp')}
					className="w-full"
					onChange={(value) => {
						setInputValue(value);
						setError('');
						const xeetId = extractTwitterId(value);
						if (xeetId) {
							setAttributes({ xeetId });
						}
					}}
					onKeyDown={(e: React.KeyboardEvent) => {
						if (e.key === 'Enter') {
							const xeetId = extractTwitterId(inputValue);
							if (xeetId) {
								setAttributes({ xeetId });
							} else if (inputValue.trim()) {
								setError(
									__('Could not find a valid Xeet ID.', 'xeet-wp'),
								);
							}
						}
					}}
					value={inputValue}
				/>
				{error && <p className="text-red-500">{error}</p>}
			</Placeholder>
		</div>
	);
};
