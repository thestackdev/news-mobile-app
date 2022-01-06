import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  BackHandler,
} from 'react-native'
import axios from 'axios'
import moment from 'moment'
import { BASE_URL } from '@env'

const Categories = [
  'headlines',
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
]

const Home = ({ navigation }) => {
  const [news, setNews] = useState([])
  const [currentSelection, setCurrentSelection] = useState(Categories[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [shouldFetch, setShouldFetch] = useState(true)
  const scrollRef = useRef()

  const fetchNews = async (page) => {
    try {
      const response = await axios.get(
        BASE_URL + `/${currentSelection}?page=${page}&pageSize=10`
      )
      setNews((prev) => [...prev, ...response.data])
    } catch (error) {
      if (error.response) setShouldFetch(false)
    }
  }

  const resetSelection = () => {
    if (currentSelection === Categories[0]) return false
    setCurrentSelection(Categories[0])
    scrollRef.current?.scrollTo({ y: 0, animated: true })
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', resetSelection)
    setNews([])
    setShouldFetch(true)
    setCurrentPage(1)
    fetchNews(1)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', resetSelection)
    }
  }, [currentSelection])

  return (
    <View style={Styles.Container}>
      <ScrollView ref={scrollRef} horizontal={true} style={Styles.TopBar}>
        {Categories.map((category, index) => (
          <Pressable
            onPress={() => setCurrentSelection(category)}
            key={index}
            style={Styles.CategoryContainer}
          >
            <Text style={Styles.CategoryText}>{category}</Text>
            {category === currentSelection && (
              <View
                style={{
                  backgroundColor: '#4285F4',
                  height: 3,
                  width: '70%',
                  marginVertical: 5,
                }}
              ></View>
            )}
          </Pressable>
        ))}
      </ScrollView>
      <ScrollView
        style={{ flex: 1, marginHorizontal: 19 }}
        onScroll={(e) => {
          let paddingToBottom = 10
          paddingToBottom += e.nativeEvent.layoutMeasurement.height
          if (
            e.nativeEvent.contentOffset.y >=
            e.nativeEvent.contentSize.height - paddingToBottom
          )
            if (shouldFetch) {
              setCurrentPage((prev) => prev + 1)
              fetchNews(currentPage + 1)
            }
        }}
      >
        {news.map((data, index) => (
          <Pressable
            onPress={() => navigation.navigate('Details', data)}
            key={index}
            style={Styles.ArticleContainer}
          >
            <Image
              style={Styles.ArticleImage}
              source={{ uri: data.urlToImage }}
            />
            <Text style={Styles.ArticleTitle}>{data.title}</Text>
            <Text style={Styles.ArticleTimestamp}>
              {moment(data.publishedAt).fromNow()}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  TopBar: {
    flexGrow: 0,
    marginHorizontal: 9,
  },
  CategoryContainer: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 18,
    marginHorizontal: 5,
    marginBottom: 9,
  },
  CategoryText: {
    color: '#455A64',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  ArticleContainer: {
    flexDirection: 'column',
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    paddingBottom: 12,
    marginVertical: 7,
  },
  ArticleImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  ArticleTitle: {
    padding: 7,
    fontSize: 16,
    color: '#455A64',
    fontFamily: 'Inter-Regular',
  },
  ArticleTimestamp: {
    color: '#607D8B',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    width: '97%',
    textAlign: 'right',
  },
})

export default Home
