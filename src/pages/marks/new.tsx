// import Input from '@mui/joy/Input';
import { Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import MarkRow from '@/conponents/mark/MarkRow';
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { Typography, MenuItem, Grid } from '@mui/material';
import { grey } from '@mui/material/colors';

type Inputs = {
  factory: string;
  deliveryPlace: string;
  products: {
    productNumber: string,
    size: string,
    quantity: number,
    comment: string;
  }[];
};

const MarksNew = () => {
  const { register, handleSubmit, control, } = useForm<Inputs>({
    defaultValues: {
      factory: "",
      deliveryPlace: "",
      products: [{
        productNumber: "",
        size: "",
        quantity: 0,
        comment: ""
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const addProduct = () => {
    append({
      productNumber: "",
      size: "",
      quantity: 0,
      comment: ""
    });
  };

  const removeProduct = (index: number) => {
    remove(index);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <Paper elevation={2} >
      <Box p={2} bgcolor="#fff" borderRadius={6}>
        <Box width="100%" textAlign="center">
          <Typography variant="h4" component="h2">修理伝票</Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container flexDirection="column" gap={2}>
            <TextField select sx={{ width: "300px" }} label="加工場" variant="outlined" size="small"
              {...register("factory", { required: true })}
            >
              <MenuItem value="徳島">
                徳島工場
              </MenuItem>
              <MenuItem value="大野制帽所">
                大野制帽所
              </MenuItem>
            </TextField>
            <TextField sx={{ width: "300px" }} label="納入先" variant="outlined" size="small"
              {...register("deliveryPlace", { required: true })}
            />
          </Grid>
          <TableContainer component={Paper} variant="outlined" sx={{ mt: 3 }}>
            <Table size="small" sx={{ minWidth: 1000 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: grey["A100"] }}>
                <TableRow>
                  <TableCell width="40%">品名</TableCell>
                  <TableCell width="10%">サイズ</TableCell>
                  <TableCell width="10%">数量</TableCell>
                  <TableCell width="30%">備考</TableCell>
                  <TableCell width="10%">削除</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((field, index) => (
                  <MarkRow
                    key={field.id}
                    register={register}
                    productIndex={index}
                    removeProduct={removeProduct}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" onClick={addProduct} sx={{ mt: 3 }} > 追加</Button>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 6 }}>
            送信
          </Button>
        </form>
      </Box >
    </Paper>
  );
};

export default MarksNew;