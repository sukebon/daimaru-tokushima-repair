import { RepairInputs } from '../types';
import { create } from 'zustand';
type State = {
  repair: RepairInputs;
  setRepair: (payload: RepairInputs) => void;
  resetRepair: () => void;
};
const useRepaireStore = create<State>((set) => ({
  repair: {
    factories: { id: '', name: '' },
    factory_name: '',
    deadline: '',
    deliveryPlace: '',
    customer: '',
    user_id: '',
    comment: '',
    status: 'PICKING',
    repair_contents: [
      {
        id: '',
        title: '',
        price: '',
        image_url: '',
        is_new: false,
      },
    ],
    repair_details: [
      {
        id: '',
        maker: '',
        product_name: '',
        size: '',
        quantity: '',
        comment: '',
      },
    ],
  },
  setRepair: (payload) =>
    set({
      repair: payload,
    }),
  resetRepair: () =>
    set({
      repair: {
        factories: { id: '', name: '' },
        deadline: '',
        deliveryPlace: '',
        customer: '',
        user_id: '',
        comment: '',
        status: 'PICKING',
        repair_contents: [
          {
            id: '',
            title: '',
            price: '',
            image_url: '',
            is_new: false,
          },
        ],
        repair_details: [
          {
            id: '',
            maker: '',
            product_name: '',
            size: '',
            quantity: '',
            comment: '',
          },
        ],
      },
    }),
}));

export default useRepaireStore;
