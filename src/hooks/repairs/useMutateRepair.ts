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
          factory_id: repair.factories.id,
          deadline: repair.deadline,
          deliveryPlace: repair.deliveryPlace,
          customer: repair.customer,
          comment: repair.comment,
          status: repair.status,
          user_id: repair.user_id,
        })
        .select();
      if (error) throw new Error(error.message);
      const details = repair.repair_details.map((detail) => ({
        maker: detail.maker,
        product_name: detail.product_name,
        size: detail.size,
        quantity: detail.quantity,
        comment: detail.comment,
        repair_id: data[0].id,
      }));
      const { data: productData } = await supabase
        .from('repair_details')
        .insert([...details])
        .select();
      console.log('productData', productData);

      const contents = repair.repair_contents.map((content) => ({
        title: content.title,
        price: Number(content.price),
        image_url: content.image_url,
        is_new: content.is_new,
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
      queryClient.invalidateQueries(['repairs'], data);
      // queryClient.setQueryData(['repairs'], data[0]);
    },
    onError: (err: any) => {
      alert(err.message);
    },
  });

  const updateRepairMutation = useMutation({
    mutationFn: async (repair: RepairInputs & { id: string }) => {
      const { data, error } = await supabase
        .from('repairs')
        .update({
          deadline: repair?.deadline,
          deliveryPlace: repair?.deliveryPlace,
          customer: repair?.customer,
          comment: repair?.comment,
          status: repair?.status,
        })
        .eq('id', repair.id)
        .select();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(['repairs'], data.id);
    },
    onError: (err: any) => {
      alert(err.message);
    },
  });

  const updateRepairContentsMutation = useMutation({
    mutationFn: async (repair: RepairInputs & { id: string }) => {
      const contents = repair?.repair_contents.map(async (content) => {
        const { data, error } = await supabase
          .from('repair_contents')
          .update({
            title: content.title,
            price: Number(content.price) || 0,
            image_url: content.image_url || '',
            is_new: content.is_new,
          })
          .eq('id', content.id)
          .select();
        if (error) throw new Error(error.message);
      });
      if (contents) {
        return repair.id;
      }
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(['repairs'], data);
    },
    onError: (err: any) => {
      alert(err.message);
    },
  });

  const updateRepairDetailsMutation = useMutation({
    mutationFn: async (repair: RepairInputs & { id: string }) => {
      const contents = repair?.repair_details.map(async (detail) => {
        const { data, error } = await supabase
          .from('repair_details')
          .update({
            maker: detail.maker,
            product_name: detail?.product_name,
            size: detail.size,
            quantity: Number(detail.quantity) || 0,
            comment: detail.comment,
          })
          .eq('id', detail.id)
          .select();
        if (error) throw new Error(error.message);
      });
      if (contents) {
        return repair.id;
      }
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(['repairs'], data);
    },
    onError: (err: any) => {
      alert(err.message);
    },
  });

  return {
    createRepairMutation,
    updateRepairMutation,
    updateRepairContentsMutation,
    updateRepairDetailsMutation,
  };
};
