import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Factory } from '../../../types';
import { supabase } from '../../../utils/supabase';

export const useMutateFactory = () => {
  const queryClient = useQueryClient();

  const createFactoryMutation = useMutation({
    mutationFn: async (factory: Omit<Factory, 'created_at' | 'updated_at'>) => {
      const { data, error, status } = await supabase
        .from('factories')
        .insert({ name: factory.name })
        .select();
      if (status === 409) {
        alert('すでに登録されています');
      }
      if (error) throw error.message;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['factories']);
    },
  });

  const updateFactoryMutation = useMutation({
    mutationFn: async (factory: Omit<Factory, 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('factories')
        .update({ name: factory.name })
        .eq('id', factory.id)
        .select();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(['factories']);
    },
  });

  const deleteFactoryMutation = useMutation({
    mutationFn: async (factory: Omit<Factory, 'created_at' | 'updated_at'>) => {
      const { data, error, status } = await supabase
        .from('factories')
        .delete()
        .eq('id', factory.id);
      if (error) {
        window.alert('削除できませんでした。');
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['factories']);
    },
  });
  return {
    createFactoryMutation,
    updateFactoryMutation,
    deleteFactoryMutation,
  };
};
