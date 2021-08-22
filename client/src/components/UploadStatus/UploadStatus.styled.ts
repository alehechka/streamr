import styled from 'styled-components';

export const UploadStatusWrapper = styled.div`
	width: 100%;
	max-width: 150px;
	padding: 0px 10px;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	text-align: center;
`;

export const LoadingBar = styled.div<{ percent?: number }>`
	background-color: green;
	height: 5px;
	width: ${({ percent }) => (percent === undefined ? 0 : percent)}%;
`;
