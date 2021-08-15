import { MediaType, useMediaOptions } from 'api/media';
import { Link } from 'wouter';

interface Props {
	mediaType?: MediaType;
}

const MediaOptions = ({ mediaType }: Props) => {
	const { data, isLoading } = useMediaOptions(mediaType);

	return (
		<ul>
			{isLoading && <li>loading...</li>}
			{data?.paths.map((path) => (
				<li>
					<Link to={`/media/${mediaType}/${path}`}>{path}</Link>
				</li>
			))}
		</ul>
	);
};

export default MediaOptions;
