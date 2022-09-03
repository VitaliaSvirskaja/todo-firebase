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
    console.log(fetchAllTodos.name);
    if (!user) {
      return;
    }
    const allFirebaseToDos = await API.getAllToDos(user.uid);
    setAllToDos(allFirebaseToDos);
  }

  function changeTodo(input: React.ChangeEvent<HTMLInputElement>) {
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
      setAllToDos([...allToDos, newTodo]);
      setNewTodo("");
    }
  }

  async function handleDeleteToDo(todoName: string) {
    const newToDos: Array<string> = allToDos.filter(
      (todo) => todoName !== todo
    );
    setAllToDos(newToDos);
    if (!user) {
      return;
    }
    await API.updateTodosRemove(user?.uid, todoName);
  }

  return {
    newTodo: newTodo,
    allToDos: allToDos,
    changeTodo: changeTodo,
    handleDeleteToDo: handleDeleteToDo,
    handleNewTodo: handleNewTodo,
  };
}
