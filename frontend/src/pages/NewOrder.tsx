import NewOrderCards from '../components/NewOrderCards';
import useCart from '../hooks/useCart';
import { useGetFetch } from '../hooks/useGetFetch';
import Ifoods from '../interfaces/Ifoods';
import Iorder from '../interfaces/Iorder';

function NewOrder() {
  const { data, error } = useGetFetch<Ifoods[]>('/foods');
  const { addToLocalCart, totalPrice, removeFromLocalCart } = useCart();

  const handleAddButton = (payload: Iorder) => {
    addToLocalCart(payload);
  };

  const handleRemoveButton = (payload: Iorder) => {
    removeFromLocalCart(payload);
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
              handleRemoveButton={handleRemoveButton}
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
              handleRemoveButton={handleRemoveButton}
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
              handleRemoveButton={handleRemoveButton}
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
