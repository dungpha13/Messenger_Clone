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
            <ModalContent
                w='max-content'
                h='max-content'
            >
                <Box
                    p={6}
                    w='400px'
                    h='400px'
                    rounded='md'
                    boxShadow='dark-lg'
                    display='flex'
                    justifyContent='center'
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