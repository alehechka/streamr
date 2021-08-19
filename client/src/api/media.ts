import api from './index';
import { useMutation, useQuery } from 'react-query';
import { useState } from 'react';

export const mediaTypes = ['movies', 'shows', 'songs'] as const;
export type MediaType = typeof mediaTypes[number];

const getMediaOptions = (mediaType?: MediaType) => {
	if (!mediaType) return Promise.reject('No media type provided.');
	return api.get<{ paths: string[] }>(`/media-finder/${mediaType}`).then((res) => res.data);
};

export const useMediaOptions = (mediaType?: MediaType) => {
	return useQuery('mediaTypes', () => getMediaOptions(mediaType));
};

const uploadMedia = (
	mediaType: MediaType,
	fileName: string,
	file: File,
	onUploadProgress: (progressEvent: any) => void
) => {
	let formData = new FormData();
	formData.append('file', file);

	return api
		.post<{ message: string }>(`/upload/${mediaType}/${fileName}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			onUploadProgress,
		})
		.then((res) => res.data);
};

export const useUploadMedia = () => {
	const [progress, setProgress] = useState<number>();
	const handleProgressChange = (event: any) => setProgress(Math.round((100 * event.loaded) / event.total));

	const mutation = useMutation((upload: { mediaType: MediaType; fileName: string; file: File }) =>
		uploadMedia(upload.mediaType, upload.fileName, upload.file, handleProgressChange)
	);

	return [mutation, progress] as const;
};
