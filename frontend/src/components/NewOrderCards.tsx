import Iorder from '../interfaces/Iorder';

function NewOrderCards(props: Iorder) {
  const { id, name, description, price, handleAddButton } = props;

  const handleClick = () => {
    const payload = {
      id,
      name,
      description,
      price,
      quantity: 1
    }
    if (handleAddButton) {
      handleAddButton(payload);
    }
  }

  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{price}</p>
      <button id={id} type='button' name='add-to-cart' onClick={handleClick}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default NewOrderCards;
