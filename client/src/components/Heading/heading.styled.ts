import { FontFamilyMixin } from 'components/Text';
import styled from 'styled-components';

const Heading = styled.div`
	${FontFamilyMixin}
	font-size: 24px;
	font-weight: bold;
	color: darkgrey;
`;

export default Heading;
