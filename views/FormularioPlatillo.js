import React,{useState} from 'react';
import {StyleSheet,View} from 'react-native';
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
    
} from 'native-base';
import { useNavigation} from '@react-navigation/native';
import globalStyle from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

const  FormularioPlatillo = () =>{

    //State para cantidades
    const [ cantidad, guardarCantidad]  = useState(1);
    
    //Decrementar en uno la cantidad
    const decrementarUno = () =>{
        if( cantidad > 1){
            const nuevaCantidad = parseInt(cantidad) -1
            guardarCantidad(nuevaCantidad)
        }
    }

    //Incrementar en uno la cantidad
    const incrementarUno = () =>{
        const nuevaCantidad = parseInt(cantidad) +1
        guardarCantidad(nuevaCantidad)
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
                </Form>
            </Content>
        </Container>
    );
}

export default FormularioPlatillo ;