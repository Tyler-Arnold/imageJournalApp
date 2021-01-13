import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

/**
 * Login screen
 * @param {LoginScreenProps} props
 * @return {React.FC}
 */
export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <View>
      <View>
        <TextInput
          onChangeText={(t) => setEmail(t.trim())}
          value={email}
          keyboardType="email-address"
          style={styles.loginButton}
        />
        <TextInput
          onChangeText={(p) => setPassword(p.trim())}
          value={password}
          secureTextEntry={true}
          style={styles.loginButton}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          email && password
            ? firebase.auth().signInWithEmailAndPassword(email, password)
            : null;
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formView: {flex: 0.9},
  loginButton: {flex: 0.1, marginHorizontal: 30, marginVertical: 10},
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
  },
});
