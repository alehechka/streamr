import { Link } from 'wouter';
import { mediaTypes } from 'api/media';

const MediaFinder = () => {
	return (
		<>
			<ul>
				{mediaTypes.map((mediaType) => (
					<li key={mediaType}>
						<Link to={`/media/${mediaType}`}>{mediaType}</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export default MediaFinder;
