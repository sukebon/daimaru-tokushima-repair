import { Button, Table, TextInput } from '@mantine/core';
import { NextPage } from 'next';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

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

type Props = {
  register: UseFormRegister<Inputs>;
  productIndex: number;
  removeProduct: (index: number) => void;
};

const MarkRow: NextPage<Props> = ({ register, productIndex, removeProduct }) => {

  return (
    <>
      <tr>
        <td>
          <TextInput
            {...register(`products.${productIndex}.productNumber` as const, { required: true })}
          />

        </td>
        <td>
          <TextInput
            {...register(`products.${productIndex}.size` as const, { required: true })}
          />
        </td>
        <td >
          <TextInput
            {...register(`products.${productIndex}.quantity` as const, { required: true, min: 0 })}
          />
        </td>
        <td>
          <TextInput
            {...register(`products.${productIndex}.comment`)}
          />
        </td>
        <td>
          {/* <ClearIcon sx={{ color: "black", cursor: "pointer" }} onClick={() => removeProduct(productIndex)} /> */}
        </td>
      </tr>
    </>
  );
};

export default MarkRow;