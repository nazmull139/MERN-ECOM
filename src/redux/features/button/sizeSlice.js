import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  disabledSizes: {}, // { productId: ['M', 'L'] }
};

const sizeSlice = createSlice({
  name: 'size',
  initialState,
  reducers: {
    toggleSize: (state, action) => {
      const { productId, size } = action.payload;
      if (!state.disabledSizes[productId]) {
        state.disabledSizes[productId] = [];
      }
      if (state.disabledSizes[productId].includes(size)) {
        state.disabledSizes[productId] = state.disabledSizes[productId].filter(s => s !== size);
      } else {
        state.disabledSizes[productId].push(size);
      }
      //console.log(state.disabledSizes);
    },
  },
});

export const { toggleSize } = sizeSlice.actions;
export default sizeSlice.reducer;
