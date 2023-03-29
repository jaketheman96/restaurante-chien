import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Ilogged from '../interfaces/Ilogged';
import { RootState } from '../store/store';

function PortalNavbar() {
  const navigate = useNavigate();
  const { email, role } = useSelector(
    (state: RootState): Ilogged => state.user
  );

  const handleClick = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    return navigate('/');
  };

  return (
    <div>
      <img src='*' alt='chien logo' />
      <Link to='/portal'>
        <p>{role === 'customer' && 'Início'}</p>
      </Link>
      <Link to='/bookings'>
        <p>{role === 'customer' && 'Minhas Reservas'}</p>
        <p>{role === 'employee' && 'Reservas'}</p>
      </Link>
      <Link to='/orders'>
        <p>{role === 'customer' && 'Meus Pedidos'}</p>
        <p>{role === 'employee' && 'Pedidos'}</p>
      </Link>
      <p>{email}</p>
      <button type='button' onClick={handleClick}>
        Sair
      </button>
    </div>
  );
}

export default PortalNavbar;
