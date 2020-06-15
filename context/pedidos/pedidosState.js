import React,{ useReducer } from 'react';

import PedidoReducer from './pedidosReducer';
import PedidoContext from './pedidosContext';


const PedidoState = props =>{
    

    //Crear State Inicial
    const initialState = {
        pedido: []
    }

    // useReducer con dispatch para ejecutar las funciones 
    const [state,dispatch] = useReducer(PedidoReducer,initialState);

    return(
        <PedidoContext.Provider
            value={{
                pedido:state.pedido
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    )
}

export default PedidoState