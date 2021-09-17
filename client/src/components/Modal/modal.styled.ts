import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

const StyledModal = styled(motion.div)`
	width: clamp(50%, 700px, 90%);
	height: min-content(50%, 300px);
	background: white;

	margin: auto;
	padding: 0 2rem;
	border-radius: 12px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const dropIn: Variants = {
	hidden: {
		y: '-100vh',
		opacity: 0,
	},
	visible: {
		y: '0',
		opacity: 1,
		transition: {
			duration: 0.1,
			type: 'spring',
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		y: '100vh',
		opacity: 0,
	},
};

export default StyledModal;
