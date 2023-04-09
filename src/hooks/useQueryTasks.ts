import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Task } from '../../types';

export const useQueryTasks = () => {
  const router = useRouter();
  const getTasks = async () => {
    const { data } = await axios.get(`${process.env.NEXT_API_URL}/todo`);
    return data;
  };
  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: getTasks,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push('/login');
    },
  });
};
