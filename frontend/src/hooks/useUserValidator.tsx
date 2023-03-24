import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userInfos } from '../slicers/user.slicer';

function useUserValidator() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const userValidator = () => {
      const user = localStorage.getItem('user');
      if (!user) {
        return navigate('/login');
      }
      const userParsed = JSON.parse(user);
      return dispatch(userInfos(userParsed));
    };
    userValidator();
  }, [navigate, dispatch]);

  return;
}

export default useUserValidator;
