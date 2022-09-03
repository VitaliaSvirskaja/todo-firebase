import { useAuthContext } from "../AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuthContext();
  const navigate = useNavigate();

  function handleRegisterClick() {
    register(email, password);
    navigate("/login");
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
