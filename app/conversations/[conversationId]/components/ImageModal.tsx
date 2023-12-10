'use client';

import { Box, Image, Modal, ModalContent } from "@chakra-ui/react";

interface ImageModalProps {
    isOpen: boolean,
    onClose: () => void
    src?: string
}


const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    src
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <Box
                    p={6}
                    w='full'
                    h='full'
                    rounded='md'
                    boxShadow='dark-lg'
                >
                    <Image
                        src={src}
                        alt="Image"
                        objectFit='cover'
                    />
                </Box>
            </ModalContent>
        </Modal>
    );
}

export default ImageModal;