import React,{ useContext } from 'react';
import {Image} from 'react-native';
import { 
    Container,
    Content,
    Footer,
    FooterTab,
    Button,
    Body,
    Text,
    H1,
    Card,
    CardItem
} from 'native-base';
import { useNavigation} from '@react-navigation/native';
import globalStyle from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

const  DetallePlatillo = () =>{
    
    //Pedido Context
    const { platillo } = useContext(PedidoContext);
    const { nombre, imagen, descripcion, precio } = platillo;
    
    //Redireccionar
    const navigation = useNavigation();

    return( 
        <Container style={globalStyle.contenedor}>
            <Content style={globalStyle.contenido}>
                <H1 style={globalStyle.titulo}>{nombre}</H1>

                <Card>
                    <CardItem>
                        <Body>
                            <Image 
                                style={globalStyle.imagen}
                                source={{uri:imagen}}
                            />
                            <Text style={{marginTop:20}} >{descripcion}</Text>
                            <Text style={globalStyle.cantidad}>Precio: {precio}</Text>
                        </Body>
                    </CardItem>
                </Card>

            </Content>
            <Footer>
                <FooterTab>
                    <Button 
                        style={globalStyle.boton}
                        onPress={()=> navigation.navigate('FormularioPlatillo')}
                    >
                        <Text style={globalStyle.botonTexto}>Ordenar Platillo</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
        
    );
}

export default DetallePlatillo ;