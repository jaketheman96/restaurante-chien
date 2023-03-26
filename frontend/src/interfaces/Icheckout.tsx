import IorderFoods from './IorderFoods';

interface Icheckout {
  userId: number;
  deliveryAddress: string;
  foods: IorderFoods[];
  status:
    | 'Pendente'
    | 'Preparando'
    | 'Retirar no balcão'
    | 'Encaminhado'
    | 'Recebido';
  totalPrice: number;
  orderNotes?: string;
}

export default Icheckout;
