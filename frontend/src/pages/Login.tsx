import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import MainNavbar from '../components/MainNavbar';
import useUserValidator from '../hooks/useUserValidator';

function Login() {
  const { isUserLogged } = useUserValidator();
  const navigate = useNavigate();

  useEffect(() => {
    const userValidator = () => {
      if (isUserLogged === true) {
        navigate('/portal');
      }
    };
    userValidator();
  }, [isUserLogged, navigate]);

  return (
    <>
      <MainNavbar />
      <LoginForm />
    </>
  );
}

export default Login;
