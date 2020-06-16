import React,{ useContext, useEffect, Fragment } from 'react';
import {StyleSheet,View} from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext';
import {
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,    
    Body
    
} from 'native-base'
import globalStyles from '../styles/global';

const  Menu = () =>{

    //Context de Firebase
    const { menu, obtenerProductos } = useContext(FirebaseContext);

    useEffect(()=>{
        obtenerProductos();
        console.log(menu)
    },[]);

    return( 
        <Container style={globalStyles.contenedor}>
            <Content style={{backgroundColor:'#fff'}}>
                <List>
                    {menu.map(platillo=>{
                        console.log(platillo)
                        const {imagen, nombre, precio, descripcion, categoria, id } =platillo;
                        return(
                            <Fragment key={id}>
                                <ListItem
                                    
                                >
                                    <Thumbnail 
                                        large
                                        square
                                        source={{uri:imagen}}
                                    />
                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text
                                            note 
                                            numberOfLines={2}
                                        >{descripcion}</Text>

                                        <Text>Precio: $ {precio}</Text>
                                    </Body>

                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>
            </Content>
        </Container>
    );
}

export default Menu ;