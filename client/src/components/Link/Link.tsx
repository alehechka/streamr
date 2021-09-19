import { FC } from 'react';
import { LinkProps } from 'wouter';
import StyledLink from './link.styled';

type Props = LinkProps & {};

const Link: FC<Props> = (props: Props) => {
	return <StyledLink {...props} />;
};

export default Link;
