import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Iorder from '../interfaces/Iorder';
import { handleCart, handleTotal } from '../slicers/cart.slicer';
import { RootState } from '../store/store';

function NewOrderCards(props: Iorder) {
  const { id, name, description, price } = props;
  const [quantity, setQuantity] = useState(0);

  const selector = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  // const handleLocalStorage = (type: 'increase' | 'decrease') => {
  //   const cartOnStorage = localStorage.getItem('cart');
  //   if (cartOnStorage) {
  //     switch (type) {
  //       case 'increase':
  //         const cartParsed = JSON.parse(cartOnStorage as string);
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  //   if (!cartOnStorage && type === 'increase') {
  //     return localStorage.setItem('cart', JSON.stringify(payload));
  //   }
  // };

  const handleTotalPrice = (operation: string) => {
    const total = selector.totalPrice as number;
    const unityPrice = Number(price);
    if (operation === 'increase')
      return dispatch(handleTotal(total + unityPrice));
    if (operation === 'decrease')
      return dispatch(handleTotal(total - unityPrice));
    return total;
  };

  // quantity ainda é inserido como 0 no global state cart e implementar pro local storage depois

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    handleTotalPrice('increase');
    // handleLocalStorage('increase');
    const payload = {
      id,
      name,
      description,
      price,
      quantity,
    };
    dispatch(handleCart(payload));
  };

  const handleDecreaseQuantity = () => {
    if (quantity <= 0) return setQuantity(0);
    setQuantity((prev) => prev - 1);
    handleTotalPrice('decrease');
    // handleLocalStorage('decrease');
  };

  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{price}</p>
      <button type='button' name='increase' onClick={handleIncreaseQuantity}>
        +
      </button>
      <p>{quantity}</p>
      <button type='button' name='decrease' onClick={handleDecreaseQuantity}>
        -
      </button>
    </div>
  );
}

export default NewOrderCards;
