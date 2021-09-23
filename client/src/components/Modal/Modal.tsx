import StyledModal, { ModalHeader, ModalActions, ModalFooter } from './modal.styled';
import Backdrop from 'components/Backdrop';
import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import IconButton from 'components/IconButton';
import { IoMdClose } from 'react-icons/io';
import { dropIn } from './modal.animation';
import Heading from 'components/Heading';
import Button from 'components/Button';
import { OptionalInGroup } from '@wedgekit/types';
import { IconType } from 'react-icons';
import { Domain } from 'components/Colors';

type ModalProps = {
	/** Callback likely used to close modal when overlay is clicked. */
	onOverlayClick?: VoidFunction;
	isOpen: boolean;
	/** Renders a modal header with the label provided. */
	label?: string;
} & ConfirmProps &
	CancelProps &
	ExitProps;

type ConfirmProps = OptionalInGroup<{
	/** Renders a modal footer with a confirmation button. Callback expected to handle closing modal. */
	onConfirm: VoidFunction;
	/** Optionally changes the text in the confirmation button */
	confirmLabel?: string;
	confirmDomain?: Domain;
}>;

type CancelProps = OptionalInGroup<{
	/** Renders a modal footer with a cancel button. Callback expected to handle closing modal. */
	onCancel: VoidFunction;
	/** Optionally changes the text in the confirmation button */
	cancelLabel?: string;
	cancelDomain?: Domain;
}>;

type ExitProps = OptionalInGroup<{
	/** Renders a modal header with close IconButton that triggers callback when pressed. */
	onExit: VoidFunction;
	/** Optionally change the icon display in the exit IconButton */
	exitIcon?: IconType;
	exitDomain?: Domain;
}>;

const Modal: FC<ModalProps> = ({
	children,
	onOverlayClick,
	isOpen,
	label,
	onExit,
	exitIcon: ExitIcon = () => <IoMdClose size={20} />,
	onConfirm,
	confirmLabel,
	onCancel,
	cancelLabel,
}) => {
	return (
		<AnimatePresence initial={false} exitBeforeEnter={true}>
			{isOpen && (
				<Backdrop onClick={onOverlayClick}>
					<StyledModal
						onClick={(e) => e.stopPropagation()}
						variants={dropIn}
						initial='hidden'
						animate='visible'
						exit='exit'
					>
						{(label || onExit) && (
							<ModalHeader>
								{label && <Heading>{label}</Heading>}
								{onExit && (
									<ModalActions>
										<IconButton onClick={onExit} domain='white'>
											<ExitIcon />
										</IconButton>
									</ModalActions>
								)}
							</ModalHeader>
						)}
						{children}
						{(onConfirm || onCancel) && (
							<ModalFooter>
								<ModalActions>
									{onCancel && <Button onClick={onCancel}>{cancelLabel || 'Cancel'}</Button>}
									{onConfirm && <Button onClick={onConfirm}>{confirmLabel || 'Confirm'}</Button>}
								</ModalActions>
							</ModalFooter>
						)}
					</StyledModal>
				</Backdrop>
			)}
		</AnimatePresence>
	);
};

export default Modal;
