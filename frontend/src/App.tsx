import { Route, Routes } from 'react-router-dom';
import './App.css';
import Bookings from './pages/Bookings';
import Foods from './pages/Foods';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/foods' element={<Foods />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/bookings' element={<Bookings />} />
      </Routes>
    </div>
  );
}

export default App;
