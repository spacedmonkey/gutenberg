/**
 * External dependencies
 */
import { castArray } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Toolbar,
	DropdownMenu,
	DropdownMenuSeparator,
	MenuItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { shortcuts } from '../block-editor-keyboard-shortcuts';
import BlockActions from '../block-actions';
import BlockModeToggle from './block-mode-toggle';
import BlockHTMLConvertButton from './block-html-convert-button';
import BlockUnknownConvertButton from './block-unknown-convert-button';
import __experimentalBlockSettingsMenuFirstItem from './block-settings-menu-first-item';
import __experimentalBlockSettingsMenuPluginsExtension from './block-settings-menu-plugins-extension';

const getButtonLabel = ( isOpen ) => isOpen ? __( 'Hide options' ) : __( 'More options' );

export function BlockSettingsMenu( { clientIds } ) {
	const blockClientIds = castArray( clientIds );
	const count = blockClientIds.length;
	const firstBlockClientId = blockClientIds[ 0 ];

	return (
		<BlockActions clientIds={ clientIds }>
			{ ( { onDuplicate, onRemove, onInsertAfter, onInsertBefore, canDuplicate, isLocked } ) => (
				<Toolbar>
					<DropdownMenu
						icon="ellipsis"
						label={ getButtonLabel }
						position="bottom right"
						className="block-editor-block-settings-menu"
					>
						{ ( { onClose } ) => (
							<>
								<__experimentalBlockSettingsMenuFirstItem.Slot
									fillProps={ { onClose } }
								/>
								{ count === 1 && (
									<BlockUnknownConvertButton
										clientId={ firstBlockClientId }
									/>
								) }
								{ count === 1 && (
									<BlockHTMLConvertButton
										clientId={ firstBlockClientId }
									/>
								) }
								{ ! isLocked && canDuplicate && (
									<MenuItem
										onClick={ onDuplicate }
										icon="admin-page"
										shortcut={ shortcuts.duplicate.display }
									>
										{ __( 'Duplicate' ) }
									</MenuItem>
								) }
								{ ! isLocked && (
									<>
										<MenuItem
											onClick={ onInsertBefore }
											icon="insert-before"
											shortcut={ shortcuts.insertBefore.display }
										>
											{ __( 'Insert Before' ) }
										</MenuItem>
										<MenuItem
											onClick={ onInsertAfter }
											icon="insert-after"
											shortcut={ shortcuts.insertAfter.display }
										>
											{ __( 'Insert After' ) }
										</MenuItem>
									</>
								) }
								{ count === 1 && (
									<BlockModeToggle
										clientId={ firstBlockClientId }
										onToggle={ onClose }
									/>
								) }
								<__experimentalBlockSettingsMenuPluginsExtension.Slot
									fillProps={ { clientIds, onClose } }
								/>
								<DropdownMenuSeparator />
								{ ! isLocked && (
									<MenuItem
										onClick={ onRemove }
										icon="trash"
										shortcut={ shortcuts.removeBlock.display }
									>
										{ __( 'Remove Block' ) }
									</MenuItem>
								) }
							</>
						) }
					</DropdownMenu>
				</Toolbar>
			) }
		</BlockActions>
	);
}

export default BlockSettingsMenu;
