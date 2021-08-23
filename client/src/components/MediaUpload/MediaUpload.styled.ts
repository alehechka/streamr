import styled from 'styled-components';

// MediaUpload

export const MediaUploadWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	gap: 20px;
`;

export const UploadMediaMapWrapper = styled.div`
	width: 100%;
`;

export const StyledButton = styled.button`
	text-transform: capitalize;
`;

// UploadMedia

export const UploadMediaWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 10px;
	padding: 15px 0;
	background-color: #eee;
	border-bottom: 5px solid #ccc;
	width: 100%;

	&:nth-child(1) {
		border-top: 5px solid #ccc;
	}
`;

export const FileNameWrapper = styled.div`
	width: 200px;
`;
