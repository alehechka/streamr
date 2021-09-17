import StyledModal, { dropIn } from './modal.styled';
import Backdrop from 'components/Backdrop';
import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';

interface ModalProps {
	onClose: VoidFunction;
	isOpen: boolean;
	/** Disables backdrop from closing modal. */
	lockOverlayClick?: boolean;
}

const Modal: FC<ModalProps> = ({ children, onClose, isOpen, lockOverlayClick }) => {
	return (
		<AnimatePresence initial={false} exitBeforeEnter={true}>
			{isOpen && (
				<Backdrop onClick={lockOverlayClick ? undefined : onClose}>
					<StyledModal
						onClick={(e) => e.stopPropagation()}
						variants={dropIn}
						initial='hidden'
						animate='visible'
						exit='exit'
					>
						{children}
					</StyledModal>
				</Backdrop>
			)}
		</AnimatePresence>
	);
};

export default Modal;
