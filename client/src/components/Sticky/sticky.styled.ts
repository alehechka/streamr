import { CSSProperties } from 'react';
import styled from 'styled-components';

interface StickyProps {
	top?: CSSProperties['top'];
	bottom?: CSSProperties['bottom'];
	left?: CSSProperties['left'];
	right?: CSSProperties['right'];
}

const Sticky = styled.div<StickyProps>`
	position: absolute;
	bottom: ${({ bottom }) => bottom};
	right: ${({ right }) => right};
	top: ${({ top }) => top};
	left: ${({ left }) => left};
`;

export default Sticky;
