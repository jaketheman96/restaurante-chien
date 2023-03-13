import { useLocation } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Ifoods from "../interfaces/Ifoods";

function FoodsMenu() {
  const { pathname } = useLocation()
  const { data, isLoading, error } = useFetch<Ifoods[]>(`/foods${pathname}`, 'get', ''); /* (route, fetchMethod, token) */

  if (error) console.log(error)

  return (
    <>
      <div>Menu</div>
      {isLoading && <div>Loading...</div>}
      {data && data.map((food: Ifoods) => (
        <div key={food.id}>
          <p>{food.name}</p>
          <p>{food.description}</p>
          <p>{food.type}</p>
          <p>{`R$${food.price},00`}</p>
        </div>
      ))}
    </>
  )
}

export default FoodsMenu