/* eslint-disable react-hooks/rules-of-hooks */
import { Box, FormControl, Grid, Input, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import { useForm, SubmitHandler } from "react-hook-form";
import useColorTheme from "@/hooks/UseColorTheme";

type Inputs = {
  email: string;
  password: string;
};

const login = () => {
  const { palette } = useColorTheme();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("email"));

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
            </FormControl>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default login;
