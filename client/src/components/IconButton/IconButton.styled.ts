import { Domain, domainSpecs } from 'components/Colors';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export interface StyledIconButtonProps {
	domain?: Domain;
	pending?: boolean;
}

const IconButton = styled(motion.button)<StyledIconButtonProps>`
	background-color: ${({ domain = 'default' }) => domainSpecs[domain].main};
	color: white;
	border: none;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 10px;

	cursor: pointer;
	border-radius: 50%;

	&:hover,
	:focus {
		background-color: ${({ domain = 'default' }) => domainSpecs[domain].hover};
		outline: none;
	}

	&:disabled {
		background-color: ${({ domain = 'default' }) => domainSpecs[domain].disabled};
		cursor: ${({ pending }) => (pending ? 'progress' : 'not-allowed')};
	}
`;

export default IconButton;
