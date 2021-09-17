import { FC } from 'react';
import StyledBackdrop from './backdrop.styled';

interface BackdropProps {
	onClick?: VoidFunction;
}

const Backdrop: FC<BackdropProps> = ({ children, onClick }) => {
	return (
		<StyledBackdrop onClick={onClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			{children}
		</StyledBackdrop>
	);
};

export default Backdrop;
