import api from './index';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { MediaType } from './media';

const uploadThumbnail = (
	mediaType: MediaType,
	fileName: string,
	file: File,
	onUploadProgress: (progress: number) => void,
	saveOriginal: boolean = false
) => {
	let formData = new FormData();
	formData.append('file', file);

	return api
		.put<{ message: string }>(`upload/${mediaType}/${fileName}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			params: {
				saveOriginal,
			},
			onUploadProgress: (progressEvent) => {
				return onUploadProgress(Math.round((100 * progressEvent.loaded) / progressEvent.total));
			},
		})
		.then((res) => res.data);
};

export const useUploadThumbnail = () => {
	const [progress, setProgress] = useState<number>();

	const mutation = useMutation(
		(upload: { mediaType: MediaType; fileName: string; file: File; saveOriginal?: boolean }) =>
			uploadThumbnail(upload.mediaType, upload.fileName, upload.file, setProgress, upload.saveOriginal)
	);

	return [mutation, progress] as const;
};
