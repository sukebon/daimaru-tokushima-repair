import React from 'react';
import useSWR from 'swr';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserType } from '../../../types/Users';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}
const Users = () => {
  const { data } = useSWR('/api/users');
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >ランク</TableCell>
            <TableCell>名前</TableCell>
            <TableCell >メールアドレス</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.users?.map((user: UserType) => (
            <TableRow
              key={user.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.rank}
              </TableCell>
              <TableCell >{user.name}</TableCell>
              <TableCell >{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Users;