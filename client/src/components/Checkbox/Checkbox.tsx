import { Domain, domainSpecs } from 'components/Colors/Domains';
import Tooltip from 'components/Tooltip';
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
	tooltip?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	disabled?: boolean;
}

const Checkbox = ({ tooltip, onChange, ...props }: CheckboxProps) => {
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			return onChange(e.target.checked);
		},
		[onChange]
	);

	if (tooltip) {
		return (
			<Tooltip text={tooltip}>
				<StyledCheckbox {...props} onChange={handleChange} />
			</Tooltip>
		);
	}

	return <StyledCheckbox {...props} onChange={handleChange} />;
};

export default Checkbox;
