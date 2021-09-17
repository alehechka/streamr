import { useToggle } from '@alehechka/react-hooks';
import { ReactNode } from 'react';
import { FC } from 'react';
import { Dropdown, dropIn, Wrap } from './Accordion.styled';
import { BsChevronDown } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
	label: ReactNode;
}

const Accordion: FC<Props> = ({ label, children }) => {
	const [isOpen, toggleOpen] = useToggle();

	return (
		<>
			<Wrap onClick={toggleOpen} initial={false} animate={{ backgroundColor: isOpen ? '#ccc' : '#eee' }}>
				{label}
				<motion.span initial={false} animate={{ scaleY: isOpen ? -1 : 1 }}>
					<BsChevronDown />
				</motion.span>
			</Wrap>
			<AnimatePresence initial={false}>
				{isOpen && (
					<Dropdown
						variants={dropIn}
						initial='collapsed'
						animate='open'
						exit='collapsed'
						transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
					>
						{children}
					</Dropdown>
				)}
			</AnimatePresence>
		</>
	);
};

export default Accordion;
