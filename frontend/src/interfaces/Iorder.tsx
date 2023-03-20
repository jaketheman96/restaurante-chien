import Ifoods from "./Ifoods";

interface Iorder extends Ifoods {
  totalPrice?: number;
  quantity?: number;
}

export default Iorder