import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

export const Wrap = styled(motion.header)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	text-align: center;
	cursor: pointer;
	padding: 18px;
	border: none;
	outline: none;
	transition: 0.4s;

	&:hover {
		background-color: #ccc;
	}
`;

export const Dropdown = styled(motion.section)`
	padding: 0 18px;
	background-color: white;
	overflow: hidden;
`;

export const dropIn: Variants = {
	open: { opacity: 1, height: 'auto', scale: 1 },
	collapsed: { opacity: 0, height: 0, scale: 0.8 },
};
