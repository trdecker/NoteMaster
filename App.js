import React from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import HomeScreen from './components/HomeScreen'
import NoteEditScreen from './components/NoteEditScreen'

export default function App() {
  let screen = "NOTE"

  let currNote = null

  const goHome = () => {
    currNote = null
    screen = "HOME"
    console.log(screen)
  }

  const selectNote = (item) => {
    console.log("foo")
    currNote = item
    screen = "NOTE"
  }

  return (
    <SafeAreaView>
      { screen == "HOME" ? <HomeScreen chooseItem={selectNote}/> : null }
      { screen == "NOTE" ? <NoteEditScreen item={currNote} goHome={goHome} /> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
