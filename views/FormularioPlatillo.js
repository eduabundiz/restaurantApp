import React,{useState, useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import { 
    Container,
    Content,
    Form,
    Icon,
    Input,
    Grid,
    Text,
    Col,
    Button,
    Footer,
    FooterTab
    
} from 'native-base';
import { useNavigation} from '@react-navigation/native';
import globalStyle from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

const  FormularioPlatillo = () =>{

    //State para cantidades
    const [ cantidad, guardarCantidad]  = useState(1);
    const [total, guardarTotal] = useState(0);

    //Calcular el total del platillo por su cantidad
    const calcularTotal = () =>{
        const totalPagar = precio * cantidad;
        guardarTotal(totalPagar)
    }

    //context
    const { platillo, guardarPedido } = useContext(PedidoContext);
    const {precio} = platillo

    //Redireccionar al usuario
    const navigation = useNavigation();

    //En cuanto el componente carga, calcular la cantidad a pagar
    useEffect(()=>{
        calcularTotal(total);
    },[cantidad])
    
    //Decrementar en uno la cantidad
    const decrementarUno = () => {
        if( cantidad > 1){
            const nuevaCantidad = parseInt(cantidad) -1
            guardarCantidad(nuevaCantidad)
        }
    }

    //Incrementar en uno la cantidad
    const incrementarUno = () => {
        const nuevaCantidad = parseInt(cantidad) +1
        guardarCantidad(nuevaCantidad)
    }

    //Confirma si la orden es correcta
    const confirmarOrden = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            'Un pedido confirmado ya no se podrá modificar',
            [
                {
                    text:'Confirmar',
                    onPress: () =>{
                        //Almacenar el pedido Principal
                        const pedido = {
                            ...platillo,
                            cantidad,
                            total
                        }                        
                        guardarPedido(pedido)
                        //Navegar hacia el resumen
                        navigation.navigate('ResumenPedido')
                    },
                },
                {
                    text: 'Cancelar',
                    style:'cancel'
                }
            ]
        )
    }

    return( 
        <Container>
            <Content>
                <Form>
                    <Text style={globalStyle.titulo}>Cantidad</Text>
                    <Grid>
                        <Col>
                            <Button
                                props
                                dark
                                style={{height:80,justifyContent:'center'}}
                                onPress={ () => decrementarUno()}
                            >
                                <Icon style={{fontSize:40}} name="remove" />
                            </Button>
                        </Col>

                        <Col>
                            <Input 
                                style={{textAlign:'center',fontSize:20}}
                                value={cantidad.toString()}
                                keyboardType='numeric'
                                onChangeText={ cantidad => guardarCantidad(cantidad)}
                            />
                        </Col>

                        <Col>
                            <Button
                                props
                                dark
                                style={{height:80,justifyContent:'center'}}
                                onPress={ () => incrementarUno()}
                            >
                                <Icon style={{fontSize:40}} name="add" />
                            </Button>                         
                        </Col>
                    </Grid>

                    <Text style={globalStyle.cantidad}>Subtotal: ${total}</Text>
                </Form>
            </Content>

            <Footer>
                <FooterTab>
                    <Button 
                        style={globalStyle.boton}                        
                        onPress={()=> confirmarOrden()}
                    >
                        <Text style={globalStyle.botonTexto}>Agregar al pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}

export default FormularioPlatillo ;