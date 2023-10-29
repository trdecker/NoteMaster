import { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import HomeScreen from './components/HomeScreen'
import NoteEditScreen from './components/NoteEditScreen'
import appData from './assets/data'

// You can import supported modules from npm
import { Card } from 'react-native-paper'

export default function App() {
  const [screen, setScreen] = useState("HOME")
  const [data, setData] = useState(appData)
  const [currNote, setCurrNote] = useState(appData[1])

  const goHome = (currNote) => {
    let newData
    // If an id exists in the list of information, update that item.
    if (data.some(obj => (obj.id === currNote.id))) {
      newData = data.map(obj => {
        if (obj.id === currNote.id) {
          return { ...currNote }
        }
        return obj
      })
    } 
    // Otherwise, add it as a new item.
    else {
      newData = data
      newData.push(currNote)
    }

    setData(newData)
    setScreen("HOME")
  }

  const selectNote = (item) => {
    setCurrNote(item)
    setScreen("NOTE")
  }

  const deleteItem = (item) => {
    const newData = data.filter(currItem => currItem.id !== item.id)
    setData(newData)
    setScreen("HOME")
  }

  return (
    <SafeAreaView style={styles.main}>
      {/* Content */}
      <View style={{ flex: 1 }}> 
        { screen === "HOME" ? 
          <HomeScreen 
            currData={data} 
            chooseItem={selectNote} 
          /> 
          : null 
        }
        { screen === "NOTE" ? 
          <NoteEditScreen 
            currItem={currNote} 
            goBack={goHome}
            deleteItem={deleteItem} 
          /> 
          : null
        }
      </View>
    </SafeAreaView>
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
