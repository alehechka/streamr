import { useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import styled from 'styled-components';

interface Props {
	name?: string;
	media?: string;
}

const MediaPlayer = ({ name, media }: Props) => {
	const playerRef = useRef<HTMLVideoElement>(null);

	return (
		<Wrapper>
			<ReactHlsPlayer
				playerRef={playerRef}
				src={`http://localhost:8000/media/${media}/${name}/outputlist.m3u8`}
				hlsConfig={{
					maxLoadingDelay: 4,
					minAutoBitrate: 0,
					lowLatencyMode: true,
				}}
				controls
				width='100%'
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 50%;
	max-width: 600px;
	border-style: dashed;
`;

export default MediaPlayer;
