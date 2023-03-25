interface Iorders {
  id?: number,
  userId: number,
  deliveryAddress: string,
  orderNotes?: string,
  orderDate?: Date,
  status: string,
  totalPrice: number,
}

export default Iorders