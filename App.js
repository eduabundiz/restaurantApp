import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NuevaOrden from './views/NuevaOrden';
import Menu from './views/Menu';
import DetallePedido from './views/DetallePedido';
import FormularioPedido from './views/FormularioPedido';
import ResumenPedido from './views/ResumenPedido';
import ProgresoPedido from './views/ProgresoPedido';


const Stack = createStackNavigator();

const App = () => {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Nueva Orden"
        component={NuevaOrden}
        options={{
          title:"Nueva Orden"
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
     
    </>
  );
};


export default App;
