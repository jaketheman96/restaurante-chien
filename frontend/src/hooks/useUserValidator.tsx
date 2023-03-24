import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userInfos } from '../slicers/user.slicer';

function useUserValidator() {
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userValidator = () => {
      const user = localStorage.getItem('user');
      if (!user) {
        setIsUserLogged(false)
        return navigate('/login');
      }
      const userParsed = JSON.parse(user);
      dispatch(userInfos(userParsed));
      return setIsUserLogged(true);
    };
    userValidator();
  }, [navigate, dispatch]);

  return { isUserLogged };
}

export default useUserValidator;
