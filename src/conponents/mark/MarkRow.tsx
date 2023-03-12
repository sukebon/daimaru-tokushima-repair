import { FormControl, OutlinedInput, TableCell, TableRow } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { MarkType } from '../../../types/MarkType';

type Props = {
  items: MarkType;
  setItems: Function;
  product: {
    productNumber: string;
    size: string;
    quantity: number;
    comment: string;
  };
  rowIndex: number;
};

const MarkRow: NextPage<Props> = ({ items, setItems, product, rowIndex }) => {

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setItems(() => {
      let newArray = [];
      newArray = items.products.map((product, index) =>
        index === rowIndex ? { ...product, [name]: value } : product
      );
      return { ...items, products: [...newArray] };
    });
  };

  return (
    <>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>
          <FormControl fullWidth>
            <OutlinedInput
              name="productNumber"
              size="small"
              placeholder="品番"
              value={product.productNumber}
              onChange={handleChange} />

          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl fullWidth>
            <OutlinedInput
              name="size"
              size="small"
              placeholder="サイズ"
              value={product.size}
              onChange={handleChange} />
          </FormControl>
        </TableCell>
        <TableCell >
          <FormControl fullWidth>
            <OutlinedInput
              type='number'
              name="quantity"
              size="small"
              placeholder="数量"
              value={product.quantity}
              onChange={handleChange} />
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl fullWidth>
            <OutlinedInput
              name="comment"
              size="small"
              placeholder="備考"
              value={product.comment}
              onChange={handleChange} />
          </FormControl>
        </TableCell>
      </TableRow>
    </>
  );
};

export default MarkRow;