import { useContext } from "react";
import { authContext } from "../AuthContext";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const { loggedIn, logOut } = useContext(authContext);

  function handleLogOut() {
    logOut();
  }

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div>Welcome to your personal pomodoro</div>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};
