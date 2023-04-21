import { Box, Button, Flex, Table, TextInput } from '@mantine/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutateFactory } from '@/hooks/settings/useMutateFactory';
import { useQueryFactories } from '@/hooks/settings/useQueryFactories';
import { Factory } from '../../../../types';
import { EditFactoryModal } from '@/conponents/settings/EditFactoryModal';

const Factory = () => {
  const { createFactoryMutation, deleteFactoryMutation } = useMutateFactory();
  const { data, error, isLoading } = useQueryFactories();
  const { register, handleSubmit } = useForm<Factory>(
    {
      defaultValues: {
        name: ""
      },
    }
  );

  const onSubmit = async (data: Factory) => {
    createFactoryMutation.mutate(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={6} align="end">
          <TextInput label="工場名" {...register('name', { required: true })} required />
          <Button type="submit">登録</Button>
        </Flex>
      </form>
      <Table>
        <thead>
          <tr>
            <th>カテゴリー名</th>
            <th>編集</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>{data?.map((value: Omit<Factory, 'created_at' | 'updated_at'>) => (
          <tr key={value.id}>
            <td>{value.name}</td>
            <td><EditFactoryModal factory={value} /></td>
            <td><Button onClick={() => deleteFactoryMutation.mutate(value)}>削除</Button></td>
          </tr>
        ))}</tbody>
      </Table>
    </Box>
  );
};

export default Factory;