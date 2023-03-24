import Iorder from '../interfaces/Iorder';

function CartTableBody(props: Iorder) {
  const { id, name, price, quantity, handleRemoveFullItem } = props;

  return (
    <tr>
      <td>{String(id).padStart(3, '0')}</td>
      <td>{name}</td>
      <td>{`R$${price.toFixed(2).replace('.', ',')}`}</td>
      <td>{quantity}</td>
      <td>
        <button id={id} type='button' onClick={handleRemoveFullItem}>
          X
        </button>
      </td>
    </tr>
  );
}

export default CartTableBody;
