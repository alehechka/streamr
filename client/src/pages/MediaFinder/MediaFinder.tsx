import { mediaTypes } from 'api/media';
import StyledLink from 'components/Link/link.styled';

const MediaFinder = () => {
	return (
		<ul>
			{mediaTypes.map((mediaType) => (
				<li key={mediaType}>
					<StyledLink to={`/media/${mediaType}`}>{mediaType}</StyledLink>
				</li>
			))}
		</ul>
	);
};

export default MediaFinder;
