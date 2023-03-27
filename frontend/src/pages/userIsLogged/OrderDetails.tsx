import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FoodsOrderCard from '../../components/FoodsOrderCard';
import PortalNavbar from '../../components/PortalNavbar';
import useUserValidator from '../../hooks/useUserValidator';
import Icheckout from '../../interfaces/Icheckout';
import Iusers from '../../interfaces/Iuser';
import { RootState } from '../../store/store';
import allFetchMethods from '../../utils/allFetchMethods';

function OrderDetails() {
  useUserValidator<Iusers>();
  const { id } = useParams();
  const { token } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [data, setData] = useState<Icheckout>();
  const [showError, setShowError] = useState('');

  const handleStatusFetch = async () => {
    const payload = {
      status: 'Recebido',
    };
    await allFetchMethods('PUT', `/orders/${id}`, payload, token);
  };

  useEffect(() => {
    const getOrderById = async () => {
      if (token !== '') {
        const response = await allFetchMethods(
          'GET',
          `/orders/${id}`,
          null,
          token
        );
        if (response.message) return setShowError(response.message);
        return setData(response);
      }
      return;
    };
    getOrderById();
  }, [id, token]);

  return (
    <div>
      <PortalNavbar />
      Detalhes do Pedido:
      <p>{data?.status}</p>
      <p>{`Pedido: ${data && String(data.id).padStart(4, '0')}`}</p>
      {data?.foods &&
        data?.foods.map((food: any) => (
          <FoodsOrderCard
            key={food.id}
            name={food.name}
            price={food.price}
            quantity={food.ordersFoods.quantity}
          />
        ))}
      <button type='button' onClick={handleStatusFetch}>
        Marcar como entregue
      </button>
      <button type='button' onClick={() => navigate('/orders')}>
        Voltar
      </button>
      <p>{showError}</p>
    </div>
  );
}

export default OrderDetails;
