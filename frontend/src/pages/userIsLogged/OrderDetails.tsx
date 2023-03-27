import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FoodsOrderCard from '../../components/FoodsOrderCard';
import PortalNavbar from '../../components/PortalNavbar';
import { useGetFetch } from '../../hooks/useGetFetch';
import Icheckout from '../../interfaces/Icheckout';
import { RootState } from '../../store/store';

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.user);
  const { data } = useGetFetch<Icheckout>(`/orders/${id}`, token);

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
      <button type='button' onClick={() => navigate('/orders')}>
        Voltar
      </button>
    </div>
  );
}

export default OrderDetails;
