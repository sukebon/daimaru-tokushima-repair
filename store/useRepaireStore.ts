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
    orderType: 'REPAIRE',
    user_id: '',
    comment: '',
    contents: [
      {
        title: '',
        price: '',
        path: '',
        is_new: false,
      },
    ],
    products: [
      {
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
        orderType: 'REPAIRE',
        user_id: '',
        comment: '',
        contents: [
          {
            title: '',
            price: 0,
            path: '',
            is_new: false,
          },
        ],
        products: [
          {
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
