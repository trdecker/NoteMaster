/**
 * @file NoteEditScreen.js
 * @description the location where a user can edit and delete a note.
 * 
 * @author Tad Decker
 * 11/25/2023
 */

import { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import { deleteNote, updateNote } from '../api/notesApi'
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const NoteEditScreen = ({currItem, goBack}) => { 
  const [item, setItem] = useState(currItem)
  const descriptionRef = useRef(null)

  /**
   * @description Save the changes to the current note (this happens when the back button is pressed)
   */
  async function saveChanges() {
    const userId = await AsyncStorage.getItem('userId')
    console.log(userId)
    console.log(item)
    const newItem = { userId, ...item}

    const response = await updateNote(userId, newItem)
    if (response) {
      goBack()
    }
    else {
      Alert.alert(
      'Error saving note',
      'The note was not saved! Please try again',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: true }
    )
    }
  }

/**
 * @param {Object} item
 * @description Delete the note, then return to the home screen.
 */
  async function handleDeleteItem(item) {
    const userId = await AsyncStorage.getItem('userId')
    const response = await deleteNote(userId, item)
    if (response) {
      goBack()
    }
    else {
      Alert.alert(
      'Error deleting note',
      'Please try again',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: true }
    )
    }
  }

  const focusDescription = () => {
    if (descriptionRef.current)
      descriptionRef.current.focus()
  }

  return (
    <View style={styles.body}>
      <View style={{ flex: 1 }}>
        {/* Menu Bar */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        {/* Header */}
          <TouchableOpacity onPress={() => saveChanges()} style={styles.header}>
            <MaterialIcons name='chevron-left' size={20} /> 
            <Text style={{ fontWeight: 'bold' }}>Notes</Text>
          </TouchableOpacity>
        </View>
        {/* Title */}
        <TextInput 
          style={styles.title} 
          value={item?.title ?? ''} 
          placeholder="No title"
          onChangeText={(text) => {
            setItem({ ...item, title: text });
          }}
        />
        {/* Description */}
        <View style={styles.descriptionBox}> 
          <TextInput
            ref={descriptionRef}
            style={styles.description}
            value={item?.body ?? ''}
            placeholder="Write something..."
            multiline
            editable
            textAlignVertical="top"
            scrollEnabled
            rows="8"
            numberOfLines="6"
            onChangeText={(text) => {
              // Update item when description changes
              setItem({ ...item, body: text })
            }}
          />
        </View>
      </View>

      {/* Action button */}
      <View style={styles.actions}> 
        {/* Delete Button */}
        <TouchableOpacity onPress={() => handleDeleteItem(item)}>
          <MaterialIcons
            name="delete"
            size={40} color="gray"
          />
        </TouchableOpacity>
        {/* Edit Button */}
        <TouchableOpacity onPress={focusDescription}>
          <MaterialIcons 
            name="edit"
            size={44} color="gray"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NoteEditScreen

const styles = StyleSheet.create({
  body: {
    paddingTop: 12,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 16,
    flex: 1,
    justifyContent: 'space-between'
  },
  header: {
    marginLeft: 0,
    paddingLeft: 0,
    marginBottom: 8,
    fontSize: 20,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center'
  },
  descriptionBox: {
    flex: 1
  },
  description: {
    flex: 1,
    fontSize: 16
  },
  title: {
    fontSize: 20
  },
  actions: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    paddingRight: 32,
    paddingBottom: 24
  }
})