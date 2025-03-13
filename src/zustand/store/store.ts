import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import createUserSlice, { UserSlice } from '../slices/applicant';

type TAppSlices = UserSlice;
const useStore = create<TAppSlices>()(
    devtools(
        persist(
            (...args) => ({
              ...createUserSlice(...args)
            }),
            {
              name: 'HRAMS',
            },
          ),
    )
)

export default useStore