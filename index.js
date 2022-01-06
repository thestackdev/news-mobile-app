import React from 'react'
import { AppRegistry, StatusBar, LogBox } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import { NavigationContainer } from '@react-navigation/native'
import RNBootSplash from 'react-native-bootsplash'

LogBox.ignoreAllLogs()

const Wrapper = () => {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <App />
    </NavigationContainer>
  )
}

AppRegistry.registerComponent(appName, () => Wrapper)
