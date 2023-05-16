import { supabase } from '../../../utils/supabase';
import { useQuery } from '@tanstack/react-query';

export const useQueryRepairPrev = (repairId: string | number) => {
  const getRepair = async () => {
    const { data } = await supabase
      .from('repairs')
      .select('id')
      .lt('id', Number(repairId))
      .range(0, 1);
    return data?.find((_, i) => i === 0);
  };
  return useQuery({
    queryKey: ['repairs', repairId, 'prev'],
    queryFn: getRepair,
  });
};
