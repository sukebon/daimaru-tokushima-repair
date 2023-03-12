// import Input from '@mui/joy/Input';
import { useState } from 'react';
import { Box, Paper, Input, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import MarkRow from '@/conponents/mark/MarkRow';
import { MarkType } from '../../../types/MarkType';
// import { useForm, SubmitHandler } from "react-hook-form";

const MarksNew = () => {
  const [items, setItems] = useState({
    products: [
      {
        productNumber: "",
        size: "",
        quantity: 0,
        comment: ""
      },
    ]
  } as MarkType);

  const addRow = () => {
    setItems((prev) => {
      const newItems = {
        ...prev,
        products: [
          ...items.products, {
            productNumber: "",
            size: "",
            quantity: 0,
            comment: ""
          },]
      };
      return newItems;
    });
  };
  console.log(items);
  return (
    <Box p={1} bgcolor="#fff">
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="300px">品名</TableCell>
              <TableCell width="50px">サイズ</TableCell>
              <TableCell width="50px">数量</TableCell>
              <TableCell width="200px">備考</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.products.map((product, index) => (
              <MarkRow
                key={index}
                items={items}
                setItems={setItems}
                product={product}
                rowIndex={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box onClick={addRow}>追加</Box>
    </Box >
  );
};

export default MarksNew;