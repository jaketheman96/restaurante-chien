import Iusers from './Iusers';

interface Ilogin {
  id?: number;
  name: string;
  email: string;
  role: string;
  token: string;
}

export default Ilogin;
