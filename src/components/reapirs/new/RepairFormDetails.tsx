import {
  Box,
  Button,
  Flex,
  NumberInput,
  Table,
  TextInput,
  createStyles,
} from '@mantine/core';
import React, { FC, useState } from 'react';
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form';
import { RepairInputs } from '../../../../types';
import { MdDragIndicator } from 'react-icons/md';
import { MdOutlineCancel } from 'react-icons/md';
import { MdAddCircle } from 'react-icons/md';
import useRepaireStore from '../../../../store/useRepaireStore';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

type Props = {
  register: UseFormRegister<RepairInputs>;
  control: Control<RepairInputs>;
  getValues: UseFormGetValues<RepairInputs>;
  errors: any;
};

export const RepairFormDetails: FC<Props> = ({
  register,
  control,
  getValues,
  errors,
}) => {
  const [dragIndex, setDragIndex] = useState<any>(null);
  const { classes } = useStyles();
  const repair = useRepaireStore((state) => state.repair);
  const setRepair = useRepaireStore((state) => state.setRepair);
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'repair_details',
  });
  const addProduct = () => {
    append({
      id: '',
      maker: '',
      product_name: '',
      size: '',
      quantity: '',
      comment: '',
    });
  };

  const removeProduct = (index: number) => {
    remove(index);
  };

  // ドラッグ&ドロップ
  const dragStart = (index: any) => {
    setDragIndex(index);
  };

  const dragEnter = (index: any) => {
    if (index === dragIndex) return;
    const startElement = { ...getValues().repair_details[dragIndex] };
    const enterElment = { ...getValues().repair_details[index] };
    update(index, {
      ...startElement,
    });
    update(dragIndex, {
      ...enterElment,
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
    <>
      <Box sx={{ overflowX: 'auto' }}>
        <Table
          sx={{ width: '1000px' }}
          w={{ md: '100%' }}
          verticalSpacing="xs"
          fontSize="sm"
          onDragOver={(e) => e.preventDefault()}
        >
          <thead>
            <tr>
              <th></th>
              <th>メーカー</th>
              <th>品名</th>
              <th>サイズ</th>
              <th>数量</th>
              <th>備考</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr
                key={field.id}
                className={
                  index === dragIndex ? classes.trDrag : classes.trNotDrag
                }
                onDragStart={() => dragStart(index)}
                onDragEnter={(e) => {
                  e.preventDefault();
                  dragEnter(index);
                }}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={dragEnd}
                onDrop={dragOndrop}
              >
                <td draggable={true}>
                  <MdDragIndicator
                    style={{ verticalAlign: 'middle' }}
                    cursor="pointer"
                    size="25px"
                  />
                </td>
                <td width="200px">
                  <TextInput
                    required
                    {...register(`repair_details.${index}.maker` as const)}
                  />
                </td>
                <td width="300px">
                  <TextInput
                    required
                    {...register(
                      `repair_details.${index}.product_name` as const
                    )}
                  />
                </td>
                <td draggable={false}>
                  <TextInput
                    w="90px"
                    {...register(`repair_details.${index}.size` as const)}
                  />
                </td>
                <td>
                  <Flex gap={6} align="center">
                    <FaMinusCircle
                      fontSize={16}
                      cursor="pointer"
                      onClick={() =>
                        update(index, {
                          id: getValues(`repair_details.${index}.id`),
                          maker: getValues(`repair_details.${index}.maker`),
                          product_name: getValues(
                            `repair_details.${index}.product_name`
                          ),
                          quantity:
                            Number(
                              getValues(`repair_details.${index}.quantity`)
                            ) - 1,
                          size: getValues(`repair_details.${index}.size`),
                          comment: getValues(`repair_details.${index}.comment`),
                        })
                      }
                    />
                    <TextInput
                      type="number"
                      w="90px"
                      sx={{
                        textAlign: 'right',
                        border:
                          getValues(`repair_details.${index}.quantity`) < 0
                            ? '2px solid red'
                            : 'blue',
                        borderRadius: '0.25rem',
                      }}
                      {...register(`repair_details.${index}.quantity`, {
                        required: true,
                        min: 0,
                      })}
                    />
                    <FaPlusCircle
                      fontSize={16}
                      cursor="pointer"
                      onClick={() =>
                        update(index, {
                          id: getValues(`repair_details.${index}.id`),
                          maker: getValues(`repair_details.${index}.maker`),
                          product_name: getValues(
                            `repair_details.${index}.product_name`
                          ),
                          quantity:
                            Number(
                              getValues(`repair_details.${index}.quantity`)
                            ) + 1,
                          size: getValues(`repair_details.${index}.size`),
                          comment: getValues(`repair_details.${index}.comment`),
                        })
                      }
                    />
                  </Flex>
                </td>
                <td>
                  <Flex gap={5} align="center">
                    <TextInput
                      w="150px"
                      {...register(`repair_details.${index}.comment`)}
                    />
                    <MdOutlineCancel
                      size={20}
                      cursor={index === 0 ? '' : 'pointer'}
                      opacity={index === 0 ? '0' : 1}
                      onClick={() => {
                        if (index === 0) return;
                        removeProduct(index);
                      }}
                    />
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>

      <Flex justify="center">
        <Button
          color="teal"
          leftIcon={<MdAddCircle />}
          variant="outline"
          size="md"
          onClick={addProduct}
        >
          行を追加
        </Button>
      </Flex>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  trDrag: {
    borderTop: '2px #12b886 solid',
  },
  trNotDrag: {
    borderTop: '0px',
  },
}));
