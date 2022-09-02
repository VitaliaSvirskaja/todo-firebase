import firebase from "firebase/compat";
import React, { PropsWithChildren, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db, firebaseAuth } from "./firebase/firebase";
import UserInfo = firebase.UserInfo;
import { doc, setDoc } from "firebase/firestore";

interface AuthContext {
  user: UserInfo | null;
  loggedIn: boolean;
  todo: Array<string>;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  register: (email: string, password: string) => void;
}

const authContext = React.createContext<AuthContext>({
  user: null,
  loggedIn: false,
  todo: [],
  logIn: () => {},
  logOut: () => {},
  register: () => {},
});

export const AuthContextProvider = (props: PropsWithChildren) => {
  const [firebaseUser, setFirebaseUser] = useState<UserInfo | null>(null);

  async function logIn(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    setFirebaseUser(userCredential.user);
  }

  async function logOut() {
    await firebaseAuth.signOut();
    setFirebaseUser(null);
  }

  async function register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      setFirebaseUser(userCredential.user);
      const users = doc(db, "users", userCredential.user.uid);
      await setDoc(users, { email: userCredential.user.email, todo: [] });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <authContext.Provider
      value={{
        user: firebaseUser,
        loggedIn: !!firebaseUser,
        todo: [],
        logIn: logIn,
        logOut: logOut,
        register: register,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(authContext);
};
