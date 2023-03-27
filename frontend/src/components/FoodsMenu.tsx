import { useLocation } from 'react-router-dom';
import { useGetFetch } from '../hooks/useGetFetch';
import Ifoods from '../interfaces/Ifoods';

function FoodsMenu() {
  const { pathname } = useLocation();
  const { data, error } = useGetFetch<Ifoods[]>(`/foods${pathname}`, '');

  if (error) console.log(error);

  return (
    <>
      <div>Menu</div>
      {data &&
        data.map((food: Ifoods) => (
          <div key={food.id}>
            <p>{food.name}</p>
            <p>{food.description}</p>
            <p>{food.type}</p>
            <p>{`R$${food.price},00`}</p>
          </div>
        ))}
    </>
  );
}

export default FoodsMenu;
