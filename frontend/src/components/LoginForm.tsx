import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate()

  const handleSubmitForm = (event: FormEvent<EventTarget>): void => {
    event.preventDefault();
    console.log('entrei');
  }

  const handleRegisterButton = (): void => {
    navigate('/register')
  }

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email:
          <input type="text" name="email" />
        </label>
        <label htmlFor="password">
          Password:
          <input type="text" name="password" />
        </label>
        <button type="submit" onClick={handleSubmitForm}>
          Entrar
        </button>
        <button type="button" onClick={handleRegisterButton}>
          Registrar
        </button>
      </form>
    </div>
  )
}

export default LoginForm