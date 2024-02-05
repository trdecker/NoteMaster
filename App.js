/**
 * @file app.js
 * @description Entry for application.
 * @author Tad Decker
 * 
 * TODO: simplify functions involving changing screens
 * 11/11/2023
 */

import { useState, useEffect, } from 'react'
import { StyleSheet, SafeAreaView, View, Button} from 'react-native'
import HomeScreen from './components/HomeScreen'
import NoteEditScreen from './components/NoteEditScreen'
import LoginScreen from './components/LoginScreen'
import { getNotes } from './api/notesApi'
import AsyncStorage from '@react-native-async-storage/async-storage'


/**
 * @description The entry point for the application.
 */
export default function App() {
  // Initialize variables
  const [screen, setScreen] = useState("LOGIN")
  const [data, setData] = useState([])
  const [currNote, setCurrNote] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (screen === "HOME")
      fetchData()
  }, [screen])

  async function fetchData() {
    try {
      const userId = await AsyncStorage.getItem('userId')
      const result = await getNotes(userId) // FIXME: update this dynamically!

      setData(result.notes)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * @function goHome
   * @param {Object} currNote
   * @description Edit a note in the database. Re-load the notes. Transition to the homescreen.
   */
  const goHome = async () => {
    fetchData()
    setScreen("HOME")
  }

  const selectNote = (item) => {
    setCurrNote(item)
    setScreen("NOTE")
  }

  const changeScreen = (screen) => {
    setScreen(screen)
  }

  return (
    // <AuthProvider>
    //   {/**  */}
      <SafeAreaView style={styles.main}>
        {/* <Button onPress={fetchData} /> */}
        {/* Content */}
        <View style={{ flex: 1 }}> 
          {/* lOGIN screen */}
          {
            screen === "LOGIN" ?
            <LoginScreen 
              changeScreen={changeScreen}
            />
            : null
          }
          {/* HOME screen */}
          { 
            screen === "HOME" ? 
            <HomeScreen 
              currData={data} 
              chooseItem={selectNote}
            /> 
            : null 
          }
          {/* NOTE edit screen */}
          { 
            screen === "NOTE" ? 
            <NoteEditScreen 
              currItem={currNote}
              goBack={goHome}
            /> 
            : null
          }
        </View>
        {/*<Button title="Test" onPress={test} />*/}
      </SafeAreaView>
    // </AuthProvider>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginRight: 32,
    marginBottom: 44,
    justifyContent: 'space-between'
  }
})
