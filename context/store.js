import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

export const Store = createContext();

//?
const initialState = {
  cart: {
    cart_Items: Cookies.get('cart_Items')
      ? JSON.parse(Cookies.get('cart_Items'))
      : [],
  },

  categories: [],
  authTokens: '',
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      console.log(newItem);
      //! checking whether the item exist > this gives us the existItem
      const existItem = state.cart.cart_Items.find(
        (item) => item.id === newItem.id
      );
      //! we are getting how many times the item exist > NOTE avoiding repeation if item exist

      const cart_Items = existItem
        ? state.cart.cart_Items.map((item) =>
            item.title === existItem.title ? newItem : item
          )
        : [...state.cart.cart_Items, newItem];
      //! saving cart item in the cookies
      Cookies.set('cart_Items', JSON.stringify(cart_Items));
      return { ...state, cart: { ...state.cart, cart_Items } };
    }
    case 'CATEGORIES': {
      return {
        ...state,

        categories: action.payload,
      };
    }
    case 'CART_REMOVE_ITEM': {
      const cart_Items = state.cart.cart_Items.filter(
        (item) => item.id !== action.payload.id
      );
      Cookies.set('cart_Items', JSON.stringify(cart_Items));
      return { ...state, cart: { ...state.cart, cart_Items } };
    }
    case 'USER_LOGIN': {
      // const authTokens = action.payload;
      return { ...state, user: action.payload };
      // localStorage.setItem('authtokens', JSON.stringify(authTokens));
      // Cookies.set('authtokens', JSON.stringify(authTokens));
      // const userdata = localStorage.getItem('authtokens')
      //   ? jwt_decode(localStorage.getItem('authtokens'))
      //   : null;
      // console.log(userdata);
      // const user = userdata;

      // console.log(
      //   localStorage.getItem('authtokens')
      //     ? jwt_decode(localStorage.getItem('authtokens'))
      //     : null
      // );
    }
    case 'USER_LOGOUT': {
      return {
        ...state,
        user: null,
        cart: { cart_Items: [] },
      };
    }

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
