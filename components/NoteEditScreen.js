import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const NoteEditScreen = ({goHome, item}) => {

  return (
    <View style={styles.container}>
      {/* Menu Bar */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        {/* Title */}
        <Text style={styles.title} onPress={goHome}>
          {'<'} Notes
        </Text>
        {/* Actions */}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <MaterialIcons name="edit" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="delete" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Note contents */}
      <Text>
        { item?.title ?? 'NA'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Useless Text"
        multiline
        textAlignVertical="top"
        scrollEnabled
        rows="8"
        numberOfLines="6"
      />
    </View>
  )
}

export default NoteEditScreen

const styles = StyleSheet.create({
  container: {},
  title: {},
  input: {}
})