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
        <View style={styles.inputView}>
          <Text>Email Address:</Text>
          <TextInput
            onChangeText={(t) => setEmail(t.trim())}
            value={email}
            keyboardType="email-address"
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputView}>
          <Text>Password:</Text>
          <TextInput
            onChangeText={(p) => setPassword(p.trim())}
            value={password}
            secureTextEntry={true}
            style={styles.textInput}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          email && password
            ? firebase.auth().signInWithEmailAndPassword(email, password)
            : null;
        }}
        style={styles.loginButton}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {flex: 1, backgroundColor: 'lightblue'},
  formView: {flex: 0.9, justifyContent: 'space-evenly'},
  loginButton: {
    flex: 0.1,
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
  },
  inputView: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 30,
    borderRadius: 30,
    paddingVertical: 20,
  },
});
