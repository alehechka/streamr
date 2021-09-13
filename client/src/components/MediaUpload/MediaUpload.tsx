import { MediaType, useUploadMedia } from 'api/media';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import { useEffect, useMemo, useRef, useState } from 'react';
import UploadStatus from '../UploadStatus';
import {
	FileNameWrapper,
	MediaUploadWrapper,
	StyledButton,
	UploadMediaMapWrapper,
	UploadMediaWrapper,
} from './MediaUpload.styled';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaFileUpload } from 'react-icons/fa';
import IconButton from 'components/IconButton';
import { useToggle } from '@alehechka/react-hooks';
import Tooltip from 'components/Tooltip';

interface MediaUploadProps {
	mediaType?: MediaType;
	onUpload?: VoidFunction;
	fileOptions?: string[];
	invalidNames?: string[];
}

const MediaUpload = ({ mediaType, onUpload, fileOptions = ['.mp4', '.mp3'], invalidNames = [] }: MediaUploadProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [files, setFiles] = useState<File[]>([]);
	const addFiles = (files: FileList | null) => {
		setFiles((prevFiles) => [...prevFiles, ...Array.from(files || [])]);
	};
	const removeFile = (index: number) => setFiles((prevFiles) => prevFiles.filter((f, i) => i !== index));

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		await addFiles(event.target.files);
		event.target.value = '';
	};

	return (
		<MediaUploadWrapper>
			<StyledButton onClick={() => fileInputRef.current?.click()}>Upload {mediaType}</StyledButton>
			<input type='file' accept={fileOptions.join(',')} onChange={handleChange} hidden ref={fileInputRef} />
			<UploadMediaMapWrapper>
				{files.map((file, index) => (
					<UploadMedia
						key={file.name}
						file={file}
						removeFile={() => removeFile(index)}
						mediaType={mediaType}
						onUpload={onUpload}
						invalidNames={invalidNames}
					/>
				))}
			</UploadMediaMapWrapper>
		</MediaUploadWrapper>
	);
};

interface UploadMediaProps extends MediaUploadProps {
	file: File;
	removeFile: VoidFunction;
}

const UploadMedia = ({ file, removeFile, mediaType, onUpload, invalidNames = [] }: UploadMediaProps) => {
	const cleanName = (name?: string) => name?.split('.')[0].replace(/\W/g, '') || '';

	const [fileName, setFileName] = useState<string>(cleanName(file.name));

	const [saveOriginal, toggleSaveOriginal] = useToggle();

	const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setFileName(cleanName(event.target.value));

	const [mutation, progress] = useUploadMedia();
	const handleSubmit = () => {
		if (mediaType) return mutation.mutate({ fileName, file, mediaType, saveOriginal });
	};

	useEffect(() => {
		if (mutation.isSuccess && onUpload) {
			onUpload();
		}
	}, [mutation.isSuccess, onUpload]);

	const isInvalid = useMemo(() => {
		return invalidNames.includes(fileName);
	}, [fileName, invalidNames]);

	return (
		<UploadMediaWrapper>
			<FileNameWrapper>{file.name}</FileNameWrapper>
			<Input
				value={fileName}
				onChange={handleFileNameChange}
				disabled={mutation.isLoading || mutation.isSuccess}
				invalid={isInvalid && !mutation.isSuccess}
			/>
			<Tooltip text='Save the original media file to disk.'>
				<Checkbox checked={saveOriginal} onChange={toggleSaveOriginal} />
			</Tooltip>
			<Tooltip text='Save'>
				<IconButton onClick={removeFile} disabled={mutation.isLoading}>
					<BsFillTrashFill size={20} />
				</IconButton>
			</Tooltip>
			<IconButton
				onClick={handleSubmit}
				disabled={mutation.isLoading || progress === 100 || isInvalid}
				domain='primary'
			>
				<FaFileUpload size={20} />
			</IconButton>
			<UploadStatus percent={progress} />
		</UploadMediaWrapper>
	);
};

export default MediaUpload;
