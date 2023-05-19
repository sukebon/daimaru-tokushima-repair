import { RepairInputs } from '../types';
import { create } from 'zustand';
type State = {
  repair: RepairInputs;
  setRepair: (payload: RepairInputs) => void;
  resetRepair: () => void;
};
const useRepaireStore = create<State>((set) => ({
  repair: {
    factory: {
      id: '',
      name: '',
    },
    deadline: '',
    deliveryPlace: '',
    customer: '',
    user_id: '',
    comment: '',
    status: 'PICKING',
    repair_contents: [
      {
        title: '',
        price: '',
        path: '',
        is_new: false,
      },
    ],
    repair_details: [
      {
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
        factory: {
          id: '',
          name: '',
        },
        deadline: '',
        deliveryPlace: '',
        customer: '',
        user_id: '',
        comment: '',
        status: 'PICKING',
        repair_contents: [
          {
            title: '',
            price: 0,
            path: '',
            is_new: false,
          },
        ],
        repair_details: [
          {
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
