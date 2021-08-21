import { MediaType, mediaTypes, useMediaMetadata, useMediaOptions } from 'api/media';
import Accordion from 'components/Accordion';
import MediaUpload from 'components/MediaUpload';
import { PaddedLink } from 'components/StyledLink';
import { Link } from 'wouter';

interface Props {
	mediaType?: MediaType;
}

const MediaOptions = ({ mediaType }: Props) => {
	const { data, isLoading, refetch } = useMediaOptions(mediaType);

	return (
		<>
			<PaddedLink to={`/media`}>{'<- Back'}</PaddedLink>
			{isLoading && <div>loading...</div>}
			{data?.paths.map((path) => (
				<Accordion key={path} label={<Link to={`/media/${mediaType}/${path}`}>{path}</Link>}>
					<MediaOptionPanel mediaType={mediaType} path={path} />
				</Accordion>
			))}
			<MediaUpload mediaType={mediaType} onUpload={refetch} />
		</>
	);
};

interface MediaOptionProps extends Props {
	path: string;
}

const MediaOptionPanel = ({ mediaType, path }: MediaOptionProps) => {
	const { data, isLoading, isError } = useMediaMetadata(mediaType, path, { retry: false });

	return (
		<>
			{isLoading && <div>loading...</div>}
			{isError && <div>no metadata found</div>}
			{data && <div>{JSON.stringify(data)}</div>}
		</>
	);
};

export default MediaOptions;
