import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { supabase } from '../../../utils/supabase';

type TemplateInputs = {
  title: string;
  category_id: string;
  price: number;
  factory_id: string;
  image_url: string;
};

export const useMutateTemplate = () => {
  const createTemplateMutation = useMutation({
    mutationFn: async (data: TemplateInputs) => {
      const { data: repairTemplate, error } = await supabase
        .from('repair_templates')
        .insert({
          title: data.title,
          factory_id: data.factory_id || null,
          category_id: data.category_id || null,
          price: data.price,
          image_url: data.image_url || null,
        })
        .select();
      return repairTemplate;
    },
    onSuccess: (data) => {},
  });
  return { createTemplateMutation };
};
