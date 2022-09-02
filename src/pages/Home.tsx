import { useAuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState } from "react";
import deleteIcon from "../assets/deleteIcon.svg";
import styles from "./Home.module.css";
import { useToDos } from "../useToDos";

export const Home = () => {
  const { loggedIn, user, logOut } = useAuthContext();
  const [userName, setUsername] = useState("");
  const { newTodo, allToDos, changeTodo, handleNewTodo, handleDeleteToDo } =
    useToDos();

  function handleLogOut() {
    logOut();
  }

  function handleNameChange(input: React.ChangeEvent<HTMLInputElement>) {
    const newName = input.target.value;
    setUsername(newName);
  }

  async function handleUserName() {
    const userRef = doc(db, "users", user!.uid);
    await setDoc(
      userRef,
      {
        name: userName,
      },
      { merge: true }
    );
  }

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div>Welcome to your personal pomodoro</div>
      <button onClick={handleLogOut}>Log Out</button>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={userName}
          onChange={handleNameChange}
        />
        <button type="submit" onClick={handleUserName}>
          Submit Name
        </button>
      </div>

      <div>
        <label htmlFor="todo">New Todo: </label>
        <input type="text" id="todo" onChange={changeTodo} value={newTodo} />
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
                onClick={() => handleDeleteToDo(todo)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
