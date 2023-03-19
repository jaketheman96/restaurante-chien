import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useUserValidator() {
  const navigate = useNavigate();

  useEffect(() => {
    const userValidator = () => {
      const user = localStorage.getItem('user');
      if (!user) {
        return navigate('/login');
      }
      return;
    };
    userValidator();
  }, [navigate]);

  return;
}

export default useUserValidator;
