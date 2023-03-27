import { Link } from 'react-router-dom';
import Icheckout from '../interfaces/Icheckout';

function UserOrdersCard({
  id,
  status,
  orderDate,
  totalPrice,
  orderId,
}: Icheckout) {
  const date = new Date(orderDate as Date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fullDate = `${day}/${month}/${year}`;

  return (
    <div>
      <Link to={`/orders/${orderId}`}>
        <div>
          <p>{`Pedido: ${String(id).padStart(4, '0')}`}</p>
        </div>
        <div>
          <p>°status</p>
          <p>{status}</p>
          <p>{fullDate}</p>
        </div>
        <div>
          <p>{`Total: R$${Number(totalPrice).toFixed(2).replace('.', ',')}`}</p>
        </div>
      </Link>
    </div>
  );
}

export default UserOrdersCard;
