import { supabase } from '../../../utils/supabase';
import { useQuery } from '@tanstack/react-query';

export const useQueryRepair = (repairId: string) => {
  const getRepair = async () => {
    const { data } = await supabase
      .from('repairs')
      .select(
        `
      id,
      user_id,
      customer,
      deadline,
      deliveryPlace,
      comment,
      status,
      profiles(id, username),
      factories(id, name),
      repair_details(id, maker, product_name, size, quantity, comment),
      repair_contents(id, title, price, is_new)
      `
      )
      .eq('id', repairId)
      .single();
    console.log(data);
    return data;
  };
  return useQuery({
    queryKey: ['repairs', repairId],
    queryFn: getRepair,
  });
};
