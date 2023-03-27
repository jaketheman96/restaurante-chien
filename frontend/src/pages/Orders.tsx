import { useSelector } from 'react-redux';
import PortalNavbar from '../components/PortalNavbar';
import UserOrdersCard from '../components/UserOrdersCard';
import { useGetFetch } from '../hooks/useGetFetch';
import useUserValidator from '../hooks/useUserValidator';
import Icheckout from '../interfaces/Icheckout';
import { RootState } from '../store/store';

function Orders() {
  useUserValidator();
  const { id, token } = useSelector((state: RootState) => state.user);
  const { data } = useGetFetch<Icheckout[]>(`/orders/customer/${id}`, token);

  return (
    <div>
      <PortalNavbar />
      {data &&
        data.map((order: Icheckout, index: number) => (
          <UserOrdersCard
            key={index}
            id={index + 1}
            status={order.status}
            orderId={order.id}
            orderDate={order.orderDate}
            totalPrice={order.totalPrice}
          />
        ))}
    </div>
  );
}

export default Orders;
