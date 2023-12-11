'use client';

import useConversation from "@/app/hooks/useConversation";
import { Box, Button, FormLabel, Icon, Input, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { da } from "date-fns/locale";
import { CldUploadButton } from "next-cloudinary";
import { Image, PaperPlaneRight } from "phosphor-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Form = () => {

    const { conversationId } = useConversation();

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
            borderTop='1px'
            borderColor='gray.200'
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
                    bg='white'
                    p={1}
                >
                    <Icon
                        as={Image}
                        boxSize={30}
                        cursor='pointer'
                        color='blue.500'
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
                            bg='white'
                            type="submit"
                            p={1}
                        >
                            <Icon
                                as={PaperPlaneRight}
                                boxSize={30}
                                color='blue.500'
                            />
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    );
}

export default Form;