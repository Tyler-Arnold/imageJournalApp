import React from 'react';

import {AppearanceProvider} from 'react-native-appearance';
import {ImageContainer} from './state/ImageContainer';
import {FirebaseAuthProvider} from '@react-firebase/auth';
import firebase from 'firebase';
import 'firebase/auth';
import {firebaseConfig} from './FirebaseConfig';
import {UserContainer} from './state/UserContainer';
import {Navigation} from './Navigation';
import {FirestoreProvider} from '@react-firebase/firestore';

/**
 * Entry point for the program
 * @return {React.FC}
 */
const App: React.FC = () => {
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <FirestoreProvider firebase={firebase} {...firebaseConfig}>
        <UserContainer.Provider>
          <ImageContainer.Provider>
            <AppearanceProvider>
              <Navigation />
            </AppearanceProvider>
          </ImageContainer.Provider>
        </UserContainer.Provider>
      </FirestoreProvider>
    </FirebaseAuthProvider>
  );
};

export default App;
