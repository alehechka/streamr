import styled from 'styled-components';

export const Wrap = styled.div`
	background: #272727;
	color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	text-align: center;
	cursor: pointer;

	h1 {
		padding: 2rem;
		font-size: 2rem;
	}

	span {
		margin-right: 1.5rem;
	}

	a {
		color: #fff;
	}
`;

export const Dropdown = styled.div`
	background: #1c1c1c;
	color: #00ffb9;
	width: 100%;
	height: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #00ffb9;
	border-top: 1px solid #00ffb9;

	p {
		font-size: 2rem;
	}
`;
