import { FC } from 'react';
import ReactDOM from 'react-dom';
import StyledBackdrop from './backdrop.styled';

interface BackdropProps {
	onClick?: VoidFunction;
}

const Backdrop: FC<BackdropProps> = ({ children, onClick }) => {
	return ReactDOM.createPortal(
		<StyledBackdrop onClick={onClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			{children}
		</StyledBackdrop>,
		document.body
	);
};

export default Backdrop;
