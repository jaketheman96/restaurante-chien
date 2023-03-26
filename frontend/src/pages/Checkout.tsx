import { MouseEvent, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartTableBody from '../components/CartTableBody';
import PortalNavbar from '../components/PortalNavbar';
import useCart from '../hooks/useCart';
import Iorder from '../interfaces/Iorder';
// import { handleCheckoutInfos } from '../slicers/checkout.slicer';
import '../styles/CartTable.style.css';

function Checkout() {
  const navigate = useNavigate();
  // const dispatch = useDispatch()
  const { storeCart, totalPrice, removeFullItemFromCart } = useCart();
  const [orderNotes, setOrderNotes] = useState('');

  console.log(orderNotes);

  const handleRemoveFullItem = (event: MouseEvent<Element>) => {
    const target = event.target as HTMLButtonElement;
    const itemPosition = Number(target.id);
    removeFullItemFromCart(itemPosition);
  };

  const handleSubmitCheckout = () => {
    // dispatch(handleCheckoutInfos())
    navigate('/checkout/address');
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
      <label htmlFor='order_notes'>
        Alguma observação?
        <textarea
          name='order_notes'
          rows={4}
          cols={20}
          placeholder='Ex: Sem cebola'
          onChange={(e) => setOrderNotes(e.target.value)}
        />
      </label>
      <button type='button' onClick={() => navigate('/orders/new')}>
        Voltar
      </button>
      <button type='button' onClick={handleSubmitCheckout}>
        Continuar
      </button>
      <p>{`Total: R$${totalPrice.toFixed(2).replace('.', ',')}`}</p>
    </div>
  );
}

export default Checkout;
