import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/screens/home';
import Progate from '@/screens/progate';
import Contact from '@/screens/contact';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Progate" component={Progate} />
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
  );
};

export default App;
