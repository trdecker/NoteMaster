/**
 * @file LoginScreen.js
 * @author Tad Decker
 * 
 * 11/24/2023
 */

import { useState, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet, TextInput, TouchableOpacity, Image, Alert, Keyboard } from 'react-native'
import { signup, login } from '../api/usersApi'
import { Asset } from 'expo-asset'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = ({ changeScreen }) => {
  const [logo, setLogo] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  useEffect(() => {
    const loadImage = async () => {
      const imageAsset = await Asset.fromModule(require('../assets/NoteMasterLogo.png')).downloadAsync()
      setLogo(imageAsset)
    }

    loadImage()
  })

  /**
   * @description When user taps off keyboard, vanish the keyboard.
   */
  function handleScreenTap() {
    Keyboard.dismiss()
  }

  /**
   * @description Sign up the user. On success, change to HOME screen.
   */
  async function handleSignup() {
    const response = await signup(username, password)
    if (response) {
      await AsyncStorage.setItem('username', response.username)
      await AsyncStorage.setItem('userId', response.userId)
      await AsyncStorage.setItem('authToken', response.token)

      // Go to home screen
      changeScreen("HOME")
    }
    else {
      Alert.alert(
      'Error signing up',
      'Username may be already taken',
      [{ text: 'OK'}],
      { cancelable: true }
    )
    }
  }

  async function handleLogin() {
    // const response = await login(username, password)
    const response = await login(username, password)
    if (response) {
      await AsyncStorage.setItem('username', response.username)
      await AsyncStorage.setItem('userId', response.userId)
      await AsyncStorage.setItem('authToken', response.token)


      // Go to home screen
      changeScreen("HOME")
    }
    else {
      Alert.alert(
      'Error logging in',
      'Incorrect username or password',
      [{ text: 'OK'}],
      { cancelable: true }
    )
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <View style={styles.body}>
        {logo && <Image style={styles.logo} source={{ uri: logo.localUri }} />}
        {/* Username entry */}
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Username"
              autoCapitalize="none"
              placeholderTextColor="#003f5c"
              onChangeText={(username) => setUsername(username)}
            />
          </View>

        {/* Password entry */}
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Password"
            autoCapitalize="none"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        {/* Login button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        {/* Sign in button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <Text style={styles.loginText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  body: {
    padding: 24,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  inputView: {
    backgroundColor: "#F0FFFF",
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    width: "70%",
    height: 45,
    alignItems: "center",
  },
  loginButton: {
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#62708A",
  },
  loginText: {
    color: 'white'
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  }

})
