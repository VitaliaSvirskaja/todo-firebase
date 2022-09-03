import { useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { API } from "./API";

export function useToDos() {
  const { user } = useAuthContext();
  const [newTodo, setNewTodo] = useState<string>("");
  const [allToDos, setAllToDos] = useState<Array<string>>([]);

  useEffect(() => {
    fetchAllTodos();
  }, []);

  async function fetchAllTodos() {
    if (!user) {
      return;
    }
    const allFirebaseToDos = await API.getAllToDos(user.uid);
    setAllToDos(allFirebaseToDos);
  }

  function changeTodoInput(input: React.ChangeEvent<HTMLInputElement>) {
    const newTodo = input.target.value;
    setNewTodo(newTodo);
  }

  async function handleNewTodo() {
    if (!newTodo || !user) {
      alert("No task entered!");
    } else if (allToDos.includes(newTodo)) {
      alert("Task already in list!");
      setNewTodo("");
    } else {
      await API.updateTodosUnion(user.uid, newTodo);
      await fetchAllTodos();
      setNewTodo("");
    }
  }

  async function removeTodo(todoName: string) {
    if (!user) {
      return;
    }

    await API.updateTodosRemove(user?.uid, todoName);
    await fetchAllTodos();
  }

  return {
    newTodo: newTodo,
    allToDos: allToDos,
    changeTodoInput: changeTodoInput,
    removeToDo: removeTodo,
    handleNewTodo: handleNewTodo,
  };
}
