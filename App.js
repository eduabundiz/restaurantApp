import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NuevaOrden from './views/NuevaOrden';
import Menu from './views/Menu';
import DetallePlatillo from './views/DetallePlatillo';
import FormularioPlatillo from './views/FormularioPlatillo';
import ResumenPedido from './views/ResumenPedido';
import ProgresoPedido from './views/ProgresoPedido';

//importar state de context
import FirebaseState from './context/firebase/firebaseState';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
    <FirebaseState>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle:{
              backgroundColor:"#FFDA00"
            },
            headerTitleStyle:{
              fontWeight:'bold'
            }
          }}
        >
          <Stack.Screen 
          name="Nueva Orden"
          component={NuevaOrden}
          options={{
            title:"Nueva Orden"
          }}
          />

          <Stack.Screen 
          name="Menun"
          component={Menu}
          options={{
            title:"Nuestro Menu"
          }}
          />

          <Stack.Screen 
          name="DetallePlatilo"
          component={DetallePlatillo}
          options={{
            title:"Detalle Platillo"
          }}
          />

          <Stack.Screen 
          name="FormilarioPlatillo"
          component={FormularioPlatillo}
          options={{
            title:"Ordenar Platillo"
          }}
          />

          <Stack.Screen 
          name="ResumenPedido"
          component={ResumenPedido}
          options={{
            title:"Resumen Pedido"
          }}
          />

          <Stack.Screen 
          name="ProgresoPedido"
          component={ProgresoPedido}
          options={{
            title:"Progreso del pedido"
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FirebaseState>
    </>
  );
};


export default App;
