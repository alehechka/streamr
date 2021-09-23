import { CSSProperties } from 'styled-components';

export type DomainSpec = {
	main: CSSProperties['backgroundColor'];
	hover: CSSProperties['backgroundColor'];
	disabled: CSSProperties['backgroundColor'];
	color: CSSProperties['color'];
};

export const domains = ['primary', 'danger', 'default', 'white'] as const;
export type Domain = typeof domains[number];

export const domainSpecs: Record<Domain, DomainSpec> = {
	primary: {
		main: 'DodgerBlue',
		hover: 'RoyalBlue',
		disabled: '#a6c2ed',
		color: 'white',
	},
	danger: {
		main: '#eb4026',
		hover: '#a82916',
		disabled: '#e87d6d',
		color: 'white',
	},
	default: {
		main: '#abaaa7',
		hover: '#757472',
		disabled: '#d1d0cd',
		color: 'white',
	},
	white: {
		main: 'white',
		hover: '#ededeb',
		disabled: 'lightgrey',
		color: 'darkgrey',
	},
} as const;
