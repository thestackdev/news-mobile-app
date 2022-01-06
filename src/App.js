import React, { useEffect } from 'react'
import GlobalFont from 'react-native-global-font'
import HomeNavigation from './navigation/home'

const App = () => {
  useEffect(() => {
    let fontName = 'Inter'
    GlobalFont.applyGlobal(fontName)
  }, [])

  return <HomeNavigation />
}

export default App
