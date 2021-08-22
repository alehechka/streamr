import { LoadingBar, UploadStatusWrapper } from './UploadStatus.styled';

interface Props {
	percent?: number;
}

const UploadStatus = ({ percent }: Props) => {
	return (
		<UploadStatusWrapper>
			{percent !== undefined && <p>{percent}%</p>}
			<LoadingBar percent={percent} />
		</UploadStatusWrapper>
	);
};

export default UploadStatus;
