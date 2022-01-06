import React from 'react'
import { View, Image, StyleSheet, Text, Pressable, Linking } from 'react-native'
import moment from 'moment'

const Deatils = ({ route }) => {
  const data = route.params
  return (
    <View style={Styles.Container}>
      <Image style={Styles.ArticleImage} source={{ uri: data.urlToImage }} />
      <Text style={Styles.ArticleDescription}>{data.description}</Text>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={Styles.ArticleTimestamp}>
          {moment(data.publishedAt).fromNow()}
        </Text>
        {data.source.name && (
          <Text style={Styles.Source}>{data.source.name}</Text>
        )}
      </View>
      <Pressable
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          backgroundColor: '#4285F4',
          alignItems: 'center',
          padding: 9,
          borderRadius: 7,
        }}
        onPress={() => Linking.openURL(data.url)}
      >
        <Text style={{ color: '#fff', fontSize: 19 }}>Read More</Text>
      </Pressable>
    </View>
  )
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  ArticleImage: {
    height: 300,
    width: '100%',
    borderRadius: 9,
  },
  ArticleDescription: {
    padding: 7,
    fontSize: 19,
    color: '#455A64',
    fontFamily: 'Inter-Regular',
    lineHeight: 23,
  },
  ArticleTimestamp: {
    color: '#BDBDBD',
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  Source: {
    color: '#9E9E9E',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
})

export default Deatils
