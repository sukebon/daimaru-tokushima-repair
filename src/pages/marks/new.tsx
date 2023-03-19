// import Input from '@mui/joy/Input';
import { Button, Table, TextInput, Flex, Paper, Stack, NumberInput, Box, Input, Autocomplete, Textarea, Radio, Group } from '@mantine/core';
import MarkRow from '@/conponents/mark/MarkRow';
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { MarkInputs } from '../../../types/repair';
import styles from "../../styles/input.module.css";
import { useState } from 'react';
import { MdAddCircle } from "react-icons/md";

const MarksNew = () => {
  const [dragIndex, setDragIndex] = useState<any>(null);
  const defaultProducts = () => {
    const obj = {
      productNumber: "",
      size: "",
      quantity: "",
      comment: ""
    };
    const array = [...Array(5)].map(() => (obj));
    return array;
  };
  const { getValues, register, handleSubmit, control, } = useForm<MarkInputs>({
    defaultValues: {
      factory: "",
      deadline: null,
      deliveryPlace: "",
      client: "",
      price: 0,
      orderType: "",
      category: "",
      products: defaultProducts(),
    }
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "products",
  });

  const addProduct = () => {
    append({
      productNumber: "",
      size: "",
      quantity: "",
      comment: ""
    });
  };

  const removeProduct = (index: number) => {
    remove(index);
  };

  const onSubmit: SubmitHandler<MarkInputs> = (data) => {
    console.log(data);
  };

  // ドラッグ&ドロップ
  const dragStart = (index: any) => {
    setDragIndex(index);
  };

  const dragEnter = (index: any) => {
    if (index === dragIndex) return;
    const startElement = { ...getValues().products[dragIndex] };
    const enterElment = { ...getValues().products[index] };
    update(index, {
      ...startElement
    });
    update(dragIndex, {
      ...enterElment
    });
    setDragIndex(index);
  };

  const dragEnd = () => {
    setDragIndex(null);
  };

  const dragOndrop = () => {
    setDragIndex(null);
  };

  return (
    <Paper
      w="100%"
      shadow="md"
      radius="md"
      p="lg"
      withBorder
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Autocomplete w="100%" label="加工場" maw="500px" required
            {...register("factory", { required: true })}
            onChange={getValues}
            data={['徳島工場', '大野制帽所', 'ひつじや', 'トシカワ']}
          />
          <Flex gap={16} sx={{ flexDirection: "column" }} direction={{ sm: "row" }}>
            <TextInput w="100%" label="顧客名" required
              {...register("client", { required: true })}
            />
            <Autocomplete w="100%" label="納入先" required
              {...register("deadline", { required: true })}
              onChange={getValues}
              data={['配送センター', 'ウィルフィット', '神戸店']}
            />
          </Flex>
          <Flex gap={16} align="center">
            <TextInput type="date" w="50%" maw="200px" label="納期"
              {...register("deliveryPlace")}
            />
            <NumberInput w="50%" maw="200px" label="価格" required
              {...register("price", { required: true })}
              onChange={() => Number(getValues('price'))}
              max={1000000}
              min={0}
            />
          </Flex>
          <Flex gap={5}>
            <Radio.Group
              withAsterisk
              label="タイプ"
              px={20}
            >
              <Group mt="xs">
                <Radio value="1" label="修理"  {...register("orderType", { required: true })} />
                <Radio value="2" label="マーク"  {...register("orderType", { required: true })} />
              </Group>
            </Radio.Group>
            <Radio.Group
              withAsterisk
              label="区分"
            >
              <Group mt="xs">
                <Radio value="1" label="前回通り"  {...register("category", { required: true })} />
                <Radio value="2" label="新規"  {...register("category", { required: true })} />
              </Group>
            </Radio.Group>
          </Flex>
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ width: "1000px" }} w={{ xl: "auto" }} verticalSpacing="xs" fontSize="md" onMouseOut={() => setDragIndex(null)} >
              <thead >
                <tr >
                  <th></th>
                  <th>品名</th>
                  <th>サイズ</th>
                  <th>数量</th>
                  <th>備考</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <MarkRow
                    key={field.id}
                    register={register}
                    getValues={getValues}
                    productIndex={index}
                    removeProduct={removeProduct}
                    dragStart={dragStart}
                    dragEnter={dragEnter}
                    dragEnd={dragEnd}
                    dragOndrop={dragOndrop}
                    dragIndex={dragIndex}
                  />
                ))}
              </tbody>
            </Table>
          </Box>
          <Flex justify="center">
            <Button leftIcon={<MdAddCircle />} variant="outline" size="md" onClick={addProduct}> 追加</Button>
          </Flex>
          <Textarea
            placeholder="コメント"
            label="コメント"
            size="sm"
          />
          <Button type="submit" fullWidth sx={{ mt: 6 }}>
            送信
          </Button>
        </Stack>
      </form>
    </Paper >
  );
};

export default MarksNew;