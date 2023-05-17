import { supabase } from '../../../utils/supabase';
import { useQuery } from '@tanstack/react-query';

export const useQueryRepair = (repairId: string | number) => {
  const getRepair = async () => {
    const { data } = await supabase
      .from('repairs')
      .select(
        `
      id,user_id,
      category,
      customer,
      deadline,
      deliveryPlace,
      comment,
      status,
      order_type,
      profiles(id, username),
      factories(id, name),
      repair_details(id, product_name, size, quantity, comment),
      repair_contents(id, title, price, is_new)
      `
      )
      .eq('id', repairId)
      .single();
    return data;
  };
  return useQuery({
    queryKey: ['repairs', repairId],
    queryFn: getRepair,
  });
};
