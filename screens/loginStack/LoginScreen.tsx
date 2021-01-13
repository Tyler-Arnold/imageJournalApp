import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import {TextInput} from 'react-native-gesture-handler';

/**
 * Login screen
 * @param {LoginScreenProps} props
 * @return {React.FC}
 */
export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <View style={styles.screenView}>
      <View style={styles.formView}>
        <TextInput
          onChangeText={(t) => setEmail(t.trim())}
          value={email}
          keyboardType="email-address"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(p) => setPassword(p.trim())}
          value={password}
          secureTextEntry={true}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          email && password
            ? firebase.auth().signInWithEmailAndPassword(email, password)
            : null;
        }}
        style={styles.loginButton}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {flex: 1},
  formView: {flex: 0.9, justifyContent: 'space-evenly'},
  loginButton: {
    flex: 0.1,
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: 'grey',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
