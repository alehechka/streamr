import { useToggle } from '@alehechka/react-hooks';
import { ReactNode } from 'react';
import { FC } from 'react';
import { Dropdown, Wrap } from './Accordion.styled';

interface Props {
	label: string | ReactNode;
}

const Accordion: FC<Props> = ({ label, children }) => {
	const [isOpen, toggleOpen] = useToggle();

	return (
		<>
			<Wrap onClick={toggleOpen}>
				<h1>{label}</h1>
				<span>{isOpen ? <div>minus</div> : <div>plus</div>}</span>
			</Wrap>
			{isOpen && (
				<Dropdown>
					<p>{children}</p>
				</Dropdown>
			)}
		</>
	);
};

export default Accordion;
