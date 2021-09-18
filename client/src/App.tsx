import { Route } from 'wouter';
import MediaFinder from 'pages/MediaFinder';
import MediaPlayer from 'pages/MediaPlayer';
import { QueryClient, QueryClientProvider } from 'react-query';
import MediaOptions from 'pages/MediaFinder/MediaOptions';
import { MediaType } from 'api/media';
import AppWrapper, { ContentWrapper } from 'components/AppWrapper';
import { MediaUploadModal } from 'components/Modal';

const App = () => {
	const queryClient = new QueryClient();

	return (
		<AppWrapper>
			<MediaUploadModal />
			<ContentWrapper>
				<QueryClientProvider client={queryClient}>
					<Route path='/'>{MediaFinder}</Route>
					<Route path='/media/:media'>{(params) => <MediaOptions mediaType={params.media as MediaType} />}</Route>
					<Route path='/media/:media/:name'>
						{(params) => <MediaPlayer name={params.name} media={params.media} />}
					</Route>
				</QueryClientProvider>
			</ContentWrapper>
		</AppWrapper>
	);
};

export default App;
