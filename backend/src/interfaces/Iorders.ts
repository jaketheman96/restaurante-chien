import IordersFoods from "./IordersFoods";

interface Iorders {
  id?: number;
  userId: number;
  deliveryAddress: string;
  orderNotes?: string;
  orderDate?: Date;
  status: string;
  foods?: IordersFoods[];
  totalPrice: number;
}

export default Iorders;
