import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Ilogged from '../interfaces/Ilogged';
import { RootState } from '../store/store';

function PortalNavbar() {
  const navigate = useNavigate();
  const { email } = useSelector((state: RootState): Ilogged => state.user);

  const handleClick = () => {
    localStorage.removeItem('user');
    return navigate('/');
  };

  return (
    <div>
      <img src='*' alt='chien logo' />
      <Link to='/portal'>Início</Link>
      <Link to='/bookings'>Minhas Reservas</Link>
      <Link to='/orders'>Meus Pedidos</Link>
      <p>{email}</p>
      <button type='button' onClick={handleClick}>
        Sair
      </button>
    </div>
  );
}

export default PortalNavbar;
