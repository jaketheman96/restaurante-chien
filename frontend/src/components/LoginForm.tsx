import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Iusers from "../interfaces/Iuser";
import { userInfos } from "../slicers/user.slicer";
import fetchWhenClicked from "../utils/postFetch";

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const emailValidation = (): boolean => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!userEmail.match(emailRegex)) return false;
    return true;
  };

  const passwordValidation = (): boolean => {
    const MIN_PASSWORD_LENGTH = 6;
    if (userPassword.length < MIN_PASSWORD_LENGTH) return false;
    return true;
  }

  const handleSubmitForm = async (event: FormEvent<EventTarget>) => {
    event.preventDefault();
    const isEmailValid = emailValidation() as boolean;
    if (!isEmailValid) return setLoginError('Email no formato inválido!')
    const isPasswordValid = passwordValidation() as boolean;
    if (!isPasswordValid) return setLoginError('Senha precisa ter no mínimo 6 caracteres!')
    const userPayload: Iusers = {
      email: userEmail,
      password: userPassword,
    }
    const loginUser = await fetchWhenClicked('POST', '/users/login', userPayload, '');
    if (loginUser.message) setLoginError(loginUser.message);
    dispatch(userInfos(loginUser));
    return navigate('/bookings')
  }

  const handleRegisterButton = (): void => {
    navigate('/register')
  }

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSubmitForm}>
          Entrar
        </button>
        <button type="button" onClick={handleRegisterButton}>
          Registrar
        </button>
      </form>
      <div>{loginError}</div>
    </div>
  )
}

export default LoginForm