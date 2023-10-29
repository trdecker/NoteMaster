import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default Item = ({click, title, body}) => (
  <TouchableOpacity onPress={click}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>     {body.slice(0,15)}{ body.length > 15 ? "..." : null }</Text>
      <View style={styles.line} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  description: {
    fontSize: 16
  },
  title: {
    fontSize: 20
  },
  line: {
    height: 1,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: 'gray'
  }
})