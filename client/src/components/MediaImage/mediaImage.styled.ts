import { MediaType } from 'api/media';
import { FontFamilyMixin } from 'components/Text';
import styled from 'styled-components';

export const MediaImageWrapper = styled.div``;

export const StyledMediaImage = styled.div<{ src: string; mediaType: MediaType }>`
	position: relative;
	cursor: pointer;
	height: 50%;
	width: 100%;
	background-size: cover;
	background-repeat: no-repeat;
	background-image: url(${({ src }) => src});
	background-position: 75% 50%;

	&:before,
	:after {
		position: absolute;
		opacity: 0;
		transition: all 1s;
		-webkit-transition: all 1s;
	}

	&:before {
		content: '';
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	&:after {
		content: ${({ mediaType }) => `'${mediaType}'`};
		color: white;
		font-size: 10vw;
		${FontFamilyMixin}
		top: 50%;
		transform: translateY(-50%);
		left: 5%;
	}

	&:hover:before,
	:hover:after {
		opacity: 1;
	}
`;

export const MediaImagesWrapper = styled.div`
	height: 100%;
	overflow: hidden;
`;
