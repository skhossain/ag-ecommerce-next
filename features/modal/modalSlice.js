// filepath: /e:/Agriget/ag-ecommerce-next/features/modal/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoginOpen: false,
  isRegisterOpen: false,
  isCartOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLogin: (state) => {
      state.isLoginOpen = true;
      state.isRegisterOpen = false;
      state.isCartOpen = false;
    },
    closeLogin: (state) => {
      state.isLoginOpen = false;
    },
    openRegister: (state) => {
      state.isRegisterOpen = true;
      state.isLoginOpen = false;
      state.isCartOpen = false;
    },
    closeRegister: (state) => {
      state.isRegisterOpen = false;
    },
    openCart: (state) => {
      state.isCartOpen = true;
      state.isLoginOpen = false;
      state.isRegisterOpen = false;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
  },
});

export const { openLogin, closeLogin, openRegister, closeRegister, openCart, closeCart } = modalSlice.actions;
export default modalSlice.reducer;