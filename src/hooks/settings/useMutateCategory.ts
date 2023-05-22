import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../utils/supabase';
import { Category } from '../../../types';

export const useMutateCategory = () => {
  const queryClient = useQueryClient();
  const createCategoryMutation = useMutation({
    mutationFn: async (cateogry: Category) => {
      const { data, error, status } = await supabase
        .from('repair_categories')
        .insert({
          name: cateogry.name,
        });
      if (status === 409) {
        alert('すでに登録されています');
      }
      if (error) throw error.message;
      return cateogry;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['categories']);
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error, status } = await supabase
        .from('repair_categories')
        .delete()
        .eq('id', id);
      if (error) {
        window.alert('削除できませんでした。');
        return new Error(error.message);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['categories']);
    },
  });
  return { createCategoryMutation, deleteCategoryMutation };
};
