import Iorder from '../interfaces/Iorder';

function Cart(props: Iorder) {
  const { id, name, price, quantity } = props;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Qtd.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{price}</td>
            <td>{quantity}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
