import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledBackdrop = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: #000000e1;

	display: flex;
	justify-content: center;
	align-items: center;
	overflow-y: hidden;
`;

export default StyledBackdrop;
