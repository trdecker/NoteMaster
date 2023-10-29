import { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Item from '../components/Item'

function generateId() {
  const now = Date.now()
  const rand = Math.floor(Math.random() * 10000)
  return `${now}-${rand}`
}

const HomeScreen = ({ currData, chooseItem }) => {
  const [data, setData] = useState(currData)

  function newItem() {
    const item = {
      id: generateId(),
      title: '',
      body: ''
    }
    chooseItem(item)
  }

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
              body={item.body}
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
