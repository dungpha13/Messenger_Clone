"use client";

import { Box, Button, Divider, FormLabel, Input, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useState, useCallback, useEffect } from 'react';
import {
    useForm,
    FieldValues,
    SubmitHandler
} from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {

    const router = useRouter()
    const session = useSession();

    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    const textColor = useColorModeValue('black', 'black')

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users')
        }
    }, [session?.status])


    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER")
        } else {
            setVariant("LOGIN")
        }
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        setIsLoading(true)

        if (variant === "REGISTER") {
            axios.post('/api/register', data)
                .then(() => signIn('credentials', data))
                .catch(() => toast.error('Something went wrong', {
                    duration: 5000,
                }))
                .finally(() => setIsLoading(false))
        }

        if (variant === "LOGIN") {
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((result) => {
                    if (result?.error) {
                        toast.error('Invalid Credentials');
                    }

                    if (result?.ok && !result?.error) {
                        toast.success('Logged in!');
                        router.push('/users')
                    }

                }).catch(() => {
                    toast.error('Internal Error')
                }).finally(() => setIsLoading(false))
            //NextAuth SignIn
        }

    }

    const socialAction = (action: string) => {
        setIsLoading(true)

        signIn(action, {
            redirect: false
        })
            .then((result) => {
                if (result?.error) {
                    toast.error('Invalid Credentials');
                }

                if (result?.ok && !result?.error) {
                    toast.success('Logged in!');
                }

            }).catch(() => {
                toast.error('Internal Error')
            }).finally(() => setIsLoading(false))
        //NextAuth Social SignIn
    }
    // #1a2a48
    // #4c515b

    return (
        <Box
            mt={8}
            mx="auto"
            w="full"
            maxW="md"
        >
            <Box
                bg="white"
                px={4}
                py={8}
                boxShadow='base'
                p='6'
                rounded='lg'
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction='column' spacing={3} color='black'>
                        {variant === 'REGISTER' && (
                            <Stack direction='column' spacing={1}>
                                <FormLabel>Name</FormLabel>
                                <Input type='text' {...register("name", { required: true })} isDisabled={isLoading} />
                            </Stack>
                        )}
                        <Stack direction='column' spacing={1}>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' {...register("email", { required: true })} isDisabled={isLoading} />
                        </Stack>
                        <Stack direction='column' spacing={1}>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' {...register("password", { required: true })} isDisabled={isLoading} />
                        </Stack>
                        <Button
                            w="full"
                            type='submit'
                            bgColor='#1ea7fd'
                            color='white'
                            isLoading={isLoading}
                            _hover={{ bgColor: '#007bb5' }}
                            _focusVisible={{ bgColor: '#007bb5' }}
                        >
                            {variant === 'LOGIN' ? 'Sign In' : 'Register'}
                        </Button>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Divider w="32%" />
                            <Text fontSize='sm'>Or continue with</Text>
                            <Divider w="32%" />
                        </Stack>
                        <Stack direction='row' w='full'>
                            <AuthSocialButton
                                icon={BsGithub}
                                onClick={() => socialAction('github')}
                            />
                            <AuthSocialButton
                                icon={BsGoogle}
                                onClick={() => socialAction('google')}
                            />
                        </Stack>
                        <Stack justifyContent='center' mt={1}>
                            <Text textAlign='center'>
                                {variant === 'LOGIN' ? 'New to Messenger? ' : 'Already have account? '}
                                <Link
                                    onClick={toggleVariant}
                                >
                                    {variant === 'LOGIN' ? 'Create an acount' : 'Login'}
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}

export default AuthForm;