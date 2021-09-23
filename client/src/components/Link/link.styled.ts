import { FontFamilyMixin } from 'components/Text';
import styled from 'styled-components';
import { Link } from 'wouter';

const StyledLink = styled(Link)`
	${FontFamilyMixin}
`;

export default StyledLink;
