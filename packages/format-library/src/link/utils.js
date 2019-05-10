/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Generates the format object that will be applied to the link text.
 *
 * @param {string}  url              The href of the link.
 * @param {boolean} opensInNewWindow Whether this link will open in a new window.
 * @param {Object}  text             The text that is being hyperlinked.
 *
 * @return {Object} The final format object.
 */
export function createLinkFormat( { url, opensInNewWindow, text } ) {
	const format = {
		type: 'core/link',
		attributes: {
			url,
		},
	};

	if ( opensInNewWindow ) {
		// translators: accessibility label for external links, where the argument is the link text
		const label = sprintf( __( '%s (opens in a new tab)' ), text );

		format.attributes.target = '_blank';
		format.attributes.rel = 'noreferrer noopener';
		format.attributes[ 'aria-label' ] = label;
	}

	return format;
}
