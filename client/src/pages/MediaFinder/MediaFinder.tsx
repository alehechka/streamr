import { Link } from 'wouter';
import { mediaTypes } from 'api/media';
import MediaUpload from 'components/MediaUpload';

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
			<MediaUpload />
		</>
	);
};

export default MediaFinder;
