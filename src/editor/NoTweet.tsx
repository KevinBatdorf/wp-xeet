import { Placeholder, TextControl } from '@wordpress/components';
import { xIcon } from '../icons';
import { Attributes } from '..';
import { __ } from '@wordpress/i18n';
import { extractTwitterId } from '../util';

type NoTweetProps = {
	attributes: Attributes;
	setAttributes: (attributes: Attributes) => void;
};
export const NoTweet = ({ attributes, setAttributes }: NoTweetProps) => {
	return (
		<div className="xeet-editor">
			<Placeholder
				icon={xIcon}
				label={'Share a Xeet'}
				instructions={__(
					'Paste a link to the Xeet URL you want to display on your site.',
					'xeet',
				)}>
				<TextControl
					__nextHasNoMarginBottom
					label={__('Xeet (or Tweet) ID', 'xeet')}
					placeholder={__('Enter URL to embed here...', 'xeet')}
					className="w-full"
					onChange={(maybeId) => {
						const xeetId = extractTwitterId(maybeId);
						setAttributes({ xeetId });
					}}
					value={attributes.xeetId || ''}
				/>
			</Placeholder>
		</div>
	);
};
