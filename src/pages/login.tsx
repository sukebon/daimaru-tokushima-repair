/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Flex, Paper, PasswordInput, Stack, TextInput } from "@mantine/core";
import { MdLock } from "react-icons/md";
import { AuthForm } from "../../types";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  // const { login, setEmail, setPassword } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthForm>({
    defaultValues: {
      email: '',
      password: ''
    }
  });


  const onSubmit: SubmitHandler<AuthForm> = async (data) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: data.email,
        password: data.password,
      });
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Paper w={{ base: "100%", xs: "350px" }} shadow="md" radius="md" m="xs" p="xl" withBorder>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("email", { required: true })}
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
                {...register("password", { required: true })}
                required
              />
              {errors.password && <span>パスワードを入力してください</span>}
            </Box>
            <Flex w="100%">
              <Button mt={6} type="submit" fullWidth>
                ログイン
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Box>
    </Paper>
  );
};

export default Login;
