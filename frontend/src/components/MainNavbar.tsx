import { Link } from 'react-router-dom'

function MainNavbar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">Sobre</Link>
      <Link to="/type/foods">Cardápio</Link>
      <Link to="/login">Login</Link>
      <Link to="/contact">Contato</Link>
    </div>
  )
}

export default MainNavbar