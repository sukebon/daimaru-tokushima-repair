import { supabase } from '../../../utils/supabase';
import { useQuery } from '@tanstack/react-query';

export const useQueryRepairs = () => {
  const getRepairs = async () => {
    const { data } = await supabase
      .from('repairs')
      .select(
        `
      id,user_id,
      customer,
      deadline,
      deliveryPlace,
      comment,
      status,
      profiles(id, username),
      factories(id, name),
      repair_details(id, product_name, size, quantity, comment),
      repair_contents(id, title, price, is_new)
      `
      )
      .order('id', { ascending: false });

    return data;
  };
  return useQuery({
    queryKey: ['repairs'],
    queryFn: getRepairs,
  });
};
