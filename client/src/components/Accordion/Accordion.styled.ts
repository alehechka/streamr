import styled from 'styled-components';

export const Wrap = styled.div<{ active?: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	text-align: center;
	cursor: pointer;
	background-color: ${({ active }) => (active ? '#ccc' : '#eee')};
	padding: 18px;
	border: none;
	outline: none;
	transition: 0.4s;

	&:hover {
		background-color: #ccc;
	}
`;

export const Dropdown = styled.div<{ isOpen: boolean }>`
	padding: 0 18px;
	background-color: white;
	overflow: hidden;
`;
