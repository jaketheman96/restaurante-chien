import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/foods">Cardápio</Link>
      <Link to="/contact">Contato</Link>
      <Link to="/about">Sobre</Link>
      <Link to="/orders">Pedidos</Link>
      <Link to="/bookings">Reservas</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Navbar