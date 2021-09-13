export type DomainSpec = {
	main: string;
	hover: string;
	disabled: string;
};

export const domains = ['primary', 'danger', 'default'] as const;
export type Domain = typeof domains[number];

export const domainSpecs: Record<Domain, DomainSpec> = {
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
	default: {
		main: '#abaaa7',
		hover: '#757472',
		disabled: '#d1d0cd',
	},
} as const;
