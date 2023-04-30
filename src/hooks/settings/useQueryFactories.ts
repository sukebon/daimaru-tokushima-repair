import { supabase } from '../../../utils/supabase';
import { useQuery } from '@tanstack/react-query';

export const useQueryFactories = () => {
  const getFactories = async () => {
    const { data, error, status } = await supabase
      .from('factories')
      .select('*')
      .order('created_at', { ascending: false });
    return data;
  };
  return useQuery({
    queryKey: ['factories'],
    queryFn: getFactories,
  });
};
