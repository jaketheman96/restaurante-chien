import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';
import useCart from '../hooks/useCart';
import Iorder from '../interfaces/Iorder';

function Checkout() {
  const navigate = useNavigate();
  const { storeCart, totalPrice } = useCart();

  return (
    <div>
      Carrinho:
      {storeCart.length !== 0 &&
        storeCart.map((itens: Iorder, index: number) => (
          <Cart
            key={itens.id}
            id={String(index + 1)}
            name={itens.name}
            quantity={itens.quantity}
            price={itens.price}
          />
        ))}
      <button type='button' onClick={() => navigate('/orders/new')}>
        Voltar
      </button>
      <button type='button'>Continuar</button>
      <p>{`R$${totalPrice.toFixed(2)}`}</p>
    </div>
  );
}

export default Checkout;
