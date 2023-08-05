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
			<PanelBody initialOpen={false} title={__('Settings', 'wp-xeet')}>
				<BaseControl id="xeet-settings">
					<div className="wp-xeet-editor">
						<TextControl
							label={__('Xeet ID', 'wp-xeet')}
							className={error ? 'text-red-500' : undefined}
							help={__(
								'Paste a Xeet/Tweet URL or ID.',
								'wp-xeet',
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
								{__('Error loading tweet.', 'wp-xeet')}
							</p>
						)}
						{showUpdateButton && (
							<>
								<p>{__('Data change detected.', 'wp-xeet')}</p>
								<Button
									variant="secondary"
									onClick={() => {
										const xeetData = enrichTweet(data);
										updateXeet(xeetData);
									}}>
									{__('Update data', 'wp-xeet')}
								</Button>
							</>
						)}
					</div>
				</BaseControl>
			</PanelBody>
			<PanelBody
				title={__('Theme Override', 'wp-xeet')}
				initialOpen={false}>
				<BaseControl id="xeet-theme">
					<div className="wp-xeet-editor">
						<SelectControl
							label={__('Theme', 'wp-xeet')}
							value={attributes.theme}
							options={[
								{ label: __('Auto', 'wp-xeet'), value: 'auto' },
								{
									label: __('Light', 'wp-xeet'),
									value: 'light',
								},
								{ label: __('Dark', 'wp-xeet'), value: 'dark' },
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
								'wp-xeet',
							)}
						</p>
					</div>
				</BaseControl>
			</PanelBody>
		</InspectorControls>
	);
};
