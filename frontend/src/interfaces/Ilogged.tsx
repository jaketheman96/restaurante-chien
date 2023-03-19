import Iusers from "./Iuser";

interface Ilogged extends Iusers {
  token: string;
}

export default Ilogged;
