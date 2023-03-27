import IorderFoods from './IorderFoods';

interface Icheckout {
  id?: number;
  userId?: number;
  deliveryAddress?: string;
  foods?: IorderFoods[];
  status:
    | 'Pendente'
    | 'Preparando'
    | 'Retirar no balcão'
    | 'Encaminhado'
    | 'Recebido';
  totalPrice: number;
  orderId?: number;
  orderDate?: Date;
  orderNotes?: string;
}

export default Icheckout;
