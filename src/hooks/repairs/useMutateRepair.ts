import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { supabase } from '../../../utils/supabase';
import { RepairInputs } from '../../../types';

export const useMutateRepair = () => {
  const queryClient = useQueryClient();

  const createRepairMutation = useMutation({
    mutationFn: async (repair: Omit<RepairInputs, 'products'>) => {
      const { data, error } = await supabase
        .from('repairs')
        .insert(repair)
        .select();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data: any) => {
      queryClient.setQueryData(['repair'], data[0]);
    },
    onError: (err: any) => {
      alert(err.message);
    },
  });
  return { createRepairMutation };
};
