import { useSelector } from 'react-redux';
import NewOrderCards from '../components/NewOrderCards';
import useCart from '../hooks/useCart';
import { useGetFetch } from '../hooks/useGetFetch';
import Ifoods from '../interfaces/Ifoods';
import Iorder from '../interfaces/Iorder';
import { RootState } from '../store/store';

function NewOrder() {
  const { data, error } = useGetFetch<Ifoods[]>('/foods');
  const { addToCart } = useCart()
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const handleAddButton = (payload: Iorder) => {
    addToCart(payload)
    // handleLocalStorage();
  };

  const filterFoodByType = (type: string): Ifoods[] | null => {
    const foods = data && data.filter((food) => food.type === type);
    return foods;
  };

  const japaneseFood = filterFoodByType('japanese') as Ifoods[];
  const chineseFood = filterFoodByType('chinese') as Ifoods[];
  const italianFood = filterFoodByType('italian') as Ifoods[];

  if (error) console.log(error);

  return (
    <div>
      <div>
        <h1>Comida Japonesa</h1>
        {japaneseFood &&
          japaneseFood.map((food: Ifoods) => (
            <NewOrderCards
              key={food.id}
              id={food.id}
              name={food.name}
              description={food.description}
              price={food.price}
              type={food.type}
              handleAddButton={handleAddButton}
            />
          ))}
      </div>
      <div>
        <h1>Comida Chinesa</h1>
        {chineseFood &&
          chineseFood.map((food: Ifoods) => (
            <NewOrderCards
              key={food.id}
              id={food.id}
              name={food.name}
              description={food.description}
              price={food.price}
              type={food.type}
              handleAddButton={handleAddButton}
            />
          ))}
      </div>
      <div>
        <h1>Comida Italiana</h1>
        {italianFood &&
          italianFood.map((food: Ifoods) => (
            <NewOrderCards
              key={food.id}
              id={food.id}
              name={food.name}
              description={food.description}
              price={food.price}
              type={food.type}
              handleAddButton={handleAddButton}
            />
          ))}
      </div>
      <div>
        <p>{`Preço total: R$${totalPrice.toFixed(2)}`}</p>
      </div>
    </div>
  );
}

export default NewOrder;
