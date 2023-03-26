import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import NewBooking from './components/NewBooking';
import NewOrder from './pages/NewOrder';
import Iloading from './interfaces/Iloading';
import About from './pages/About';
import Bookings from './pages/Bookings';
import Contact from './pages/Contact';
import FoodsType from './pages/FoodsType';
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Portal from './pages/Portal';
import Register from './pages/Register';
import { RootState } from './store/store';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import DeliveryAddress from './components/DeliveryAddress';

function App() {
  const { isLoading } = useSelector(
    (state: RootState): Iloading => state.isLoading
  );

  return (
    <div className='App'>
      <Routes>
        {/* User is not logged! */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/type/foods' element={<FoodsType />} />
        <Route path='/menu/:type' element={<Menu />} />
        {/* User is logged! */}
        <Route path='/portal' element={<Portal />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/orders/new' element={<NewOrder />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/bookings/new' element={<NewBooking />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/checkout/address' element={<DeliveryAddress />} />
        <Route path='/checkout/payment' element={<Payment />} />
      </Routes>
      {isLoading && <LoadingSpinner />}
    </div>
  );
}

export const componentType = typeof App;

export default App;
