import PortalNavbar from '../components/PortalNavbar';

function Payment() {
  return (
    <>
      <PortalNavbar />
      <label htmlFor='payment-method'>
        Selecione o método de Pagamento:
        <select name='payment-method' id='payment-method'>
          <option value='credit'>Crédito</option>
          <option value='debit'>Débito</option>
          <option value='pix'>Pix</option>
          <option value='congrats'>Meus parabéns!</option>
        </select>
      </label>
    </>
  );
}

export default Payment;
