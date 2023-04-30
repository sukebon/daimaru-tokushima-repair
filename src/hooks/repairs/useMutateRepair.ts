import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../utils/supabase';
import { RepairInputs } from '../../../types';

export const useMutateRepair = () => {
  const queryClient = useQueryClient();

  const createRepairMutation = useMutation({
    mutationFn: async (repair: RepairInputs) => {
      const { data, error } = await supabase
        .from('repairs')
        .insert({
          factory_id: repair.factory.id,
          deadline: repair.deadline,
          deliveryPlace: repair.deliveryPlace,
          customer: repair.customer,
          order_type: repair.orderType,
          category: repair.category,
          comment: repair.comment,
          user_id: repair.user_id,
        })
        .select();
      if (error) throw new Error(error.message);

      const products = repair.products.map((product) => ({
        product_name: product.product_name,
        size: product.size,
        quantity: product.quantity,
        comment: product.comment,
        repair_id: data[0].id,
      }));
      const { data: productData } = await supabase
        .from('repair_details')
        .insert([...products])
        .select();
      console.log('productData', productData);

      const contents = repair.contents.map((content) => ({
        title: content.title,
        price: Number(content.price),
        path: content.path,
        repair_id: data[0].id,
      }));
      const { data: contentData } = await supabase
        .from('repair_contents')
        .insert([...contents])
        .select();
      console.log('contents', contentData);

      return data;
    },
    onSuccess: (data: any) => {
      queryClient.setQueryData(['repair'], data[0]);
    },
    onError: (err: any) => {
      alert(err.message);
    },
  });
  return { createRepairMutation };
};
