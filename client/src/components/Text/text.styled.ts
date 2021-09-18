import styled, { css } from 'styled-components';

export const FontFamilyMixin = css`
	font-family: 'Open Sans', 'Lato', 'Roboto', 'Source Sans Pro', sans-serif;
`;

interface TextProps {
	bold?: boolean;
	italic?: boolean;
}

const Text = styled.p<TextProps>`
	${FontFamilyMixin}
	font-size: 16px;
	color: gray;
	font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
	font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
`;

export default Text;
