import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CadGente from './cadGente';
import Home from './Home';
import VerGente from './verGente';
import EditGente from './editGente';

const Tab = createBottomTabNavigator();

export default function RotasTab() {
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
            <MaterialCommunityIcons name="skull" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="editar" component={EditGente}
              options={{
          tabBarVisibilityAnimationConfig: false
        }}
      />
    </Tab.Navigator>
  );
}