import { supabase } from '../../../utils/supabase';
import { useQuery } from '@tanstack/react-query';

export const useQueryRepairNext = (repairId: string | number) => {
  const getRepairNext = async () => {
    const { data } = await supabase
      .from('repairs')
      .select('id')
      .gt('id', Number(repairId))
      .range(0, 1);
    return data;
  };
  return useQuery({
    queryKey: ['repairs', repairId, 'next'],
    queryFn: getRepairNext,
  });
};
