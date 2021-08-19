import { MediaType, useMediaOptions } from 'api/media';
import { PaddedLink } from 'components/StyledLink';
import { Link } from 'wouter';

interface Props {
	mediaType?: MediaType;
}

const MediaOptions = ({ mediaType }: Props) => {
	const { data, isLoading } = useMediaOptions(mediaType);

	return (
		<>
			<PaddedLink to={`/media`}>{'<- Back'}</PaddedLink>
			<ul>
				{isLoading && <li>loading...</li>}
				{data?.paths.map((path) => (
					<li key={path}>
						<Link to={`/media/${mediaType}/${path}`}>{path}</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export default MediaOptions;
