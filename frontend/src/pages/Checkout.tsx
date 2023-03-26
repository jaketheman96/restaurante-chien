import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartTableBody from '../components/CartTableBody';
import PortalNavbar from '../components/PortalNavbar';
import useCart from '../hooks/useCart';
import Icheckout from '../interfaces/Icheckout';
import Iorder from '../interfaces/Iorder';
import { handleCheckoutInfos } from '../slicers/checkout.slicer';
import { RootState } from '../store/store';
import '../styles/CartTable.style.css';

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.user);
  const { storeCart, totalPrice, removeFullItemFromCart } = useCart();
  const [orderNotes, setOrderNotes] = useState('');

  const handleRemoveFullItem = (event: MouseEvent<Element>) => {
    const target = event.target as HTMLButtonElement;
    const itemPosition = Number(target.id);
    removeFullItemFromCart(itemPosition);
  };

  const payload: Icheckout = {
    userId: id as number,
    deliveryAddress: '',
    foods: storeCart.map((item) => ({
      foodId: Number(item.id) as number,
      quantity: item.quantity as number,
    })),
    status: 'Pendente',
    totalPrice,
    orderNotes,
  };

  const handleSubmitCheckout = () => {
    dispatch(handleCheckoutInfos(payload));
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
                id={index + 1}
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
