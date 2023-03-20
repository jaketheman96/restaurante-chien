import { useState } from 'react';
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

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    const payload = {
      id,
      name,
      description,
      price,
      quantity,
    };
    handleTotalPrice('increase');
    dispatch(handleCart(payload));
    // handleLocalStorage('increase');
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
