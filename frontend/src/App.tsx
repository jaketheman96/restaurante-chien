import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Bookings from './pages/Bookings';
import Contact from './pages/Contact';
import FoodsType from './pages/FoodsType';
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Orders from './pages/Orders';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/type/foods' element={<FoodsType />} />
        <Route path='/menu/:type' element={<Menu />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/bookings' element={<Bookings />} />
      </Routes>
    </div>
  );
}

export default App;
