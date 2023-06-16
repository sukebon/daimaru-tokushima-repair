/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Button,
  Flex,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  useMantineColorScheme
} from '@mantine/core';
import { MdLock } from 'react-icons/md';
import { AuthForm } from '../../types';
import { useMutateAuth } from '@/hooks/useMutateAuth';
import useStore from '../../store';
import { useEffect } from 'react';
import { supabase } from '../../utils/supabase';

const Login = () => {
  const session = useStore((state) => state.session);
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const setSession = useStore((state) => state.setSession);
  const router = useRouter();
  const { loginMutation } = useMutateAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<AuthForm> = async (data) => {
    try {
      loginMutation.mutate(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (session) router.push('/');
  }, [session, router]);

  return (
    <Flex
      w="100%"
      h={{ base: '100vh', lg: 'auto' }}
      bg={dark ? '#1A1B1E' : '#f4f4f4'}
    >
      <Flex
        justify="center"
        align="center"
        w="100%"
        h="100vh"
        bg={dark ? '#1A1B1E' : '#f4f4f4'}
      >
        <Paper
          w={{ base: '100%', xs: '350px' }}
          shadow="md"
          radius="md"
          m="xs"
          p="xl"
          withBorder
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Flex justify="center" direction="column" align="center">
              <MdLock size="30px" />
              Sign In
              <Stack spacing="sm" w="100%">
                <Box>
                  <TextInput
                    w="100%"
                    autoComplete="off"
                    placeholder="email"
                    id="email"
                    label="email"
                    {...register('email', { required: true })}
                    required
                  />
                  {errors.email && <span>emailを入力してください</span>}
                </Box>
                <Box>
                  <PasswordInput
                    w="100%"
                    autoComplete="off"
                    placeholder="password"
                    label="password"
                    id="password"
                    {...register('password', { required: true })}
                    required
                  />
                  {errors.password && <span>パスワードを入力してください</span>}
                </Box>
                <Flex w="100%">
                  <Button mt={6} type="submit" fullWidth color="teal">
                    ログイン
                  </Button>
                </Flex>
              </Stack>
            </Flex>
          </Box>
        </Paper>
      </Flex>
    </Flex>
  );
};

export default Login;
