import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../utils/supabase';
import useStore from '../../../store';
import { TemplateInputs } from '../../../types';

export const useMutateTemplate = () => {
  const session = useStore((state) => state.session);
  const queryClient = useQueryClient();

  const createTemplateMutation = useMutation({
    mutationFn: async (data: TemplateInputs) => {
      console.log(session);
      const { data: repairTemplate, error } = await supabase
        .from('repair_templates')
        .insert({
          title: data.title,
          factory_id: data.factory_id,
          category_id: data.category_id,
          price: data.price || 0,
          comment: data.comment || null,
          tag: data.tag || null,
          image_url: data.image_url || null,
          user_id: session?.user.id,
        })
        .select();
      return repairTemplate;
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(['repair_templates']);
    },
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('repair_templates')
        .delete()
        .eq('id', id);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(['repair_templates']);
    },
  });
  return { createTemplateMutation, deleteTemplateMutation };
};
