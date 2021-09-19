interface Props {
	percent?: number;
	loading?: boolean;
}

const ProgressBar = ({ percent, loading }: Props) => {
	if (percent === undefined && !loading) {
		return <></>;
	}

	return (
		<progress value={percent} max={100}>
			{percent}%
		</progress>
	);
};

export default ProgressBar;
