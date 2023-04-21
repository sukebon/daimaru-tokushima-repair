import React from 'react';
import { supabase } from '../../../utils/supabase';
import { useQuery } from '@tanstack/react-query';
import { Factory } from '../../../types';

export const useQueryFactories = () => {
  const getFactories = async () => {
    const { data, error, status } = await supabase
      .from('factories')
      .select('*')
      .order('created_at', { ascending: false });
    return data;
  };
  return useQuery<any>({
    queryKey: ['factories'],
    queryFn: getFactories,
  });
};
