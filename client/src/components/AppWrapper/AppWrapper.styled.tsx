import { FC } from 'react';
import styled from 'styled-components';

const AppWrapper = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

export const ContentWrapper = styled.div`
	width: 100%;
`;

const FlexWrapper = styled.div`
	width: 100;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const MaxWidthWrapper = styled.div`
	width: 100%;
	max-width: 1200px;
	padding-top: 5%;
`;

export const MaxWidthContentWrapper: FC = ({ children }) => {
	return (
		<FlexWrapper>
			<MaxWidthWrapper>{children}</MaxWidthWrapper>
		</FlexWrapper>
	);
};

export default AppWrapper;
