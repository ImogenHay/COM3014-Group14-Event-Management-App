import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue, FormHelperText,
} from '@chakra-ui/react';

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email) {
            setEmailError('Email is required')
            return
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Invalid email format')
            return
        }

        setEmailError('')

        if (!password) {
            setPasswordError('Password is required')
            return
        }
        const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!strongPasswordRegex.test(password)) {
            setPasswordError('Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character')
            return
        }

        setPasswordError('')

        await login(email, password)
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all our cool events! ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            {emailError && (
                                <FormHelperText color='red.500'>{emailError}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                 type="password"
                                 onChange={(e) => setPassword(e.target.value)}
                                 value={password}
                            />
                            {passwordError && (
                                <FormHelperText color='red.500'>{passwordError}</FormHelperText>
                            )}
                            {error && (
                                <FormHelperText color='red.500'>{error}</FormHelperText>
                            )}
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                disabled={isLoading}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleSubmit}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}