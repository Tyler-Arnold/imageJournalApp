import {useState} from 'react';
import {createContainer} from 'unstated-next';
import firebase from 'firebase';

/**
 * User container
 * @return {*}
 */
function useUser() {
  const [user, setUser] = useState<firebase.User | null>();
  const [token, setToken] = useState<string | null>();

  /**
   * Updates the auth user in state
   * @param {firebase.User} [upUser]
   */
  const updateUser = async (upUser?: firebase.User) => {
    const newUser = upUser ? upUser : user ? user : null;

    setUser(newUser);
    setToken(await newUser?.getIdToken());
  };

  firebase.auth().onAuthStateChanged(async (user) => {
    setUser(user);
    setToken(await user?.getIdToken());
  });

  return {user, updateUser, token};
}

export const UserContainer = createContainer(useUser);
