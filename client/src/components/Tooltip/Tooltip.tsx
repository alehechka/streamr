import { FC } from 'react';
import styled from 'styled-components';

const TooltipWrapper = styled.div`
	cursor: pointer;
`;
const TooltipBox = styled.div`
	position: absolute;
	top: calc(100% + 10px);
	left: -95px;
	visibility: hidden;
	color: transparent;
	background-color: transparent;
	width: 150px;
	padding: 5px 5px;
	border-radius: 4px;
	transition: visibility 0.5s, color 0.5s, background-color 0.5s, width 0.5s, padding 0.5s ease-in-out;
`;
const TooltipCard = styled.div`
	position: relative;
	& ${TooltipWrapper}:hover + ${TooltipBox} {
		visibility: visible;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.8);
		width: 230px;
		padding: 8px 8px;
		&:before {
			border-color: transparent transparent rgba(0, 0, 0, 0.8) rgba(0, 0, 0, 0.8);
		}
	}
`;

interface TooltipProps {
	text?: string;
}

const Tooltip: FC<TooltipProps> = ({ children, text }) => (
	<TooltipCard>
		<TooltipWrapper>{children}</TooltipWrapper>
		<TooltipBox>{text}</TooltipBox>
	</TooltipCard>
);

export default Tooltip;
