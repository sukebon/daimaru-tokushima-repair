import { RepairInputs } from '../types';
import { create } from 'zustand';
type State = {
  repair: RepairInputs | null;
  setRepair: (payload: RepairInputs | null) => void;
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
    client: '',
    orderType: 'REPAIRE',
    category: 'PREV',
    user_id: '',
    comment: '',
    contents: [
      {
        title: '',
        price: '',
        path: '',
      },
    ],
    products: [
      {
        productNumber: '',
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
        client: '',
        orderType: 'REPAIRE',
        category: 'PREV',
        user_id: '',
        comment: '',
        contents: [
          {
            title: '',
            price: 0,
            path: '',
          },
        ],
        products: [
          {
            productNumber: '',
            size: '',
            quantity: '',
            comment: '',
          },
        ],
      },
    }),
}));

export default useRepaireStore;
