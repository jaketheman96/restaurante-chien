import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useRoleValidator from '../hooks/useRoleValidator';
import useTimeout from '../hooks/useTimeout';
import Iusers from '../interfaces/Iuser';
import { setIsLoading } from '../slicers/loading.slicer';
import { userInfos } from '../slicers/user.slicer';
import fetchWhenClicked from '../utils/allFetchMethods';

function RegisterForm() {
  const { roleValidator } = useRoleValidator();
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [showRegisterError, setShowRegisterError] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const nameInputValidation = () => {
      const MINIMUM_NAME_LENGTH = 3;
      const isNameValid = userName.length >= MINIMUM_NAME_LENGTH;
      return isNameValid;
    };
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
      const nameValidation = nameInputValidation();
      const emailValidation = emailInputValidation();
      const passwordValidation = passwordInputValidation();
      if (nameValidation && emailValidation && passwordValidation) {
        return setIsButtonDisabled(false);
      }
      return setIsButtonDisabled(true);
    };
    buttonControl();
  });

  const handleSubmit = async (event: FormEvent<EventTarget>) => {
    event.preventDefault();
    try {
      dispatch(setIsLoading(true));
      const payload: Iusers = {
        name: userName,
        email: userEmail,
        password: userPassword,
        role: 'customer',
      };
      const registerUser = await fetchWhenClicked(
        'post',
        '/users/register',
        payload,
        ''
      );
      if (registerUser.message) {
        return setShowRegisterError('Esse email já existe');
      }
      localStorage.setItem('user', JSON.stringify(registerUser));
      dispatch(userInfos(registerUser));
      roleValidator(registerUser.role);
    } catch (error: any) {
      return setShowRegisterError(error.message);
    } finally {
      dispatch(setIsLoading(false));
    }
    return navigate('/portal');
  };

  const TWO_SECONDS = 2000;

  useTimeout(() => setShowRegisterError(''), TWO_SECONDS, '');

  return (
    <div>
      <p>Registrar:</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>
          Name:
          <input
            type='text'
            name='name'
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label htmlFor='email'>
          Email:
          <input
            type='email'
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
          disabled={isButtonDisabled}
          onClick={handleSubmit}
        >
          Registrar
        </button>
        <button type='button' onClick={() => navigate('/login')}>
          Voltar
        </button>
      </form>
      <div>{showRegisterError}</div>
    </div>
  );
}

export default RegisterForm;
