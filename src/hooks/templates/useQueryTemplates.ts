import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../utils/supabase';

export const useQueryTemplates = () => {
  const getRepairTemplates = async () => {
    const { data, error } = await supabase
      .from('repair_templates')
      .select(
        `
      id,
      title,
      price,
      image_url,
      profiles(username),
      repair_categories(name),
      factories(name)
      `
      )
      .order('created_at', { ascending: false });
    return data;
  };
  return useQuery({
    queryKey: ['repair_templates'],
    queryFn: getRepairTemplates,
  });
};
