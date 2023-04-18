import { Flex, NumberInput, TextInput } from '@mantine/core';
import { NextPage } from 'next';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { RepaireInputs } from '../../../types';
import { MdOutlineCancel } from 'react-icons/md';
import styles from '../../styles/input.module.css';
import { MdDragIndicator } from 'react-icons/md';

type Props = {
  register: UseFormRegister<RepaireInputs>;
  getValues: UseFormRegister<RepaireInputs>;
  productIndex: number;
  removeProduct: (index: number) => void;
  dragStart: (index: number) => void;
  dragEnter: (index: number) => void;
  dragEnd: () => void;
  dragOndrop: () => void;
  dragIndex: any;
};

const RepairRow: NextPage<Props> = ({
  register,
  getValues,
  productIndex,
  removeProduct,
  dragStart,
  dragEnter,
  dragEnd,
  dragOndrop,
  dragIndex,
}) => {
  return (
    <>
      <tr
        draggable={true}
        className={
          productIndex === dragIndex ? styles.trDrag : styles.trNotDrag
        }
        onDragStart={() => dragStart(productIndex)}
        onDragEnter={(e) => {
          e.preventDefault();
          dragEnter(productIndex);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={dragEnd}
        onDrop={dragOndrop}
      >
        <td>
          <MdDragIndicator
            style={{ verticalAlign: 'middle' }}
            cursor="pointer"
            size="25px"
          />
        </td>
        <td width="50%" >
          <TextInput
            {...register(`products.${productIndex}.productNumber` as const)}
          />
        </td>
        <td draggable={false} >
          <TextInput
            w="90px"
            {...register(`products.${productIndex}.size` as const)}
          />
        </td>
        <td >
          <NumberInput
            w="90px"
            {...register(`products.${productIndex}.quantity`)}
            onChange={() =>
              Number(getValues(`products.${productIndex}.quantity`))
            }
            max={10000}
            min={0}
          />
        </td>
        <td >
          <Flex gap={5} align="center">
            <TextInput
              w="100%"
              {...register(`products.${productIndex}.comment`)}
            />
            <MdOutlineCancel
              size={25}
              cursor="pointer"
              onClick={() => removeProduct(productIndex)}
            />
          </Flex>
        </td>
      </tr>
    </>
  );
};

export default RepairRow;
