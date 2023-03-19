import useUserValidator from '../hooks/useUserValidator';

function Bookings() {
  useUserValidator();

  return (
    <div>This is bookings page</div>
  );
}

export default Bookings;
