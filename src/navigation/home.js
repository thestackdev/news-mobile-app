import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Screens from '../screens/exports'

const Stack = createNativeStackNavigator()

const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Screens.Home}
        options={{
          title: 'Daily news',
          headerStyle: { backgroundColor: '#fff' },
          headerTitleStyle: { fontFamily: 'Inter-Bold', fontSize: 23 },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: '#4285F4',
        }}
      />
      <Stack.Screen
        name="Details"
        component={Screens.Deatils}
        options={{
          title: '',
          headerStyle: { backgroundColor: '#fff' },
          headerShadowVisible: false,
          headerTintColor: '#4285F4',
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeNavigation
