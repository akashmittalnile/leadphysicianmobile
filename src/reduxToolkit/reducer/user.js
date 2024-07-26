import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  userToken: '',
  userNotifications: false,
  cartCount: 0,
  favCount: 0,
  adminCount: 0, 
  isSubscribed : {isSubscribed: false},
};
const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken(state, {payload}) {
      return {
        ...state,
        userToken: payload,
      };
    },
    setUser(state, {payload}) {
      return {
        ...state,
        userInfo: payload,
      };
    },
    setUserNotifications(state, {payload}) {
      return {
        ...state,
        userNotifications: payload,
      };
    },
    setCartCount(state, {payload}) {
      return {
        ...state,
        cartCount: payload,
      };
    },
    clearCart(state, {payload}) {
      return {
        ...state,
        cartCount: 0,
      };
    },
    logOutUser(state, {payload}) {
      return {
        userInfo: {},
        userToken: '',
      };
    },
    setFavCount(state, {payload}) {
      return {
        ...state,
        favCount: payload,
      };
    },

    setAdminCount(state, {payload}) {
      return {
        ...state,
        adminCount: payload,
      };
    },
    userisSubscribedHandler(state, {payload}) {
      return {
        ...state,
        isSubscribed: payload,
      };
    },

  },
});

export const {setUserToken, setUser, setUserNotifications, logOutUser, clearCart, setCartCount, setFavCount, setAdminCount,userisSubscribedHandler} = user.actions;
const themeReducer = user.reducer;

export default themeReducer;
