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
import ProgressBar from 'components/ProgressBar';
import Text from 'components/Text';

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
				{isLoading && <Text>loading...</Text>}
				{isError && <Text>no metadata found</Text>}
				<MediaMetadataPanel meta={data} />
			</div>
			<ButtonWrapper>
				{onNavigate && (
					<IconButton domain='primary' onClick={onNavigate}>
						<FaPlay size={20} />
					</IconButton>
				)}
				<IconButton pending={downloadMedia.isLoading} onClick={handleDownload}>
					<BiDownload size={20} />
				</IconButton>
				<ProgressBar percent={downloadProgress} loading={downloadMedia.isLoading} />
				<IconButton domain='danger' onClick={openDeleteModal}>
					<BsFillTrashFill size={20} />
				</IconButton>
			</ButtonWrapper>
			<Modal
				isOpen={isDeleteOpen}
				onExit={closeDeleteModal}
				label={`Deleting ${path}`}
				onCancel={closeDeleteModal}
				onConfirm={handleDelete}
				confirmLabel='Delete'
			>
				<Text>Are you sure you want to delete?</Text>
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
				<Text as='p'>
					Title: <Text bold>{meta.title}</Text>
					{meta.album && (
						<Text>
							{' from '}
							<Text bold>{meta.album}</Text>
						</Text>
					)}
				</Text>
			)}
			{meta.artist && <Text as='p'>Artist: {meta.artist}</Text>}
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
	align-items: center;
`;

export default MediaOptionPanel;
