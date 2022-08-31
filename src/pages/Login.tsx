import { useState } from "react";
import "./Login.css";
import { useAuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, loggedIn } = useAuthContext();

  function handleLogInClick() {
    logIn(email, password);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div>
        <form>
          <div>Log in</div>
          <label htmlFor="emailLogin">E-Mail:</label>
          <input type="email" id="emailLogin" onChange={handleEmailChange} />
          <label htmlFor="passwordLogin">Password:</label>
          <input
            type="password"
            id="passwordLogin"
            onChange={handlePasswordChange}
          />
        </form>
        <button onClick={handleLogInClick}>Log in</button>
        <div>
          <button>
            <a href="/register">Register</a>
          </button>
        </div>
      </div>
    </div>
  );
}
