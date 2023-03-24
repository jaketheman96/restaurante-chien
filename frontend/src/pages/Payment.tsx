import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import PortalNavbar from '../components/PortalNavbar';
import useCart from '../hooks/useCart';
import { selectPaymentMethod } from '../slicers/payment.slicer';

function Payment() {
  const dispatch = useDispatch();
  const { totalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleClick = () => {
    if (paymentMethod !== '') {
      dispatch(selectPaymentMethod({ paymentMethod }));
    }
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    setPaymentMethod(target.value);
  };

  return (
    <>
      <PortalNavbar />
      <p>{`Total: R$${totalPrice.toFixed(2).replace('.', ',')}`}</p>
      <label htmlFor='payment-method'>
        Selecione o método de Pagamento:
        <select
          name='payment-method'
          id='payment-method'
          onChange={handleSelectChange}
        >
          <option value='credit'>Crédito</option>
          <option value='debit'>Débito</option>
          <option value='pix'>Pix</option>
          <option value='congrats'>Meus parabéns!</option>
        </select>
      </label>
      <button type='button'>Voltar</button>
      <button type='button' onClick={handleClick}>
        Continuar
      </button>
    </>
  );
}

export default Payment;
