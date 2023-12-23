'use client';

import useConversation from "@/app/hooks/useConversation";
import { Box, Button, FormLabel, Icon, Input, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { da } from "date-fns/locale";
import { CldUploadButton } from "next-cloudinary";
import { Image, PaperPlaneRight } from "phosphor-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Form = () => {

    const { conversationId } = useConversation();

    const bg = useColorModeValue('gray.200', '#3f444e')
    const bgColor = useColorModeValue('white', 'gray.500')
    const iconColor = useColorModeValue('blue.500', 'gray.200')

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });

        axios.post('/api/messages', {
            ...data,
            conversationId
        });
    }

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
            .then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <Stack
            alignItems='center'
            direction='row'
            boxShadow='0px -2px 5px rgba(0, 0, 0, 0.2)'
            h='max-content'
            p={3}
        >
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="up3wyu1d"
            >
                <Stack
                    borderRadius={6}
                    bg={bgColor}
                    p={1}
                    _hover={{
                        bg: `${bg}`
                    }}
                >
                    <Icon
                        as={Image}
                        boxSize={30}
                        cursor='pointer'
                        color={iconColor}
                        onClick={() => { }}
                    />
                </Stack>
            </CldUploadButton>

            <Stack w='full'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack
                        direction='row'
                        alignItems='center'
                    >
                        <Input
                            size='sm'
                            borderRadius={6}
                            placeholder="Type a message..."
                            type='text'
                            {...register("message", { required: true })}
                        />
                        <Button
                            bg={bgColor}
                            type="submit"
                            p={1}
                        >
                            <Icon
                                as={PaperPlaneRight}
                                boxSize={30}
                                color={iconColor}
                            />
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    );
}

export default Form;