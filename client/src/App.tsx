import { Link, Route } from 'wouter';
import MediaPlayer from './pages/MediaPlayer';

const App = () => {
	return (
		<div>
			<Link href='/media/songs/1'>
				<a className='link' href='/'>
					Profile
				</a>
			</Link>

			<Route path='/media/:media/:name'>{(params) => <MediaPlayer name={params.name} media={params.media} />}</Route>
		</div>
	);
};

export default App;
