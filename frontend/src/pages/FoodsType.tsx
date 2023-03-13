import Types from "../components/Types"
import MainNavbar from "../components/MainNavbar"

// Fazer 3 cards onde clicando em um faz uma requisição com endpoint /type/:type (italian, chinese, japanese)

function FoodsType() {
  return (
    <>
      <MainNavbar />
      <Types />
    </>
  )
}

export default FoodsType;