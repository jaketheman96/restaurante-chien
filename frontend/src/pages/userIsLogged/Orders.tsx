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
  const { id, token } = useSelector((state: RootState) => state.user);
  const [data, setData] = useState<Icheckout[]>();

  useEffect(() => {
    const getOrderById = async () => {
      if (id !== 0) {
        const response = await getFetch(
          'GET',
          `/orders/customer/${id}`,
          null,
          token
        );
        setData(response);
      }
      return;
    };
    getOrderById();
  }, [id, token]);

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
