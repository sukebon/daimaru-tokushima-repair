/* eslint-disable react-hooks/rules-of-hooks */
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Flex, Paper, PasswordInput, Stack, TextInput } from "@mantine/core";
import { MdLock } from "react-icons/md";
import { useAuth } from "@/hooks/useAuth";

type Inputs = {
  email: string;
  password: string;
};

const Signup = () => {
  const { signup, setEmail, setPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setEmail(data.email);
    setPassword(data.password);
    signup();
  };

  return (
    <Flex
      justify="center"
      align="center"
      h="100vh"
      bg="#f4f4f4"
    >
      <Paper w={{ base: "100%", xs: "350px" }} shadow="md" radius="md" m="xs" p="xl" withBorder>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Flex justify="center" direction="column" align="center">
            <MdLock size="30px" />
            Sign Up
            <Stack spacing="sm" w="100%">
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
                  登録
                </Button>
              </Flex>
            </Stack>
          </Flex>
        </Box>
      </Paper>
    </Flex >
  );
};

export default Signup;
