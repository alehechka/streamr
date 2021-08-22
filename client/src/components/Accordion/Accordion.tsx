import { useToggle } from '@alehechka/react-hooks';
import { ReactNode } from 'react';
import { FC } from 'react';
import { Dropdown, Wrap } from './Accordion.styled';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

interface Props {
	label: ReactNode;
}

const Accordion: FC<Props> = ({ label, children }) => {
	const [isOpen, toggleOpen] = useToggle();

	return (
		<>
			<Wrap onClick={toggleOpen} active={isOpen}>
				{label}
				<span>{isOpen ? <BsChevronUp /> : <BsChevronDown />}</span>
			</Wrap>
			{isOpen && <Dropdown isOpen={isOpen}>{children}</Dropdown>}
		</>
	);
};

export default Accordion;
