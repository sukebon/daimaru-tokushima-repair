import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../../utils/supabase';
import useStore from '../../../store';

type TemplateInputs = {
  title: string;
  category_id: string;
  price: number;
  factory_id: string;
  image_url: string;
  user_id: string;
};

export const useMutateTemplate = () => {
  const session = useStore((state) => state.session);

  const createTemplateMutation = useMutation({
    mutationFn: async (data: TemplateInputs) => {
      console.log(session);
      const { data: repairTemplate, error } = await supabase
        .from('repair_templates')
        .insert({
          title: data.title,
          factory_id: data.factory_id || null,
          category_id: data.category_id || null,
          price: data.price,
          image_url: data.image_url || null,
          user_id: session?.user.id,
        })
        .select();
      return repairTemplate;
    },
    onSuccess: (data) => {},
  });
  return { createTemplateMutation };
};
