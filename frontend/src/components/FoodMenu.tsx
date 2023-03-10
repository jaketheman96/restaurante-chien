import { useFetch } from "../hooks/useFetch";
import Ifoods from "../interfaces/Ifoods";

function FoodMenu() {
  const { data, isLoading, error } = useFetch<Ifoods[]>('/foods', 'get', '');

  if (error) console.log(error)

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {data && data.map((food: Ifoods) => (
        <>
          <p key={food.id}>{food.name}</p>
          <p>{food.description}</p>
          <p>{food.type}</p>
          <p>{`R$${food.price},00`}</p>
        </>
      ))}
    </div>
  )
}

export default FoodMenu