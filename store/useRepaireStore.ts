import { RepaireInputs } from '../types';
import { create } from 'zustand';
type State = {
  repaire: RepaireInputs | null;
  setRepaire: (payload: RepaireInputs | null) => void;
};
const useRepaireStore = create<State>((set) => ({
  repaire: {
    factory: '',
    deadline: null,
    deliveryPlace: '',
    client: '',
    price: 0,
    title: '',
    orderType: 'REPAIRE',
    category: 'PREV',
    user_id: '',
    comment: '',
    products: [
      {
        productNumber: '',
        size: '',
        quantity: '',
        comment: '',
      },
    ],
  },
  setRepaire: (payload) =>
    set({
      repaire: payload,
    }),
}));

export default useRepaireStore;
