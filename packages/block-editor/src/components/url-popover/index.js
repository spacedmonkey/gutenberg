/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
	ExternalLink,
	IconButton,
	Popover,
} from '@wordpress/components';
import { prependHTTP, safeDecodeURI, filterURLForDisplay } from '@wordpress/url';

/**
 * Internal dependencies
 */
import URLInput from '../url-input';
import { isValidHref } from './utils';

class URLPopover extends Component {
	constructor() {
		super( ...arguments );

		this.toggleSettingsVisibility = this.toggleSettingsVisibility.bind( this );

		this.state = {
			isSettingsExpanded: false,
		};
	}

	toggleSettingsVisibility() {
		this.setState( {
			isSettingsExpanded: ! this.state.isSettingsExpanded,
		} );
	}

	render() {
		const {
			children,
			renderSettings,
			position = 'bottom center',
			focusOnMount = 'firstElement',
			...popoverProps
		} = this.props;

		const {
			isSettingsExpanded,
		} = this.state;

		const showSettings = !! renderSettings && isSettingsExpanded;

		return (
			<Popover
				className="editor-url-popover block-editor-url-popover"
				focusOnMount={ focusOnMount }
				position={ position }
				{ ...popoverProps }
			>
				<div className="editor-url-popover__row block-editor-url-popover__row">
					{ children }
					{ !! renderSettings && (
						<IconButton
							className="editor-url-popover__settings-toggle block-editor-url-popover__settings-toggle"
							icon="arrow-down-alt2"
							label={ __( 'Link Settings' ) }
							onClick={ this.toggleSettingsVisibility }
							aria-expanded={ isSettingsExpanded }
						/>
					) }
				</div>
				{ showSettings && (
					<div className="editor-url-popover__row block-editor-url-popover__row editor-url-popover__settings block-editor-url-popover__settings">
						{ renderSettings() }
					</div>
				) }
			</Popover>
		);
	}
}

const LinkEditor = ( {
	autocompleteRef,
	className,
	emptySuggestions,
	onChangeInputValue,
	value,
	...props
} ) => (
	<form
		className={ classnames(
			'block-editor-url-popover__link-editor',
			className
		) }
		{ ...props }
	>
		<URLInput
			value={ value }
			onChange={ onChangeInputValue }
			autocompleteRef={ autocompleteRef }
			emptySuggestions={ emptySuggestions }
		/>
		<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
	</form>
);

URLPopover.LinkEditor = LinkEditor;

const LinkViewerUrl = ( { url, urlLabel, className } ) => {
	const prependedURL = prependHTTP( url );
	const linkClassName = classnames(
		className,
		{ 'has-invalid-link': ! isValidHref( prependedURL ) },
		'block-editor-url-popover__link-viewer-url'
	);

	if ( ! url ) {
		return <span className={ linkClassName }></span>;
	}

	return (
		<ExternalLink
			className={ linkClassName }
			href={ url }
		>
			{ urlLabel || filterURLForDisplay( safeDecodeURI( url ) ) }
		</ExternalLink>
	);
};

const LinkViewer = ( { className, url, urlLabel, editLink, ...props } ) => {
	return (
		<div
			className={ classnames(
				'block-editor-url-popover__link-viewer',
				className
			) }
			{ ...props }
		>
			<LinkViewerUrl url={ url } urlLabel={ urlLabel } />
			<IconButton icon="edit" label={ __( 'Edit' ) } onClick={ editLink } />
		</div>
	);
};

URLPopover.LinkViewer = LinkViewer;

/**
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/url-popover/README.md
 */
export default URLPopover;
