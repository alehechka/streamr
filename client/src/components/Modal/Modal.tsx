import StyledModal, { ModalHeader, ModalHeaderActions } from './modal.styled';
import Backdrop from 'components/Backdrop';
import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import IconButton from 'components/IconButton';
import { IoMdClose } from 'react-icons/io';
import { dropIn } from './modal.animation';
import Heading from 'components/Heading';

type ModalProps = {
	/** Callback likely used to close modal when overlay is clicked. */
	onOverlayClick?: VoidFunction;
	isOpen: boolean;
	/** Renders a modal header with the label provided. */
	label?: string;
	/** Renders a modal header with close IconButton that triggers callback when pressed. */
	onExit?: VoidFunction;
};

const Modal: FC<ModalProps> = ({ children, onOverlayClick, isOpen, label, onExit }) => {
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
									<ModalHeaderActions>
										<IconButton onClick={onExit}>
											<IoMdClose size={20} />
										</IconButton>
									</ModalHeaderActions>
								)}
							</ModalHeader>
						)}
						{children}
					</StyledModal>
				</Backdrop>
			)}
		</AnimatePresence>
	);
};

export default Modal;
