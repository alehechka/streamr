import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontFamilyMixin } from 'components/Text';

const StyledButton = styled(motion.button)`
	${FontFamilyMixin}
	text-transform: capitalize;
`;

export default StyledButton;
