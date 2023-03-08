/* eslint-disable react-hooks/rules-of-hooks */
import { Box, FormControl } from "@mui/material";
import Input from '@mui/joy/Input';
import { useForm, SubmitHandler } from "react-hook-form";
import { transform } from "typescript";

type Inputs = {
  example: string,
  exampleRequired: string,
};

const login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  console.log(watch("example"));

  return (
    <Box sx={{
      width: '100%',
      height: "90vh",
      position: "relative",

    }}>
      <Box sx={{
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%,-50%)"
      }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ width: 200, display: "flex", flexDirection: "column" }}>
            <FormControl>
              <Input defaultValue="test" {...register("example")} />
              <Input {...register("exampleRequired", { required: true })} />
              {errors.exampleRequired && <span>This field is required</span>}
              <Input type="submit" />
            </FormControl>
          </Box>
        </form >
      </Box>
    </Box>
  );
};

export default login;