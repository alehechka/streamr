import styled from 'styled-components';

interface StyledInputProps {
	invalid?: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
	background-color: ${(props) => (props.invalid ? '#ffdddd' : 'white')};
`;

export default StyledInput;
