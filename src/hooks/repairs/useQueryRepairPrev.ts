import { supabase } from '../../../utils/supabase';
import { useQuery } from '@tanstack/react-query';

export const useQueryRepairPrev = (repairId: string | number) => {
  const getRepairPrev = async () => {
    const { data } = await supabase
      .from('repairs')
      .select('id')
      .lt('id', Number(repairId))
      .order('id', { ascending: false })
      .range(0, 1);
    return data;
  };
  return useQuery({
    queryKey: ['repairs', repairId, 'prev'],
    queryFn: getRepairPrev,
  });
};
