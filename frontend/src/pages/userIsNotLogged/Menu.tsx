import { useNavigate } from "react-router-dom";
import FoodsMenu from "../../components/FoodsMenu";
import MainNavbar from "../../components/MainNavbar";

function Menu() {
  const navigate = useNavigate()

  return (
    <>
      <MainNavbar />
      <button type="button" onClick={() => navigate('/type/foods')}>Voltar</button>
      <FoodsMenu />
    </>
  )
}

export default Menu