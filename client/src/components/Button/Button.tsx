import { Domain } from 'components/Colors';
import { FC } from 'react';
import StyledButton from './button.styled';

interface ButtonProps {
	onClick?: VoidFunction;
	domain?: Domain;
}

const Button: FC<ButtonProps> = (props) => {
	return <StyledButton {...props} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />;
};

export default Button;
