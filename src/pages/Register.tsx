import { authContext } from "../AuthContext";
import { useContext, useState } from "react";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(authContext);

  function handleRegisterClick() {
    register(email, password);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  return (
    <div>
      <form>
        <div>Register</div>
        <label htmlFor="emailRegister">E-Mail:</label>
        <input type="email" id="emailRegister" onChange={handleEmailChange} />
        <label htmlFor="passwordRegister">Password:</label>
        <input
          type="password"
          id="passwordRegister"
          onChange={handlePasswordChange}
        />
      </form>
      <button onClick={handleRegisterClick}>Register</button>
      <div>
        <button>
          <a href="/login">Log in</a>
        </button>
      </div>
    </div>
  );
};