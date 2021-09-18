import IconButton from 'components/IconButton';
import Sticky from 'components/Sticky';
import { FC } from 'react';

interface StickyButtonProps {
	onClick?: VoidFunction;
}

const StickyButton: FC<StickyButtonProps> = ({ onClick, children }) => {
	return (
		<Sticky right='10%' bottom='10%'>
			<IconButton domain='primary' onClick={onClick}>
				{children}
			</IconButton>
		</Sticky>
	);
};

export default StickyButton;
