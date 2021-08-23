import styled from 'styled-components';

type DomainSpec = {
	main: string;
	hover: string;
	disabled: string;
};

const domains = ['primary', 'danger'] as const;
type Domain = typeof domains[number];

const domainSpecs: Record<Domain, DomainSpec> = {
	primary: {
		main: 'DodgerBlue',
		hover: 'RoyalBlue',
		disabled: '#a6c2ed',
	},
	danger: {
		main: '#eb4026',
		hover: '#a82916',
		disabled: '#e87d6d',
	},
} as const;

interface IconButtonProps {
	domain?: Domain;
}

const IconButton = styled.button<IconButtonProps>`
	background-color: ${({ domain = 'primary' }) => domainSpecs[domain].main};
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
		background-color: ${({ domain = 'primary' }) => domainSpecs[domain].hover};
	}

	&:disabled {
		background-color: ${({ domain = 'primary' }) => domainSpecs[domain].disabled};
		cursor: not-allowed;
	}
`;

export default IconButton;
