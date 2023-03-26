import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userInfos } from '../slicers/user.slicer';

function useUserValidator() {
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userValidator = () => {
      const user = localStorage.getItem('user');
      if (!user) {
        setIsUserLogged(false);
        return navigate('/login');
      }
      dispatch(userInfos(JSON.parse(user)));
      return setIsUserLogged(true);
    };
    userValidator();
  }, [navigate, dispatch]);

  return { isUserLogged };
}

export default useUserValidator;
