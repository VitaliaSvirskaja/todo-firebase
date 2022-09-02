import { useState } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { useAuthContext } from "./AuthContext";

export function useToDos() {
  const { user } = useAuthContext();
  const [newTodo, setNewTodo] = useState<string>("");
  const [allToDos, setAllToDos] = useState<Array<string>>([]);

  function changeTodo(input: React.ChangeEvent<HTMLInputElement>) {
    const newTodo = input.target.value;
    setNewTodo(newTodo);
  }
  async function handleNewTodo() {
    if (!newTodo) {
      alert("No task entered!");
    } else if (allToDos.includes(newTodo)) {
      alert("Task already in list!");
      setNewTodo("");
    } else {
      const todoRef = doc(db, "users", user!.uid);
      await updateDoc(todoRef, {
        todo: arrayUnion(newTodo),
      });
      setAllToDos([...allToDos, newTodo]);
      setNewTodo("");
    }
  }
  async function handleDeleteToDo(todoName: string) {
    const newToDos: Array<string> = allToDos.filter(
      (todo) => todoName !== todo
    );
    setAllToDos(newToDos);
    const todoRef = doc(db, "users", user!.uid);
    await updateDoc(todoRef, { todo: arrayRemove(todoName) });
  }

  return {
    newTodo: newTodo,
    allToDos: allToDos,
    changeTodo: changeTodo,
    handleDeleteToDo: handleDeleteToDo,
    handleNewTodo: handleNewTodo,
  };
}
