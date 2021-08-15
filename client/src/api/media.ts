import api from './index';
import { useQuery } from 'react-query';

export const mediaTypes = ['movies', 'shows', 'songs'] as const;
export type MediaType = typeof mediaTypes[number];

const getMediaOptions = (mediaType?: MediaType) => {
	if (!mediaType) return Promise.reject('No media type provided.');
	return api.get<{ paths: string[] }>(`/media-finder/${mediaType}`).then((res) => res.data);
};

export const useMediaOptions = (mediaType?: MediaType) => {
	return useQuery('mediaTypes', () => getMediaOptions(mediaType));
};
