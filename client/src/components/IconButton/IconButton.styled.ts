import { Domain, domainSpecs } from 'components/Colors';
import styled from 'styled-components';

interface IconButtonProps {
	domain?: Domain;
}

const IconButton = styled.button<IconButtonProps>`
	background-color: ${({ domain = 'default' }) => domainSpecs[domain].main};
	border: none;
	color: white;

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
	}

	&:disabled {
		background-color: ${({ domain = 'default' }) => domainSpecs[domain].disabled};
		cursor: not-allowed;
	}
`;

export default IconButton;
