import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../utils/supabase';

export const useQueryTemplate = (id: string) => {
  const getRepairTemplate = async () => {
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
      .eq('id', id)
      .single();
    return data;
  };
  return useQuery({
    queryKey: ['repair_templates', id],
    queryFn: getRepairTemplate,
  });
};
