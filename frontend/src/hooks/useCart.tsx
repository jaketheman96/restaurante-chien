import { useEffect, useState } from 'react';
import Iorder from '../interfaces/Iorder';
import useUserValidator from './useUserValidator';

function useCart() {
  const [storeCart, setStoreCart] = useState<Iorder[] | []>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useUserValidator()

  useEffect(() => {
    const handleStorage = () => {
      const cart = localStorage.getItem('cart');
      if (!cart) return;
      const parsedCart = JSON.parse(cart);
      setStoreCart(parsedCart);
    };
    handleStorage();
  }, []);

  const addToLocalCart = (payload: Iorder) => {
    if (storeCart.length === 0) {
      setStoreCart([payload]);
      localStorage.setItem('cart', JSON.stringify([payload]));
      return;
    } else {
      if (
        storeCart.some((item: Iorder) => Number(item.id) === Number(payload.id))
      ) {
        const newArray = storeCart.map((item: Iorder) => {
          if (Number(item.id) === Number(payload.id) && item.quantity) {
            item.quantity += 1;
          }
          return item;
        });
        localStorage.setItem('cart', JSON.stringify(newArray));
        setStoreCart(newArray);
        return;
      } else {
        localStorage.setItem(
          'cart',
          JSON.stringify([...(storeCart as Iorder[]), payload])
        );
        setStoreCart([...(storeCart as Iorder[]), payload]);
        return;
      }
    }
  };

  const removeFromLocalCart = (payload: Iorder) => {
    const isItemInCart = storeCart.some(
      (item: Iorder) => item.id === payload.id
    );
    if (!isItemInCart) {
      return;
    }
    const cartFiltered = storeCart.filter((item: Iorder) => {
      if (item.id === payload.id && (item.quantity as number) > 1) {
        return ((item.quantity as number) -= 1);
      }
      return item.id !== payload.id;
    });
    localStorage.setItem('cart', JSON.stringify(cartFiltered));
    return setStoreCart(cartFiltered);
  };

  useEffect(() => {
    const INITIAL_PRICE = 0;
    const handleTotalPrice = () => {
      const unityPrice = storeCart.map((item: Iorder) => {
        if ((item.quantity as number) >= 1) {
          const unityPriceEach = (item.quantity as number) * item.price;
          return unityPriceEach;
        } else {
          return INITIAL_PRICE;
        }
      });
      const totalPrice = unityPrice.reduce(
        (acc: number, current: number) => acc + current,
        INITIAL_PRICE
      );
      setTotalPrice(totalPrice);
    };
    handleTotalPrice();
  }, [storeCart]);

  return {
    storeCart,
    setStoreCart,
    addToLocalCart,
    totalPrice,
    removeFromLocalCart,
  };
}

export default useCart;
