import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAddress } from '../slicers/checkout.slicer';
import PortalNavbar from './PortalNavbar';

function DeliveryAddress() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');

  const handleMethodChange = (event: ChangeEvent) => {
    const target = event.target as HTMLSelectElement;
    setDeliveryMethod(target.value);
  };

  const handleSubmitAddress = () => {
    dispatch(handleAddress(deliveryMethod));
    return navigate('/checkout/payment');
  };

  return (
    <div>
      <PortalNavbar />
      <label htmlFor='delivery-address'>
        Retirar no balcão ou Delivery?
        <select name='delivery-address' onChange={handleMethodChange}>
          <option value='delivery'>Delivery</option>
          <option value='balcony'>Balcão</option>
        </select>
      </label>
      <button type='button' onClick={() => navigate('/checkout')}>
        Voltar
      </button>
      <button type='button' onClick={handleSubmitAddress}>
        Continuar
      </button>
    </div>
  );
}

export default DeliveryAddress;
