import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addToCart: (items) => {},
  removeFromCart: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_TO_CART") {
    const exestingItemsIndex = state.items.findIndex(
      (items) => items.id === action.items.id
    );
    const updatedItems = [...state.items];

    if (exestingItemsIndex > -1) {
      const existingItem = state.items[exestingItemsIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[exestingItemsIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.items, quantity: 1 });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE_FROM_CART") {
    const exestingItemsIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[exestingItemsIndex];
    const updatedItems = [...state.items];

    if (existingItem.quantity === 1) {
      updatedItems.splice(exestingItemsIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[exestingItemsIndex] = updatedItem;
    }
    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const initialState = {
    items: [],
  };

  const [cart, dispatch] = useReducer(cartReducer, initialState);

  function addToCart(items) {
    dispatch({ type: "ADD_TO_CART", items });
  }
  function removeFromCart(id) {
    dispatch({ type: "REMOVE_FROM_CART", id });
  }

  const cartCtr = { items: cart.items, addToCart, removeFromCart };

  return (
    <CartContext.Provider value={cartCtr}>{children}</CartContext.Provider>
  );
}

export default CartContext;
