import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Ilogged from '../interfaces/Ilogged';
import { RootState } from '../store/store';

function PortalInfos() {
  const { name } = useSelector((state: RootState): Ilogged => state.user);
  const navigate = useNavigate();

  return (
    <div>
      <h2>{`Seja bem vindo ${name}!`}</h2>
      <h3>Deseja fazer um pedido ou uma reserva?</h3>
      <button type='button' onClick={() => navigate('/orders/new')}>
        Pedido
      </button>
      <button type='button' onClick={() => navigate('/bookings/new')}>Reserva</button>
    </div>
  );
}

export default PortalInfos;
