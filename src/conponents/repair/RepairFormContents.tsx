import { Box, Button, Flex, Input, NumberInput, TextInput } from '@mantine/core';
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
    });
  };
  const removeContent = (index: number) => {
    remove(index);
  };

  return (
    <>
      <Box sx={{ overflowX: 'auto' }}>
        <Box
          sx={{ width: '800px' }}
          w={{ lg: "100%" }}>
          {fields.map((field, index) => (
            <Flex key={field.id} w="100%" gap={16} mb={16}>
              {index === 0 ? (
                <>
                  <TextInput
                    w="100%"
                    label="修理名"
                    required
                    {...register(`contents.${index}.title` as const, { required: true })}
                  />
                  <NumberInput
                    w='150px'
                    label="価格"
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
                    <Box>　</Box>
                    <Flex align="center" gap={12}>
                      <Button color="teal">テンプレート</Button>
                      <MdOutlineCancel
                        size={20}
                        cursor={index === 0 ? '' : 'pointer'}
                        opacity={index === 0 ? '0' : 1}
                        onClick={() => {
                          if (index === 0) return;
                          removeContent(index);
                        }}
                      />
                    </Flex>
                  </Box>
                </>
              ) : (
                <>
                  <Input
                    w="100%"
                    {...register(`contents.${index}.title` as const)}
                  />
                  <NumberInput
                    w='150px'
                    required
                    defaultValue={0}
                    {...register(`contents.${index}.price` as const, { required: true })}
                    onChange={() => getValues()}
                    max={1000000}
                    min={0}
                  />
                  <Input
                    display="none"
                    {...register(`contents.${index}.path` as const)}
                  />
                  <Flex align="center" gap={12}>
                    <Button color="teal">テンプレート</Button>
                    <MdOutlineCancel
                      size={20}
                      cursor={index === 0 ? '' : 'pointer'}
                      opacity={index === 0 ? '0' : 1}
                      onClick={() => {
                        if (index === 0) return;
                        removeContent(index);
                      }}
                    />
                  </Flex>
                </>
              )}
            </Flex>
          ))}
        </Box>
      </Box>
      <Flex justify="center">
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


