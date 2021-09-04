import { Domain, domainSpecs } from 'components/Colors';
import { ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';

interface StyledCheckboxProps {
	domain?: Domain;
}

const StyledCheckbox = styled.input.attrs<Omit<StyledCheckboxProps, 'type'>>({ type: 'checkbox' })<StyledCheckboxProps>`
	accent-color: ${({ domain = 'primary' }) => domainSpecs[domain].main};

	&:disabled {
		accent-color: ${({ domain = 'primary' }) => domainSpecs[domain].disabled};
		cursor: not-allowed;
	}
`;

interface CheckboxProps extends StyledCheckboxProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	disabled?: boolean;
}

const Checkbox = ({ onChange, ...props }: CheckboxProps) => {
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			return onChange(e.target.checked);
		},
		[onChange]
	);

	return <StyledCheckbox {...props} onChange={handleChange} />;
};

export default Checkbox;
