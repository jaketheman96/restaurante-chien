import Ifoods from '../interfaces/Ifoods';

function FoodsOrderCard(props: Ifoods) {
  return (
    <div>
      <p>{props.name}</p>
      <p>{`R$${props.price.toFixed(2).replace('.', ',')}`}</p>
      <p>{`Qtd: ${String(props.quantity).padStart(2, '0')}`}</p>
    </div>
  );
}

export default FoodsOrderCard;
