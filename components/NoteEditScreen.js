import { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const NoteEditScreen = ({currItem, goBack, deleteItem}) => { 
  const [item, setItem] = useState(currItem)
  const descriptionRef = useRef(null)

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
          <TouchableOpacity onPress={() => goBack(item)} style={styles.header}>
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
        <TouchableOpacity onPress={() => deleteItem(item)}>
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
