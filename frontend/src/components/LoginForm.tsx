import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useTimeout from '../hooks/useTimeout';
import Iusers from '../interfaces/Iuser';
import { setIsLoading } from '../slicers/loading.slicer';
import { userInfos } from '../slicers/user.slicer';
import fetchWhenClicked from '../utils/allFetchMethods';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  useEffect(() => {
    const emailInputValidation = () => {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const isEmailValid = userEmail.match(emailRegex);
      return isEmailValid;
    };
    const passwordInputValidation = () => {
      const MINIMUM_PASS_LENGTH = 6;
      const isPasswordValid = userPassword.length >= MINIMUM_PASS_LENGTH;
      return isPasswordValid;
    };
    const buttonControl = () => {
      const emailValidation = emailInputValidation();
      const passwordValidation = passwordInputValidation();
      if (emailValidation && passwordValidation) {
        return setIsButtonDisabled(false);
      }
      return setIsButtonDisabled(true);
    };
    buttonControl();
  });

  const handleSubmitForm = async (event: FormEvent<EventTarget>) => {
    event.preventDefault();
    dispatch(setIsLoading(true));
    try {
      const userPayload: Iusers = {
        email: userEmail,
        password: userPassword,
      };
      const loginUser = await fetchWhenClicked(
        'POST',
        '/users/login',
        userPayload,
        ''
      );
      if (loginUser.message) return setLoginError('Login inválido');
      localStorage.setItem('user', JSON.stringify(loginUser));
      dispatch(userInfos(loginUser));
    } catch (error: any) {
      return setLoginError(error.message);
    } finally {
      dispatch(setIsLoading(false));
    }
    return navigate('/portal');
  };

  const handleRegisterButton = (): void => {
    navigate('/register');
  };

  const TWO_SECONDS = 2000

  useTimeout(() => setLoginError(''), TWO_SECONDS, '');

  return (
    <div>
      <form>
        <label htmlFor='email'>
          Email:
          <input
            type='text'
            name='email'
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </label>
        <label htmlFor='password'>
          Password:
          <input
            type='password'
            name='password'
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </label>
        <button
          type='submit'
          onClick={handleSubmitForm}
          disabled={isButtonDisabled}
        >
          Entrar
        </button>
        <button type='button' onClick={handleRegisterButton}>
          Registrar
        </button>
      </form>
      <div>{loginError}</div>
    </div>
  );
}

export default LoginForm;
