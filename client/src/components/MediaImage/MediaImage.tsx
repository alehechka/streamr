import { MediaType } from 'api/media';
import { Link } from 'wouter';
import { StyledMediaImage } from './mediaImage.styled';

interface Props {
	src: string;
	mediaType: MediaType;
}

const MediaImage = ({ src, mediaType }: Props) => {
	return (
		<Link to={`/media/${mediaType}`}>
			<StyledMediaImage src={src} mediaType={mediaType} />
		</Link>
	);
};

export default MediaImage;
