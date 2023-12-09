'use client';

interface SettingsModalProps {
    isOpen: boolean,
    onClose: () => void,
    user: User
}

import { Avatar, AvatarBadge, Button, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { Plus } from "phosphor-react";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    user
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
            name: user?.name,
            image: user?.image
        }
    });

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/settings', data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false));
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text fontSize='larger' as='b'>Change your information</Text>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack
                            p={2}
                            spacing={6}
                            direction='column'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Avatar
                                size='md'
                                src={image || user?.image || '/images/placeholder.jpg'}
                            >
                                <CldUploadButton
                                    options={{ maxFiles: 1 }}
                                    onUpload={handleUpload}
                                    uploadPreset="up3wyu1d"
                                >
                                    <AvatarBadge
                                        bg='gray.300'
                                        boxSize='1.25em'
                                        alignItems='center'
                                        justifyContent='center'
                                        _hover={{ bg: 'gray.200' }}
                                    >
                                        <Icon as={Plus} cursor='pointer' />
                                    </AvatarBadge>
                                </CldUploadButton>
                            </Avatar>
                            <Stack direction='column' spacing={3} w='full' h='full'>
                                <Stack
                                    w='full'
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='space-between'
                                >
                                    <Text fontSize='medium' as='b'>Name</Text>
                                    <Input
                                        size='sm'
                                        type='text'
                                        borderRadius={6}
                                        {...register("name", { required: true })}
                                    />
                                </Stack>
                                <Stack direction='row' justifyContent='end' w='full'>
                                    <Button colorScheme='blue' mr={3} onClick={onClose} isDisabled={isLoading}>
                                        Close
                                    </Button>
                                    <Button isDisabled={isLoading} type="submit">Save</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default SettingsModal;