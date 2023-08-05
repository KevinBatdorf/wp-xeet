import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, BaseControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import type { Attributes } from '..';
import './editor.css';

interface ControlProps {
	attributes: Attributes;
	setAttributes: (attributes: Attributes) => void;
}
const extractTwitterId = (input: string) =>
	/^\d+$/.test(input) ? input : (input.match(/\/status\/(\d+)/) || [])[1];

export const Controls = ({ attributes, setAttributes }: ControlProps) => {
	return (
		<InspectorControls>
			<PanelBody title={__('Settings', 'wp-xeet')}>
				<BaseControl id="xeet-stuff">
					<div className="wp-xeet-editor">
						<TextControl
							label={__('Tweet ID', 'wp-xeet')}
							value={attributes.tweetId ?? ''}
							onChange={(maybeId) => {
								const tweetId = extractTwitterId(maybeId);
								setAttributes({ tweetId });
							}}
						/>
					</div>
				</BaseControl>
			</PanelBody>
		</InspectorControls>
	);
};
