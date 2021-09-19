import { MediaType, mediaTypes, useMediaOptions } from 'api/media';
import Accordion from 'components/Accordion';
import StyledLink from 'components/Link/link.styled';
import MediaUpload from 'components/MediaUpload';
import { useLocation } from 'wouter';
import MediaOptionPanel from './MediaOptionPanel';
import { MediaUploadWrapper } from './MediaOptions.styled';

export interface MediaOptionsProps {
	mediaType?: MediaType;
}

const MediaOptions = ({ mediaType }: MediaOptionsProps) => {
	const { data, isLoading, isError, refetch } = useMediaOptions(mediaType);

	const [, setLocation] = useLocation();

	return (
		<>
			<StyledLink to={`/`}>{'<- Back'}</StyledLink>
			{isLoading && <div>loading...</div>}
			{isError && <div>no media found</div>}
			{data?.paths.map((path) => (
				<Accordion key={path} label={<StyledLink to={`/media/${mediaType}/${path}`}>{path}</StyledLink>}>
					<MediaOptionPanel
						mediaType={mediaType}
						path={path}
						onDelete={refetch}
						onNavigate={() => setLocation(`/media/${mediaType}/${path}`)}
					/>
				</Accordion>
			))}
			{mediaType && mediaTypes.includes(mediaType) && (
				<MediaUploadWrapper>
					<MediaUpload
						mediaType={mediaType}
						onUpload={refetch}
						fileOptions={mediaType === 'songs' ? ['.mp3'] : ['.mp4']}
						invalidNames={data?.paths}
					/>
				</MediaUploadWrapper>
			)}
		</>
	);
};

export default MediaOptions;
