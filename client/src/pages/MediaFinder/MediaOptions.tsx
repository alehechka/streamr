import { MediaMetadata, MediaType, useMediaMetadata, useMediaOptions } from 'api/media';
import Accordion from 'components/Accordion';
import MediaUpload from 'components/MediaUpload';
import { PaddedLink } from 'components/StyledLink';
import { Link } from 'wouter';

interface Props {
	mediaType?: MediaType;
}

const MediaOptions = ({ mediaType }: Props) => {
	const { data, isLoading, isError, refetch } = useMediaOptions(mediaType);

	return (
		<>
			<PaddedLink to={`/media`}>{'<- Back'}</PaddedLink>
			{isLoading && <div>loading...</div>}
			{isError && <div>no media found</div>}
			{data?.paths.map((path) => (
				<Accordion key={path} label={<Link to={`/media/${mediaType}/${path}`}>{path}</Link>}>
					<MediaOptionPanel mediaType={mediaType} path={path} />
				</Accordion>
			))}
			<MediaUpload
				mediaType={mediaType}
				onUpload={refetch}
				fileOptions={mediaType === 'songs' ? ['.mp3'] : ['.mp4']}
				invalidNames={data?.paths}
			/>
		</>
	);
};

interface MediaOptionProps extends Props {
	path: string;
}

const MediaOptionPanel = ({ mediaType, path }: MediaOptionProps) => {
	const { data, isLoading, isError } = useMediaMetadata(mediaType, path);

	return (
		<>
			{isLoading && <div>loading...</div>}
			{isError && <div>no metadata found</div>}
			<MediaMetadataPanel meta={data} />
		</>
	);
};

interface MetadataProps {
	meta?: MediaMetadata;
}

const MediaMetadataPanel = ({ meta }: MetadataProps) => {
	if (!meta) return <></>;
	return (
		<>
			{meta.title && (
				<p>
					Title: <b>{meta.title}</b>
					{meta.album && (
						<>
							{' from '}
							<b>{meta.album}</b>
						</>
					)}
				</p>
			)}
			{meta.artist && <p>Artist: {meta.artist}</p>}
		</>
	);
};

export default MediaOptions;
