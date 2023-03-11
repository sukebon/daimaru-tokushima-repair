import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Box, FormControl, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router';

type Inputs = {
  email: string;
  password: string;
};

const Signup = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const email = data.email;
    const password = data.password;
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log(user.uid);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              width: 350,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControl>
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
                  <Grid item>Sign Up</Grid>
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
                    fullWidth
                    id="outlined-controlled"
                    label="password"
                    {...register("password", { required: true, minLength: 6 })}
                  />
                  {errors.password && <span>パスワードは6文字以上で設定してください</span>}
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <Button type="submit" variant="contained" fullWidth>
                    送信
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </Box>
        </form>
      </Box >
    </Box >
  );
};

export default Signup;