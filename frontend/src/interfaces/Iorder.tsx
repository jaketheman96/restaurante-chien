import Ifoods from "./Ifoods";

interface Iorder extends Ifoods {
  totalPrice?: number;
  quantity?: number;
  handleAddButton?: (payload: any) => void
  handleRemoveButton?: (payload: any) => void
}

export default Iorder