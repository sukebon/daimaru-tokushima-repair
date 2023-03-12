/* eslint-disable react-hooks/rules-of-hooks */
import { Box, FormControl, Grid, Input, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import { useForm, SubmitHandler } from "react-hook-form";
import useColorTheme from "@/hooks/UseColorTheme";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";

type Inputs = {
  email: string;
  password: string;
};

const Signin = () => {
  const router = useRouter();
  const { palette } = useColorTheme();
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
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          top: "50%",
          left: "50%",
          position: "absolute",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              width: 350,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid
              container
              width="100%"
              spacing={2}
              direction="column"
              alignItems="center"
            >
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <LockIcon />
                </Grid>
                <Grid item>Sign In</Grid>
              </Grid>
              <Grid item width="100%">
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="email"
                  {...register("email", { required: true })}
                />
                {errors.email && <span>This field is required</span>}
              </Grid>
              <Grid item width="100%">
                <TextField
                  type="password"
                  fullWidth
                  id="outlined-controlled"
                  label="password"
                  {...register("password", { required: true })}
                />
                {errors.password && <span>This field is required</span>}
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Button type="submit" variant="contained" fullWidth>
                  送信
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box >
    </Box >
  );
};

export default Signin;
