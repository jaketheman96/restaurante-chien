import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PortalNavbar from '../../components/PortalNavbar';
import UserOrdersCard from '../../components/UserOrdersCard';
import useUserValidator from '../../hooks/useUserValidator';
import Icheckout from '../../interfaces/Icheckout';
import Iusers from '../../interfaces/Iuser';
import { RootState } from '../../store/store';
import getFetch from '../../utils/allFetchMethods';

function Orders() {
  useUserValidator<Iusers>();
  const { id, token, role } = useSelector((state: RootState) => state.user);
  const [data, setData] = useState<Icheckout[]>();

  
  useEffect(() => {
    const switchEndpointByRole = () => {
      if (id !== 0) {
        switch (role) {
          case 'customer':
            return `/orders/customer/${id}`;
          case 'employee':
            return '/orders';
          default:
            return 'admin';
        }
      }
    };
    const getOrderById = async () => {
      const endpoint = switchEndpointByRole();
      if (id !== 0) {
        const response = await getFetch('GET', endpoint as string, null, token);
        setData(response);
      }
      return;
    };
    getOrderById();
  }, [id, token, role]);

  return (
    <div>
      <PortalNavbar />
      {data &&
        data.map((order: Icheckout, index: number) => (
          <UserOrdersCard
            key={index}
            id={order.id}
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
