import React from 'react';
import { supabase } from '../../../utils/supabase';
import { useQuery } from '@tanstack/react-query';

export const useQueryCategories = () => {
  const getCategories = async () => {
    const { data, error } = await supabase
      .from('repair_categories')
      .select('*')
      .order('created_at', { ascending: true });
    return data;
  };
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};
