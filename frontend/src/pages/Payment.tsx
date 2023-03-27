import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PortalNavbar from '../components/PortalNavbar';
import useCart from '../hooks/useCart';
import { setIsLoading } from '../slicers/loading.slicer';
import { selectPaymentMethod } from '../slicers/payment.slicer';
import { RootState } from '../store/store';
import postFetch from '../utils/postFetch';

function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, checkout } = useSelector((state: RootState) => state);
  const { totalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const TWO_SECONDS = 2000;
  const SIX_SECONDS = 6000;

  const handleClick = async () => {
    if (paymentMethod !== '') {
      dispatch(setIsLoading(true));
      dispatch(selectPaymentMethod({ paymentMethod }));
      localStorage.removeItem('cart');
      await postFetch('POST', '/orders', checkout, user.token);
      setTimeout(() => {
        dispatch(setIsLoading(false));
        setShowSuccessMessage(true);
        setIsPaymentDone(true);
      }, TWO_SECONDS);
      return;
    }
    return;
  };

  useEffect(() => {
    const redirectUser = () => {
      if (isPaymentDone) {
        setTimeout(() => navigate('/orders'), SIX_SECONDS);
      }
    };
    redirectUser();
  }, [isPaymentDone, navigate]);

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
          <option value='Crédito'>Crédito</option>
          <option value='Débito'>Débito</option>
          <option value='Pix'>Pix</option>
          <option value='um abraço'>Um abraço</option>
        </select>
      </label>
      <button type='button' onClick={() => navigate('/checkout')}>
        Voltar
      </button>
      <button type='button' onClick={handleClick}>
        Continuar
      </button>
      {showSuccessMessage && (
        <p>
          {`Pagamento concluído com sucesso, você será redirecionado em instantes.`}
        </p>
      )}
    </>
  );
}

export default Payment;
