import { useToggle } from '@alehechka/react-hooks';
import { StickyButton } from 'components/IconButton';
import { BiCloudUpload } from 'react-icons/bi';
import Modal from 'components/Modal';
import Text from 'components/Text';
const MediaUploadModal = () => {
	const [isOpen, , openModal, closeModal] = useToggle();

	return (
		<>
			<StickyButton onClick={openModal}>
				<BiCloudUpload size={50} />
			</StickyButton>
			<Modal isOpen={isOpen} label='Upload Media' onOverlayClick={closeModal} onExit={closeModal}>
				<Text>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum illum reprehenderit temporibus. Recusandae rem
					aliquid molestias aut fuga dolores fugit. Reiciendis veritatis quaerat incidunt et quam obcaecati sed debitis.
					Eveniet.
				</Text>
			</Modal>
		</>
	);
};

export default MediaUploadModal;
