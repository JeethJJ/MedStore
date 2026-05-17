import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type { CartItem, Product, ProductVariant } from '../types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; variant?: ProductVariant } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variantLabel?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number; variantLabel?: string } }
  | { type: 'CLEAR_CART' };

interface CartContextValue {
  state: CartState;
  addItem: (product: Product, variant?: ProductVariant) => void;
  removeItem: (productId: string, variantLabel?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantLabel?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = 'medstore_cart';

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, variant } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant?.label === variant?.label
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return { items: updated };
      }
      return {
        items: [...state.items, { product, quantity: 1, selectedVariant: variant }],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter(
          (item) =>
            !(
              item.product.id === action.payload.productId &&
              item.selectedVariant?.label === action.payload.variantLabel
            )
        ),
      };
    }
    case 'UPDATE_QUANTITY': {
      const { productId, variantLabel, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          items: state.items.filter(
            (item) =>
              !(item.product.id === productId && item.selectedVariant?.label === variantLabel)
          ),
        };
      }
      return {
        items: state.items.map((item) =>
          item.product.id === productId && item.selectedVariant?.label === variantLabel
            ? { ...item, quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

function loadCartFromStorage(): CartState {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return { items: [] };
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCartFromStorage);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product, variant?: ProductVariant) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, variant } });

  const removeItem = (productId: string, variantLabel?: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantLabel } });

  const updateQuantity = (productId: string, quantity: number, variantLabel?: string) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity, variantLabel } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
