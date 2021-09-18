import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

const StyledModal = styled(motion.div)`
	max-width: min(700px, 90%);
	height: min(50%, 300px);
	background: white;

	margin: auto;
	padding: 0 20px;
	border-radius: 12px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ModalHeader = styled.div`
	width: 100%;
	padding: 25px 0;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const ModalHeaderActions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-left: 20px;
	margin-left: auto;
`;

export default StyledModal;
