import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { createNote } from '../api/notesApi.js'
import Item from '../components/Item'
import AsyncStorage from '@react-native-async-storage/async-storage'

function generateId() {
  const now = Date.now()
  const rand = Math.floor(Math.random() * 10000)
  return `${now}${rand}`
}

const HomeScreen = ({ currData, chooseItem }) => {
  const [data, setData] = useState(currData)

  /**
   * Create a new item, then pass that item to the parent, app.js.
   * If the note fails to be created, display an error message instead.
   */
  async function newItem() {
    const userId = await AsyncStorage.getItem('userId')
    const item = {
      id: generateId(),
      title: '',
      body: ''
    }

    const response = await createNote(userId, item)
    if (response) {
      chooseItem(item)
    }
    else {
      Alert.alert(
      'Error creating note',
      'Please try again',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: true }
    )
    }
  }

  useEffect(() => {
    console.log('Data in HomeScreen:', currData);
    setData(currData)
  }, [currData]);

  return (
    <View style={styles.body}>
      {/* Header and list of items */}
      <View style={styles.listSection}>
        <Text style={styles.header}>Notes</Text>
        <FlatList
          data={data} 
          renderItem={({ item }) =>
            <Item
              click={() => chooseItem(item)}
              title={item.title != '' ? item.title : 'No title'}
              body={item.body ?? 'No body'}
            />}
        />
      </View>
      {/* Add button */}
      <View style={styles.actions}> 
        <TouchableOpacity onPress={() => newItem()}>
          <MaterialIcons
            name='add-circle'
            size={44} color="gray"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  body: {
    padding: 24,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  listSection: {
    flex: 1
  },
  header: {
    margin: 12,
    marginBottom: 20,
    fontSize: 36,
    fontWeight: 'bold'
  },
  actions: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    paddingRight: 32,
    paddingBottom: 24
  }
})
