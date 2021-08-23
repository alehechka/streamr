import api from './index';
import { useMutation, useQuery } from 'react-query';
import { useState } from 'react';

export const mediaTypes = [
	'movies',
	'songs',
	//'shows'
] as const;
export type MediaType = typeof mediaTypes[number];

const getMediaOptions = (mediaType?: MediaType) => {
	if (!mediaType) return Promise.reject('No media type provided.');
	return api.get<{ paths: string[] }>(`/media-finder/${mediaType}`).then((res) => res.data);
};

export const useMediaOptions = (mediaType?: MediaType) => {
	return useQuery(`mediaTypes:${mediaType}`, () => getMediaOptions(mediaType), { retry: false });
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
	return api.get<MediaMetadata>(`/metadata/${mediaType}/${title}`).then((res) => res.data);
};

export const useMediaMetadata = (mediaType?: MediaType, title?: string) => {
	return useQuery(`mediaMetadata:${mediaType}:${title}`, () => getMediaMetadata(mediaType, title), { retry: false });
};

const deleteMedia = (mediaType?: MediaType, title?: string) => {
	if (!mediaType || !title) return Promise.reject('No media type or title provided.');
	return api.delete(`/media/${mediaType}/${title}`).then((res) => res.data);
};

export const useDeleteMedia = () => {
	return useMutation((media: { mediaType?: MediaType; title: string }) => deleteMedia(media.mediaType, media.title));
};
