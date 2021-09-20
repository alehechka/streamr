import MediaImage, { MediaImagesWrapper } from 'components/MediaImage';
import { PopcornImage, RecordImage } from 'images';

const MediaFinder = () => {
	return (
		<MediaImagesWrapper>
			<MediaImage src={PopcornImage} mediaType='movies' />
			<MediaImage src={RecordImage} mediaType='songs' />
		</MediaImagesWrapper>
	);
};

export default MediaFinder;
