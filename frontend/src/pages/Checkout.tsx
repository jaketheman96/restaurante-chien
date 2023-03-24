import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import CartTableBody from '../components/CartTableBody';
import PortalNavbar from '../components/PortalNavbar';
import useCart from '../hooks/useCart';
import Iorder from '../interfaces/Iorder';
import '../styles/CartTable.style.css';

function Checkout() {
  const navigate = useNavigate();
  const { storeCart, totalPrice, removeFullItemFromCart } = useCart();

  const handleRemoveFullItem = (event: MouseEvent<Element>) => {
    const target = event.target as HTMLButtonElement;
    const itemPosition = Number(target.id);
    removeFullItemFromCart(itemPosition);
  };

  return (
    <div>
      <PortalNavbar />
      Carrinho:
      <table className='cart-table'>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Qtd.</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {storeCart.length !== 0 &&
            storeCart.map((itens: Iorder, index: number) => (
              <CartTableBody
                key={index}
                id={String(index + 1)}
                name={itens.name}
                quantity={itens.quantity}
                price={itens.price}
                handleRemoveFullItem={handleRemoveFullItem}
              />
            ))}
        </tbody>
      </table>
      <button type='button' onClick={() => navigate('/orders/new')}>
        Voltar
      </button>
      <button type='button' onClick={() => navigate('/payment')}>
        Continuar
      </button>
      <p>{`R$${totalPrice.toFixed(2)}`}</p>
    </div>
  );
}

export default Checkout;
