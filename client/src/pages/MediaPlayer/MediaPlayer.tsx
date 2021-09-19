import { baseURL } from 'api';
import StyledLink from 'components/Link/link.styled';
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
			<StyledLink to={`/media/${media}`}>{'<- Back'}</StyledLink>
			<SizeWrapper>
				<VideoWrapper>
					<ReactHlsPlayer
						playerRef={playerRef}
						src={`${baseURL}media/${media}/${name}/outputlist.m3u8`}
						hlsConfig={{
							maxLoadingDelay: 4,
							minAutoBitrate: 0,
							lowLatencyMode: true,
						}}
						controls
						width='100%'
						height='100%'
					/>
				</VideoWrapper>
			</SizeWrapper>
		</Wrapper>
	);
};

const Wrapper = styled.div``;

const SizeWrapper = styled.div`
	margin-top: 20px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	max-height: calc(100vh - 24px);
`;

const VideoWrapper = styled.div`
	max-height: 100%;
`;

export default MediaPlayer;
