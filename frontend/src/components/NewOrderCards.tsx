import { useState } from 'react';
import Iorder from '../interfaces/Iorder';

function NewOrderCards(props: Iorder) {
  const { id, name, description, price, handleAddButton, handleRemoveButton } = props;
  const [quantity, setQuantity] = useState(0);

  const payload = {
    id,
    name,
    description,
    price,
    quantity: 1,
  };

  const handleAddClick = () => {
    handleAddButton && handleAddButton(payload);
    setQuantity((prev) => prev + 1);
  };

  const handleRemoveClick = () => {
    handleRemoveButton && handleRemoveButton(payload)
    if (quantity <= 0) {
      return setQuantity(0);
    }
    return setQuantity((prev) => prev - 1);
  };

  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{price}</p>
      <button id={id} type='button' name='add' onClick={handleAddClick}>
        +
      </button>
      <p>{quantity}</p>
      <button type='button' name='remove' onClick={handleRemoveClick}>
        -
      </button>
    </div>
  );
}

export default NewOrderCards;
