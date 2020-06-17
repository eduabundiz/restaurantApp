import React,{ useContext, useEffect} from 'react';
import {StyleSheet,Alert} from 'react-native';
import { 
    Container,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Button,
    H1,
    Footer,
    FooterTab
    
} from 'native-base';
import { useNavigation} from '@react-navigation/native';
import globalStyle from '../styles/global';
import firebase from '../firebase';

import PedidoContext from '../context/pedidos/pedidosContext';

const  ResumenPedido = () =>{

    const navigation = useNavigation();

    //Context de pedido
    const { pedido , total, mostrarResumen, eliminarProducto, pedidoRealizado}  = useContext(PedidoContext);
    
    useEffect(()=>{
        calcularTotal();
    },[pedido]);

    const calcularTotal = () =>{
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce(( nuevoTotal, articulo )=> nuevoTotal + articulo.total, 0 )
        mostrarResumen(nuevoTotal)
    }

    //Redirecciona a progreso de pdido
    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizas tu pedido no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        //Crear un objeto 
                        const pedidoObj = {
                            tiempoentrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido, // array
                            creado: Date.now()
                        }

                        try{
                            const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                            pedidoRealizado(pedido.id)                            
                            //Redireccionar a progreso
                            navigation.navigate("ProgresoPedido")
                        }catch(error){
                            console.log(error)
                        }
                        
                        
                    }
                },
                {
                    text:'Revisar',style:'cancel'
                }
            ]
        )
    }

    //Elimina un producto del arreglo de pedido 
    const confirmarEliminacion = id => {
        Alert.alert(
            '¿Deseas Eliminar este Artículo?',
            'Una vez que eliminaado no se puede recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress:() => {                                                
                        eliminarProducto(id);
                        //calcular
                    }
                },
                {
                    text:'Cancelar',style:'cancel'
                }
            ]
        )
    }


    return( 
        <Container style={globalStyle.contenedor}>
            <Content style={globalStyle.contenido}>
                <H1 style = {globalStyle.titulo}></H1>
                {pedido.map((platillo,i) => {
                    const { cantidad, nombre, imagen, id, precio } = platillo
                    return(
                        <List key={id + i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{uri:imagen}} />
                                </Left>
                                <Body>
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad: {cantidad}</Text>
                                    <Text>Precio: ${precio}</Text>

                                    <Button
                                    onPress={() => confirmarEliminacion(id)}
                                        full
                                        danger
                                        style={{marginTop:20}}
                                    >
                                        <Text style={[globalStyle.botonTexto,{color:'#fff'}]}>Eliminar</Text>
                                    </Button>

                                </Body>
                            </ListItem>
                        </List>
                    )
                })}

                <Text style={globalStyle.cantidad}>Total a pagar: ${total}</Text>

                <Button            
                    style={{marginTop:30}}
                    full
                    dark
                    onPress ={()=>navigation.navigate('Menu')} 
                >
                    <Text style={[globalStyle.botonTexto,{color:'#fff'}]}>Seguir Pidiendo</Text>
                </Button>
            </Content>

            <Footer>
                <FooterTab>
                    <Button
                        onPress ={()=>progresoPedido()}                
                        style={[globalStyle.boton,{marginTop:0}]}
                        full
                    >
                        <Text style={globalStyle.botonTexto}>Ordenar Pedido</Text>
                </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}

export default ResumenPedido ;