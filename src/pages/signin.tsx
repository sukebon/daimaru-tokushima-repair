/* eslint-disable react-hooks/rules-of-hooks */
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import { Box, Button, Flex, Paper, PasswordInput, Stack, TextInput } from "@mantine/core";

type Inputs = {
  email: string;
  password: string;
};

const Signin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const email = data.email;
    const password = data.password;
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      router.push('/');
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Flex
      justify="center"
      align="center"
      h="100vh"
      bg="#f4f4f4"
    >
      <Paper shadow="md" radius="md" p="xl" withBorder>
        <Box component="form" w="100%" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Flex w="100%" justify="center" direction="column" align="center">
            Sign In
            <Stack spacing="sm" w="350px">
              <Box>
                <TextInput
                  w="100%"
                  id="outlined-controlled"
                  label="email"
                  {...register("email", { required: true })}
                  required
                />
                {errors.email && <span>emailを入力してください</span>}
              </Box>
              <Box>
                <PasswordInput
                  w="100%"
                  label="password"
                  placeholder="Your password"
                  id="your-password"
                  {...register("password", { required: true })}
                  required
                />
                {errors.password && <span>パスワードを入力してください</span>}
              </Box>
              <Flex w="100%">
                <Button mt={6} type="submit" fullWidth>
                  送信
                </Button>
              </Flex>
            </Stack>
          </Flex>
        </Box>
      </Paper>
    </Flex >
  );
};

export default Signin;
