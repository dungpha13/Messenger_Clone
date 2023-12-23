import { useCallback } from "react";
import { useRouter } from "next/navigation";

import {
    Button,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import axios from "axios";
import { ChatCenteredDots } from "phosphor-react";
import toast from "react-hot-toast";

interface ArchivedModalProps {
    conversationId: string,
    isOpen: boolean,
    onClose: () => void
}


const ArchivedModal = ({
    conversationId,
    isOpen,
    onClose
}: ArchivedModalProps) => {

    const router = useRouter();

    const bgColor = useColorModeValue('gray.100', 'gray.600')

    const onUnArchived = useCallback(() => {
        axios.post(`/api/archiveds/${conversationId}`)
            .then(() => {
                onClose();
                router.push('/conversations');
                router.refresh();
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong!')
            })
    }, [router, conversationId, onClose]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Stack
                        spacing={2}
                        direction='row'
                        alignItems='center'
                    >
                        <Icon
                            p={1}
                            boxSize={8}
                            bg={bgColor}
                            as={ChatCenteredDots}
                            rounded='full'
                        />
                        <Text
                            as='b'
                        >
                            UnArchived Conversation
                        </Text>
                    </Stack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure want to unarchive this conversation?
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button onClick={onUnArchived}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ArchivedModal;