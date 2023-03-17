// import Input from '@mui/joy/Input';
import { Button, Table, TextInput, NumberInput, Flex, Box, Select } from '@mantine/core';
import MarkRow from '@/conponents/mark/MarkRow';
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

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

    <Box p={2}  >
      <Flex w="100%">
        <TextInput />
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={2}>
          <TextInput sx={{ width: "300px" }} label="factory" variant="outlined" size="small"
            {...register("factory", { required: true })}
          />
          <TextInput sx={{ width: "300px" }} label="納入先" variant="outlined" size="small"
            {...register("deliveryPlace", { required: true })}
          />
        </Flex>
        <Table verticalSpacing="xs" fontSize="md">
          <thead>
            <tr>
              <th>品名</th>
              <th>サイズ</th>
              <th>数量</th>
              <th>備考</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <MarkRow
                key={field.id}
                register={register}
                productIndex={index}
                removeProduct={removeProduct}
              />
            ))}
          </tbody>
        </Table>
        <Button variant="outline" color="teal" size="md" onClick={addProduct}> 追加</Button>
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 6 }}>
          送信
        </Button>
      </form>
    </Box >
  );
};

export default MarksNew;