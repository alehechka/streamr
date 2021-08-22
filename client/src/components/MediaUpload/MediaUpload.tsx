import { MediaType, useUploadMedia } from 'api/media';
import { useEffect, useRef, useState } from 'react';
import UploadStatus from '../UploadStatus';
import { UploadMediaWrapper } from './MediaUpload.styled';

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
		<>
			<button onClick={() => fileInputRef.current?.click()}>Upload Media</button>
			<input type='file' accept={fileOptions.join(',')} onChange={handleChange} hidden ref={fileInputRef} />
			<ul>
				{files.map((file, index) => (
					<li key={file.name}>
						<UploadMedia
							file={file}
							removeFile={() => removeFile(index)}
							mediaType={mediaType}
							onUpload={onUpload}
							invalidNames={invalidNames}
						/>
					</li>
				))}
			</ul>
		</>
	);
};

interface UploadMediaProps extends MediaUploadProps {
	file: File;
	removeFile: VoidFunction;
}

const UploadMedia = ({ file, removeFile, mediaType, onUpload, invalidNames = [] }: UploadMediaProps) => {
	const cleanName = (name?: string) => name?.split('.')[0].replace(/\W/g, '') || '';

	const [fileName, setFileName] = useState<string>(cleanName(file.name));

	const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setFileName(cleanName(event.target.value));

	const [mutation, progress] = useUploadMedia();
	const handleSubmit = () => {
		if (mediaType) return mutation.mutate({ fileName, file, mediaType });
	};

	useEffect(() => {
		if (mutation.isSuccess && onUpload) {
			onUpload();
		}
	}, [mutation.isSuccess, onUpload]);

	return (
		<UploadMediaWrapper>
			{file.name}
			<input value={fileName} onChange={handleFileNameChange} disabled={mutation.isLoading} />
			<button onClick={removeFile} disabled={mutation.isLoading}>
				delete
			</button>
			<button
				onClick={handleSubmit}
				disabled={mutation.isLoading || progress === 100 || invalidNames.includes(fileName)}
			>
				upload
			</button>
			<UploadStatus percent={progress} />
		</UploadMediaWrapper>
	);
};

export default MediaUpload;
