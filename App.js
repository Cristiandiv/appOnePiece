import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import CadGente from './pages/cadGente';
import Home from './pages/Home';
import VerGente from './pages/verGente';
import EditGente from './pages/editGente';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
      <Tab.Navigator
      initialRouteName= "Homepage"
      screenOptions={{ headerShown: false ,  tabBarStyle: { position: 'fixed', zIndex: -1 }, }}>
      <Tab.Screen
        name="cadastrar"
        component={CadGente}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="skull" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Homepage" component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="verDados" component={VerGente}
              options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="notebook-edit" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator
    screenOptions={{ headerShown: false  }}>
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Editar" component={EditGente} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}