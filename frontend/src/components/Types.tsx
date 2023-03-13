import { Link } from "react-router-dom"

function Types() {
  return (
    <div>
      <Link to="/menu/italian">
        <div>
          <p>Italiano</p>
          <img src="*" alt="italian logo" />
          <p>Servimos comida italiana com uma massa artesanal feita especialmente pela casa!</p>
        </div>
      </Link>
      <Link to="/menu/japanese">
        <div>
          <p>Japonesa</p>
          <img src="*" alt="japanese logo" />
          <p>Contamos também com um sushiman renomado da cidade, que já ganhou diversos eventos de gastronomia japonesa pelo Brasil!</p>
        </div>
      </Link>
      <Link to="/menu/chinese">
        <div>
          <p>Chinesa</p>
          <img src="*" alt="chinese logo" />
          <p>Temos comidas chinesas também com receitas especiais feitas pela chef da casa!</p>
        </div>
      </Link>
    </div>
  )
}

export default Types