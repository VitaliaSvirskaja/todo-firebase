import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase/firebase";

async function createToDosField(userID: string) {
  const userDocRef = doc(db, "users", userID);
  await setDoc(userDocRef, { todos: [] });
}

async function getAllToDos(userID: string): Promise<string[]> {
  const allToDosRef = getReference(userID);
  const allFirestoreTodos = await getDoc(allToDosRef);
  return allFirestoreTodos.get("todos");
}

function getReference(userID: string) {
  return doc(db, "users", userID);
}

async function updateTodosUnion(userID: string, newTodo: string) {
  const allTodosRef = getReference(userID);
  await updateDoc(allTodosRef, {
    todos: arrayUnion(newTodo),
  });
}

async function updateTodosRemove(userID: string, todoName: string) {
  const allTodosRef = getReference(userID);
  await updateDoc(allTodosRef, {
    todos: arrayRemove(todoName),
  });
}

export const API = {
  getAllToDos: getAllToDos,
  updateTodosUnion: updateTodosUnion,
  updateTodosRemove: updateTodosRemove,
  createToDosField: createToDosField,
};
