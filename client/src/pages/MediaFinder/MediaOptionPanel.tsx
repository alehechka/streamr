import { MediaMetadata, useDeleteMedia, useDownloadMedia, useMediaMetadata } from 'api/media';
import { MediaOptionsProps } from './MediaOptions';
import styled from 'styled-components';
import IconButton from 'components/IconButton';
import { BsFillTrashFill } from 'react-icons/bs';
import { BiDownload } from 'react-icons/bi';
import { FaPlay } from 'react-icons/fa';
import { useEffect } from 'react';
import Modal from 'components/Modal';
import { useToggle } from '@alehechka/react-hooks';
import UploadStatus from 'components/UploadStatus';

interface MediaOptionProps extends MediaOptionsProps {
	path: string;
	onDelete?: VoidFunction;
	onNavigate?: VoidFunction;
}

const MediaOptionPanel = ({ mediaType, path, onDelete, onNavigate }: MediaOptionProps) => {
	const { data, isLoading, isError } = useMediaMetadata(mediaType, path);

	const [isDeleteOpen, , openDeleteModal, closeDeleteModal] = useToggle();

	const deleteMedia = useDeleteMedia();
	const handleDelete = () => {
		deleteMedia.mutate({ mediaType, title: path });
	};

	const [downloadMedia, downloadProgress] = useDownloadMedia();
	const handleDownload = () => {
		if (mediaType && path) {
			downloadMedia.mutate({ mediaType, fileName: path });
		}
	};

	useEffect(() => {
		if (deleteMedia.isSuccess && onDelete) {
			closeDeleteModal();
			onDelete();
		}
	}, [deleteMedia.isSuccess, onDelete, closeDeleteModal]);

	return (
		<MediaOptionPanelWrapper>
			<div>
				{isLoading && <div>loading...</div>}
				{isError && <div>no metadata found</div>}
				<MediaMetadataPanel meta={data} />
			</div>
			<ButtonWrapper>
				{onNavigate && (
					<IconButton domain='primary'>
						<FaPlay size={20} onClick={onNavigate} />
					</IconButton>
				)}
				<IconButton disabled={downloadMedia.isLoading}>
					<BiDownload size={20} onClick={handleDownload} />
				</IconButton>
				<UploadStatus percent={downloadProgress} />
				<IconButton domain='danger'>
					<BsFillTrashFill size={20} onClick={openDeleteModal} />
				</IconButton>
			</ButtonWrapper>
			<Modal isOpen={isDeleteOpen} afterClose={closeDeleteModal} onBackgroundClick={closeDeleteModal}>
				Are you sure you want to delete?
				<button onClick={closeDeleteModal}>cancel</button>
				<button onClick={handleDelete}>delete</button>
			</Modal>
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

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
`;

export default MediaOptionPanel;
