import { useSelector } from 'react-redux';
import Ilogged from '../interfaces/Ilogged';
import { RootState } from '../store/store';

function PortalInfos() {
  const { name } = useSelector((state: RootState): Ilogged => state.user);

  // criar page de new order e new booking <-------

  return (
    <div>
      <h2>{`Seja bem vindo ${name}!`}</h2>
      <h3>Deseja fazer um pedido ou uma reserva?</h3>
      <button type='button'>Pedido</button>
      <button type='button'>Reserva</button>
    </div>
  );
}

export default PortalInfos;
