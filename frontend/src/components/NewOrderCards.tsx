import { useState } from 'react';
import Iorder from '../interfaces/Iorder';

function NewOrderCards(props: Iorder) {
  const { name, description, price, totalPrice, setTotalPrice } = props;
  const [quantity, setQuantity] = useState(0);

  const handleLocalStorage = (type: 'increase' | 'decrease') => {
    const cartOnStorage = localStorage.getItem('order');
    if (!cartOnStorage) {
      if (type === 'increase') {
        localStorage.setItem(
          'cart',
          JSON.stringify({ name, description, price, totalPrice, quantity })
        );
      }
    }
  };

  const handleTotalPrice = (operation: string) => {
    const total = totalPrice as number;
    const unityPrice = Number(price);
    if (operation === 'increase') return total + unityPrice;
    if (operation === 'decrease') return total - unityPrice;
    return total;
  };

  const handleIncreaseQuantity = () => {
    handleLocalStorage('increase');
    setQuantity((prev) => prev + 1);
    setTotalPrice(handleTotalPrice('increase'));
  };

  const handleDecreaseQuantity = () => {
    if (quantity <= 0) return setQuantity(0);
    setQuantity(quantity - 1);
    setTotalPrice(handleTotalPrice('decrease'));
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
