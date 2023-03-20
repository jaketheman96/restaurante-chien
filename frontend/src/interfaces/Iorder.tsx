import { Dispatch, SetStateAction } from "react";
import Ifoods from "./Ifoods";

interface Iorder extends Ifoods {
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
}

export default Iorder