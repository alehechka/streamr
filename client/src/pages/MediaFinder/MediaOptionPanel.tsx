import { MediaMetadata, useDeleteMedia, useMediaMetadata } from 'api/media';
import { MediaOptionsProps } from './MediaOptions';
import styled from 'styled-components';
import IconButton from 'components/IconButton';
import { BsFillTrashFill } from 'react-icons/bs';
import { useEffect } from 'react';

interface MediaOptionProps extends MediaOptionsProps {
	path: string;
	onDelete?: VoidFunction;
}

const MediaOptionPanel = ({ mediaType, path, onDelete }: MediaOptionProps) => {
	const { data, isLoading, isError } = useMediaMetadata(mediaType, path);

	const deleteMedia = useDeleteMedia();

	const handleDelete = () => {
		const confirmDelete = window.confirm(`Are you sure you want to delete ${path}?`);
		if (confirmDelete) {
			deleteMedia.mutate({ mediaType, title: path });
		}
	};

	useEffect(() => {
		if (deleteMedia.isSuccess && onDelete) {
			onDelete();
		}
	}, [deleteMedia.isSuccess]);

	return (
		<MediaOptionPanelWrapper>
			<div>
				{isLoading && <div>loading...</div>}
				{isError && <div>no metadata found</div>}
				<MediaMetadataPanel meta={data} />
			</div>
			<IconButton domain='danger'>
				<BsFillTrashFill size={20} onClick={handleDelete} />
			</IconButton>
		</MediaOptionPanelWrapper>
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

const MediaOptionPanelWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 15px 0;
`;

export default MediaOptionPanel;
