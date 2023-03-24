import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PortalNavbar from '../components/PortalNavbar';
import useCart from '../hooks/useCart';
import { setIsLoading } from '../slicers/loading.slicer';
import { selectPaymentMethod } from '../slicers/payment.slicer';

function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');
  const FIVE_SECONDS = 5000;
  
  const handleClick = () => {
    if (paymentMethod !== '') {
      dispatch(setIsLoading(true));
      dispatch(selectPaymentMethod({ paymentMethod }));
      setTimeout(() => dispatch(setIsLoading(false)), FIVE_SECONDS);
      return navigate('/payment/success');
    }
    return;
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
          <option value=''>-----</option>
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
