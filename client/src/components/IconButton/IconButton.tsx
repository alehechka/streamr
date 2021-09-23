import { FC } from 'react';
import StyledIconButton, { StyledIconButtonProps } from './IconButton.styled';

interface IconButtonProps extends StyledIconButtonProps {
	onClick?: VoidFunction;
	disabled?: boolean;
}

const IconButton: FC<IconButtonProps> = (props) => {
	return (
		<StyledIconButton
			{...props}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			disabled={props.disabled || props.pending}
		/>
	);
};

export default IconButton;
