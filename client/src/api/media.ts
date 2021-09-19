import api from './index';
import { useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import FileDownload from 'js-file-download';

export const mediaTypes = [
	'movies',
	'songs',
	//'shows'
] as const;
export type MediaType = typeof mediaTypes[number];

const getMediaOptions = (mediaType?: MediaType) => {
	if (!mediaType) return Promise.reject('No media type provided.');
	return api.get<{ paths: string[] }>(`media-finder/${mediaType}`).then((res) => res.data);
};

export const useMediaOptions = (mediaType?: MediaType) => {
	return useQuery(`mediaTypes:${mediaType}`, () => getMediaOptions(mediaType), { retry: false });
};

const uploadMedia = (
	mediaType: MediaType,
	fileName: string,
	file: File,
	onUploadProgress: (progress: number) => void,
	saveOriginal: boolean = false
) => {
	let formData = new FormData();
	formData.append('file', file);

	return api
		.post<{ message: string }>(`upload/${mediaType}/${fileName}`, formData, {
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

export const useUploadMedia = () => {
	const [progress, setProgress] = useState<number>();

	const mutation = useMutation(
		(upload: { mediaType: MediaType; fileName: string; file: File; saveOriginal?: boolean }) =>
			uploadMedia(upload.mediaType, upload.fileName, upload.file, setProgress, upload.saveOriginal)
	);

	return [mutation, progress] as const;
};

export type MediaMetadata = {
	format: string;
	fileType: string;
	title: string;
	album: string;
	artist: string;
	albumArtist: string;
	composer: string;
	genre: string;
	year: number;
	track: number;
	lyrics: string;
	comment: string;
};

const getMediaMetadata = (mediaType?: MediaType, title?: string) => {
	if (!mediaType || !title) return Promise.reject('No media type or title provided.');
	return api.get<MediaMetadata>(`metadata/${mediaType}/${title}`).then((res) => res.data);
};

export const useMediaMetadata = (mediaType?: MediaType, title?: string) => {
	return useQuery(`mediaMetadata:${mediaType}:${title}`, () => getMediaMetadata(mediaType, title), { retry: false });
};

const deleteMedia = (mediaType?: MediaType, title?: string) => {
	if (!mediaType || !title) return Promise.reject('No media type or title provided.');
	return api.delete(`media/${mediaType}/${title}`).then((res) => res.data);
};

export const useDeleteMedia = () => {
	return useMutation((media: { mediaType?: MediaType; title: string }) => deleteMedia(media.mediaType, media.title));
};

const downloadMedia = (mediaType?: MediaType, title?: string, onDownloadProgress?: (progressEvent: number) => void) => {
	if (!mediaType || !title) return Promise.reject('No media type or title provided.');
	return api
		.get(`download/${mediaType}/${title}`, {
			responseType: 'blob',
			onDownloadProgress: (progressEvent) => {
				if (onDownloadProgress) {
					const percentCompleted = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
					onDownloadProgress(percentCompleted);
				}
			},
		})
		.then((res) => {
			const contentHeader = res.headers['content-disposition'];
			FileDownload(res.data, contentHeader.split('=')[1]);
		});
};

export const useDownloadMedia = () => {
	const [progress, setProgress] = useState<number>();

	const mutation = useMutation((upload: { mediaType: MediaType; fileName: string }) =>
		downloadMedia(upload.mediaType, upload.fileName, setProgress)
	);

	return [mutation, progress] as const;
};
