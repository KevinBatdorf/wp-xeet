import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	BaseControl,
	TextControl,
	Button,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import type { Attributes } from '..';
import './editor.css';
import type { EnrichedTweet } from 'react-tweet';
import { enrichTweet, useTweet } from 'react-tweet';
import { useCallback, useEffect, useState } from '@wordpress/element';
import { extractTwitterId } from '../util';

interface ControlProps {
	attributes: Attributes;
	setAttributes: (attributes: Attributes) => void;
}
export const Settings = ({ attributes, setAttributes }: ControlProps) => {
	const { data, isLoading, error } = useTweet(attributes.xeetId);
	const [hasChanges, setHasChanges] = useState(false);
	const [isError, setIsError] = useState(false);
	const showUpdateButton = hasChanges && data && !error && !isLoading;

	const updateXeet = useCallback(
		(xeetData: EnrichedTweet) => {
			setAttributes({ xeetData });
			setHasChanges(false);
		},
		[setAttributes],
	);

	useEffect(() => {
		if (isLoading) return;
		if (!data || error) {
			setIsError(true);
			// Only reset this on 404 as other errors I don't think should
			// mess with the Tweet data (api is offline, etc)
			if (error.status === 404) setAttributes({ xeetData: undefined });
			return setAttributes({ xeetId: undefined });
		}

		// If the xeet has not yet been set, set it.
		const xeetData = enrichTweet(data);
		if (!attributes.xeetData) return updateXeet(xeetData);

		// if the id doesn't match ours, update the xeet
		if (attributes.xeetData.id_str !== attributes.xeetId) {
			return updateXeet(xeetData);
		}

		// Otherwise, check if the xeet has changed and show update button
		const changed =
			JSON.stringify(xeetData) !== JSON.stringify(attributes.xeetData);
		setHasChanges(changed);
	}, [
		data,
		error,
		isLoading,
		setAttributes,
		attributes.xeetData,
		attributes.xeetId,
		updateXeet,
	]);

	return (
		<InspectorControls>
			<PanelBody initialOpen={false} title={__('Settings', 'xeet-wp')}>
				<BaseControl id="xeet-settings">
					<div className="xeet-wp-editor">
						<TextControl
							label={__('Xeet ID', 'xeet-wp')}
							className={error ? 'text-red-500' : undefined}
							help={__(
								'Paste a Xeet/Tweet URL or ID.',
								'xeet-wp',
							)}
							value={attributes.xeetId ?? ''}
							onChange={(maybeId) => {
								setAttributes({ xeetData: undefined });
								const xeetId = extractTwitterId(maybeId);
								setAttributes({ xeetId });
								setIsError(false);
							}}
						/>
						{isError && (
							<p className="text-red-500">
								{__('Error loading tweet.', 'xeet-wp')}
							</p>
						)}
						{showUpdateButton && (
							<>
								<p>{__('Data change detected.', 'xeet-wp')}</p>
								<Button
									variant="secondary"
									onClick={() => {
										const xeetData = enrichTweet(data);
										updateXeet(xeetData);
									}}>
									{__('Update data', 'xeet-wp')}
								</Button>
							</>
						)}
					</div>
				</BaseControl>
			</PanelBody>
			<PanelBody
				title={__('Theme Override', 'xeet-wp')}
				initialOpen={false}>
				<BaseControl id="xeet-theme">
					<div className="xeet-wp-editor">
						<SelectControl
							label={__('Theme', 'xeet-wp')}
							value={attributes.theme}
							options={[
								{ label: __('Auto', 'xeet-wp'), value: 'auto' },
								{
									label: __('Light', 'xeet-wp'),
									value: 'light',
								},
								{ label: __('Dark', 'xeet-wp'), value: 'dark' },
							]}
							onChange={(theme) => {
								if (theme === 'auto') {
									return setAttributes({ theme: undefined });
								}
								setAttributes({
									theme: theme as 'light' | 'dark',
								});
							}}
						/>
						<p className="bg-gray-200 p-3">
							{__(
								"By default, the Xeet block will detect the user's system preferences and apply a light or dark theme. See plugin readme for more info on how to override this.",
								'xeet-wp',
							)}
						</p>
					</div>
				</BaseControl>
			</PanelBody>
		</InspectorControls>
	);
};
