import { Button, FormControl, OutlinedInput, TableCell, TableRow } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import ClearIcon from '@mui/icons-material/Clear';

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
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>
          <FormControl fullWidth size="small">
            <OutlinedInput
              {...register(`products.${productIndex}.productNumber` as const, { required: true })}
            />
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl fullWidth size="small">
            <OutlinedInput
              {...register(`products.${productIndex}.size` as const, { required: true })}
            />
          </FormControl>
        </TableCell>
        <TableCell >
          <FormControl fullWidth size="small" >
            <OutlinedInput type="number"
              {...register(`products.${productIndex}.quantity` as const, { required: true, min: 0 })}
            />
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl fullWidth size="small">
            <OutlinedInput
              {...register(`products.${productIndex}.comment`)} />
          </FormControl>
        </TableCell>
        <TableCell>
          <ClearIcon sx={{ color: "black", cursor: "pointer" }} onClick={() => removeProduct(productIndex)} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default MarkRow;