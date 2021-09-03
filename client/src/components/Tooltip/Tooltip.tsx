import { FC } from 'react';
import styled from 'styled-components';

const ToolTipText = styled('span')({
	visibility: 'hidden',
	width: '120px',
	backgroundColor: '#000',
	color: '#fff',
	textAlign: 'center',
	borderRadius: '6px',
	padding: '5px',
	position: 'absolute',
	zIndex: 1,
	bottom: '150%',
	left: '50%',
	marginLeft: '-60px',
	':after': {
		content: '""',
		position: 'absolute',
		top: '100%',
		left: '50%',
		marginLeft: '-5px',
		borderWidth: '5px',
		borderStyle: 'solid',
		borderColor: 'black transparent transparent transparent',
	},
});

const StyledToolTip = styled('div')({
	position: 'relative',
	display: 'inline-block',
	':hover span': {
		visibility: 'visible',
	},
});

interface TooltipProps {
	text?: string;
}

const Tooltip: FC<TooltipProps> = ({ children, text, ...props }) => (
	<StyledToolTip {...props}>
		{children}
		<ToolTipText>{text}</ToolTipText>
	</StyledToolTip>
);

export default Tooltip;
