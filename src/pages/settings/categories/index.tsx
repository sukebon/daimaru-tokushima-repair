import { Button, Flex, Paper, Table, TextInput } from '@mantine/core';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Category } from '../../../../types';
import { useMutateCategory } from '@/hooks/settings/useMutateCategory';
import { useForm } from 'react-hook-form';
import { useQueryCategories } from '@/hooks/settings/useQueryCategories';

const Categories = () => {
  const { createCategoryMutation, deleteCategoryMutation } =
    useMutateCategory();
  const { data, error, isLoading } = useQueryCategories();
  const { register, handleSubmit } = useForm<Category>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: Category) => {
    const result = window.confirm('登録して宜しいでしょうか');
    if (!result) return;
    createCategoryMutation.mutate(data);
  };

  return (
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
            label="カテゴリー名"
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
            <th style={{ width: '80%' }}>修理カテゴリー名</th>
            <th style={{ width: '20%' }}>編集/削除</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((value: Omit<Category, 'created_at' | 'updated_at'>) => (
            <tr key={value.id}>
              <td>{value.name}</td>
              <td>
                <Flex gap={12} justify="center">
                  {/* <EditFactoryModal factory={value} /> */}
                  <FaTrashAlt
                    cursor="pointer"
                    onClick={() => {
                      const result = window.confirm('削除して宜しいでしょうか');
                      if (!result) return;
                      deleteCategoryMutation.mutate(value?.id);
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
  );
};

export default Categories;
