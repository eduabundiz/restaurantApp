import React,{ useReducer } from 'react';

import firebase from '../../firebase/';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';

import { OBTENER_PRODUCTOS_EXITO } from '../../types';

const FirebaseState = props =>{
    
    console.log(firebase)
    //Crear State Inicial
    const initialState = {
        menu:[]
    }

    // useReducer con dispatch para ejecutar las funciones 
    const [state,dispatch] = useReducer(FirebaseReducer,initialState);

    //Funcion que se ejecuta para traer los productos
    const obtenerProductos = () =>{
        

        //Consultar Firebase
        try {
            firebase.db
            .collection('productos')
            .where('existencia','==',true) //Solo los que estén en existencia
            .onSnapshot(manejarSnapshot);
            
            function manejarSnapshot(snapshot) {
                let platillos = snapshot.docs.map(doc =>{
                    return{
                        id: doc.id,
                        ...doc.data()
                    }
                }) ;
                
                //Tenemos resultados de la base de datos                
                dispatch({
                    type:OBTENER_PRODUCTOS_EXITO,
                    payload:platillos
                });
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return(
        <FirebaseContext.Provider
            value={{
                menu:state.menu,
                firebase,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState