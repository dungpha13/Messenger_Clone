'use client';

import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import toast from "react-hot-toast";
import Select from "../inputs/Select";

interface GroupChatModalProps {
    isOpen: boolean,
    onClose: () => void,
    users: User[]
}


const GroupChatModal: React.FC<GroupChatModalProps> = ({
    isOpen,
    onClose,
    users
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    });

    const members = watch('members');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/conversations', {
            ...data,
            isGroup: true
        })
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong!')
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Group Chat</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack direction='column' spacing={3}>
                            <Stack direction='column' justifyContent='start'>
                                <Stack
                                    w='full'
                                    spacing={2}
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='space-between'
                                >
                                    <Stack w='max-content'>
                                        <Text fontSize='md' as='b'>
                                            Group Name
                                        </Text>
                                    </Stack>
                                    <Stack w='70%'>
                                        <Input
                                            size='sm'
                                            type='text'
                                            borderRadius={6}
                                            {...register("name", { required: true })}
                                        />
                                    </Stack>
                                </Stack>
                                <Stack
                                    w='full'
                                    spacing={2}
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='space-between'
                                >
                                    <Stack w='max-content'>
                                        <Text fontSize='md' as='b'>
                                            Members
                                        </Text>
                                    </Stack>
                                    <Stack w='70%'>
                                        <Select
                                            disabled={isLoading}
                                            options={users.map((user) => ({
                                                value: user.id,
                                                label: user.name
                                            }))}
                                            onChange={(value) => setValue('members', value, {
                                                shouldValidate: true
                                            })}
                                            value={members}
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack
                                w='full'
                                spacing={2}
                                direction='row'
                                justifyContent='end'>
                                <Button colorScheme='blue' mr={3} onClick={onClose} isDisabled={isLoading}>
                                    Close
                                </Button>
                                <Button isDisabled={isLoading} type="submit">Create</Button>
                            </Stack>
                        </Stack>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default GroupChatModal;