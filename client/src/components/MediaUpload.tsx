import { MediaType, mediaTypes, useUploadMedia } from 'api/media';
import { useRef, useState } from 'react';

const MediaUpload = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [files, setFiles] = useState<File[]>([]);
	const addFiles = (files: FileList | null) => {
		console.log(files);
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
			<input type='file' accept='.mp4,.mp3' onChange={handleChange} hidden ref={fileInputRef} />
			<ul>
				{files.map((file, index) => (
					<li key={file.name}>
						<UploadMedia file={file} removeFile={() => removeFile(index)} />
					</li>
				))}
			</ul>
		</>
	);
};

interface UploadMediaProps {
	file: File;
	removeFile: VoidFunction;
}

const UploadMedia = ({ file, removeFile }: UploadMediaProps) => {
	const cleanName = (name?: string) => name?.split('.')[0].replace(/\W/g, '') || '';

	const [mediaType, setMediaType] = useState<MediaType>('movies');
	const [fileName, setFileName] = useState<string>(cleanName(file.name));

	const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setFileName(cleanName(event.target.value));
	const handleMediaTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
		setMediaType(event.target.value as MediaType);

	const [mutation, progress] = useUploadMedia();
	const handleSubmit = () => {
		mutation.mutate({ fileName, file, mediaType });
	};

	return (
		<>
			{file.name}
			<select value={mediaType} onChange={handleMediaTypeChange} disabled={mutation.isLoading}>
				{mediaTypes.map((mediaType) => (
					<option key={mediaType} value={mediaType}>
						{mediaType}
					</option>
				))}
			</select>
			<input value={fileName} onChange={handleFileNameChange} disabled={mutation.isLoading} />
			<button onClick={removeFile} disabled={mutation.isLoading}>
				delete
			</button>
			<button onClick={handleSubmit} disabled={mutation.isLoading}>
				upload
			</button>
			{progress}%
		</>
	);
};

export default MediaUpload;
