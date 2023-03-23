import { useEffect, useState } from 'react';
import Iorder from '../interfaces/Iorder';

function useCart() {
  const [storeCart, setStoreCart] = useState<Iorder[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const handleStorage = () => {
      const cart = localStorage.getItem('cart');
      if (!cart) return;
      const parsedCart = JSON.parse(cart) ;
      setStoreCart(parsedCart);
    };
    handleStorage();
  }, []);

  const addToCart = (payload: Iorder) => {
    if (storeCart.length === 0) {
      setStoreCart([...(storeCart as Iorder[]), payload]);
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
        setStoreCart(newArray);
      } else {
        setStoreCart([...(storeCart as Iorder[]), payload]);
      }
    }
  };

  useEffect(() => {
    const handleTotalPrice = () => {
      if (storeCart.length !== 0) {
        const unityPrice = storeCart.map((item: Iorder) => {
          const unityPriceEach = Number(item.quantity) * Number(item.price);
          return unityPriceEach;
        });
        const totalPrice = unityPrice.reduce(
          (acc: number, current: number) => acc + current,
          0
        );
        setTotalPrice(totalPrice);
      }
    };
    handleTotalPrice();
  }, [storeCart]);

  return { storeCart, setStoreCart, addToCart, totalPrice };
}

export default useCart;
