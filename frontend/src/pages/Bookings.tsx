import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Ilogged from "../interfaces/Iuser";
import { RootState } from "../store/store";

function Bookings() {
  const { token } = useSelector((state: RootState): Ilogged => state.user);
  const navigate = useNavigate()

  useEffect(() => {
    const userValidator = (): void => {
      if (!token) return navigate('/login');
      return;
    }
    userValidator()
  }, [navigate, token])
  
  return (
    <div>This is Bookings page!</div>
  )
}

export default Bookings