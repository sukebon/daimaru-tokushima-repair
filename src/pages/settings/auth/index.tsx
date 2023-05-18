import useQueryProfiles from '@/hooks/useQueryProfiles';
import { Paper, Table } from '@mantine/core';
import React, { useEffect } from 'react';
import { Profile } from '../../../../types';
import { FaEdit } from 'react-icons/fa';

const Auth = () => {
  const { data, error } = useQueryProfiles();
  return (
    <Paper w="100%" shadow="md" radius="md" p="lg" withBorder>
      <Table>
        <thead>
          <tr>
            <th>ユーザー名</th>
            <th>email</th>
            <th>編集</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((value) => (
            <tr key={value.id}>
              <td>{value.username}</td>
              <td>{value.email}</td>
              <td>
                <FaEdit />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default Auth;
