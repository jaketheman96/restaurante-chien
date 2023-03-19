import { Link } from "react-router-dom"

function PortalNavbar() {
  return (
    <div>
      <Link to='/portal'>Início</Link>
      <Link to='/bookings'>Minhas Reservas</Link>
      <Link to='/orders'>Meus Pedidos</Link>
    </div>
  )
}

export default PortalNavbar