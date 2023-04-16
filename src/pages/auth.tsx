import useQueryProfiles from '@/hooks/useQueryProfiles';
import { Paper, Table } from '@mantine/core';
import React, { useEffect } from 'react';

const Auth = () => {
  const { data, error } = useQueryProfiles();
  return (
    <Paper w="100%" shadow="md" radius="md" p="lg" withBorder>
      <Table>
        <thead>
          <tr>
            <th>ユーザー名</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((value) => (
            <tr key={value.id}>
              <td>{value.username}</td>
              <td>{value.email}</td></tr>
          ))}
        </tbody></Table>
    </Paper>
  );
};

export default Auth;