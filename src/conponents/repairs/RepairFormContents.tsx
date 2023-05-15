import { Box, Button, Checkbox, Flex, Input, NumberInput, Text, TextInput } from '@mantine/core';
import React, { FC } from 'react';
import { Control, UseFormGetValues, UseFormRegister, useFieldArray } from 'react-hook-form';
import { RepairInputs } from '../../../types';
import { MdOutlineCancel } from 'react-icons/md';
import { MdAddCircle } from 'react-icons/md';

type Props = {
  register: UseFormRegister<RepairInputs>;
  control: Control<RepairInputs>;
  getValues: UseFormGetValues<RepairInputs>;
};

export const RepairFormContents: FC<Props> = ({ register, control, getValues }) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "contents"
  });

  const addContent = () => {
    append({
      title: '',
      price: 0,
      path: '',
      is_new: false
    });
  };
  const removeContent = (index: number) => {
    remove(index);
  };

  return (
    <>
      <Box sx={{ overflowX: 'auto' }}>
        {fields.map((field, index) => (
          <Box key={field.id} mb={16} sx={{ width: '800px' }} w={{ lg: "100%" }}>
            <Flex gap={16}  >
              <TextInput
                w="100%"
                label={index === 0 ? "修理名" : ""}
                required
                {...register(`contents.${index}.title` as const, { required: true })}
              />
              <NumberInput
                w='150px'
                label={index === 0 ? "価格" : ""}
                required
                defaultValue={0}
                {...register(`contents.${index}.price` as const, { required: true })}
                onChange={() => getValues()}
                max={1000000}
                min={0}
              />
              <TextInput
                display="none"
                {...register(`contents.${index}.path` as const)}
              />
              <Box>
                {index === 0 ? <Box>　</Box> : ""}
                <Flex align="center" gap={12}>
                  <Button color="teal">テンプレート</Button>
                  <MdOutlineCancel
                    size={20}
                    cursor={index === 0 ? '' : 'pointer'}
                    opacity={index === 0 ? 0 : 1}
                    onClick={() => {
                      if (index === 0) return;
                      removeContent(index);
                    }}
                  />
                </Flex>
              </Box>
            </Flex>
            <Checkbox
              mt="sm"
              label="新規の場合はチェック"
              color='teal'
              {...register(`contents.${index}.is_new` as const)}
            />
          </Box>
        ))}
      </Box>
      <Flex justify="center" >
        <Button
          color="teal"
          leftIcon={<MdAddCircle />}
          variant="outline"
          size="md"
          onClick={addContent}
        >
          修理を追加
        </Button>
      </Flex>
    </>
  );
};


