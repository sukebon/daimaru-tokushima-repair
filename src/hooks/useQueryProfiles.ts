import { supabase } from '../../utils/supabase';
import { useQuery } from '@tanstack/react-query';
import useStore from '../../store';
import { Profile } from '../../types';

const useQueryProfiles = () => {
  const session = useStore((state) => state.session);
  const getProfiles = async () => {
    const { data } = await supabase.from('profiles').select('*');
    // if (session?.user.email === 'mukai@daimaru-hakui.co.jp') return data;
    return data;
  };
  return useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
  });
};

export default useQueryProfiles;
