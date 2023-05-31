import { Box, Button, Flex, Paper, Table, TextInput } from '@mantine/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutateFactory } from '@/hooks/settings/useMutateFactory';
import { useQueryFactories } from '@/hooks/settings/useQueryFactories';
import { Factory } from '../../../../types';
import { EditFactoryModal } from '@/components/settings/EditFactoryModal';
import { FaTrashAlt } from 'react-icons/fa';
import Layout from '@/components/Layout';

const Factory = () => {
  const { createFactoryMutation, deleteFactoryMutation } = useMutateFactory();
  const { data, error, isLoading } = useQueryFactories();
  const { register, handleSubmit } = useForm<Factory>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: Factory) => {
    const result = window.confirm('登録して宜しいでしょうか');
    if (!result) return;
    createFactoryMutation.mutate(data);
  };

  return (
    <Layout>
      <Paper
        w="100%"
        maw="500px"
        shadow="md"
        radius="md"
        p="lg"
        m="auto"
        withBorder
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={6} align="end">
            <TextInput
              w="100%"
              label="工場名"
              {...register('name', { required: true })}
              required
            />
            <Button color="teal" type="submit">
              登録
            </Button>
          </Flex>
        </form>
        <Table mt={12}>
          <thead>
            <tr>
              <th style={{ width: '80%' }}>工場名</th>
              <th style={{ width: '20%' }}>編集/削除</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((value: Omit<Factory, 'created_at' | 'updated_at'>) => (
              <tr key={value.id}>
                <td>{value.name}</td>
                <td>
                  <Flex gap={12} justify="center">
                    <EditFactoryModal factory={value} />
                    <FaTrashAlt
                      cursor="pointer"
                      onClick={() => {
                        const result =
                          window.confirm('削除して宜しいでしょうか');
                        if (!result) return;
                        deleteFactoryMutation.mutate(value);
                      }}
                    >
                      削除
                    </FaTrashAlt>
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Layout>
  );
};

export default Factory;
