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
    Text
} from "@chakra-ui/react";
import axios from "axios";
import { Warning } from "phosphor-react";
import toast from "react-hot-toast";

interface DeleteModalProps {
    conversationId: string,
    isOpen: boolean,
    onClose: () => void
}


const DeleteModal = ({
    conversationId,
    isOpen,
    onClose
}: DeleteModalProps) => {

    const router = useRouter();

    const onDelete = useCallback(() => {

        axios.delete(`/api/conversations/${conversationId}`)
            .then(() => {
                onClose();
                router.push('/conversations');
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
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
                            bg='red.100'
                            as={Warning}
                            rounded='full'
                            color='red.400'
                        />
                        <Text
                            as='b'
                        >
                            Delete Conversation
                        </Text>
                    </Stack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure want to delete the conversation? This action cannot be undone.
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='red' onClick={onDelete}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default DeleteModal;