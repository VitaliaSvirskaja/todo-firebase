import { useAuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";
import deleteIcon from "../assets/deleteIcon.svg";
import styles from "./Home.module.css";
import { useToDos } from "../useToDos";

export const Home = () => {
  const { loggedIn, logOut } = useAuthContext();
  const { newTodo, allToDos, changeTodoInput, handleNewTodo, removeToDo } =
    useToDos();

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

      <div>
        <label htmlFor="todo">New Todo: </label>
        <input
          type="text"
          id="todo"
          onChange={changeTodoInput}
          value={newTodo}
        />
        <button onClick={handleNewTodo}>Add todo</button>
      </div>

      <div>
        <div>Tasks:</div>
        <ul>
          {allToDos.map((todo) => (
            <li key={todo}>
              {todo}
              <img
                src={deleteIcon}
                alt="deleteIcon"
                className={styles.deleteIcon}
                onClick={() => removeToDo(todo)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
