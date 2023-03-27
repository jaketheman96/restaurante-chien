import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userInfos } from '../slicers/user.slicer';

function useUserValidator<Iusers>() {
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
  const [userData, setUserData] = useState<Iusers>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userValidator = () => {
      const user = localStorage.getItem('user');
      if (!user) {
        setIsUserLogged(false);
        return navigate('/login');
      }
      const parsedUser = JSON.parse(user);
      dispatch(userInfos(parsedUser));
      setUserData(parsedUser);
      return setIsUserLogged(true);
    };
    userValidator();
  }, [navigate, dispatch]);

  return { isUserLogged, userData };
}

export default useUserValidator;
