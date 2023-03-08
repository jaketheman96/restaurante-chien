interface Iorders {
  id?: number,
  userId: number,
  foodId: number,
  orderNotes?: string,
  orderDate?: Date,
}

export default Iorders