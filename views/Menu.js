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

    const mostrarHeading = (categoria,i) =>{

        if(i>0){
            const categoriaAnterior = menu[i-1].categoria;
            if(categoriaAnterior !== categoria){
                return(
                    <Separator style={styles.separador}>
                        <Text style={styles.separadorTexto}>{categoria}</Text>
                    </Separator>
                )
            }
        } else{
            return(
                <Separator style={styles.separador}>
                    <Text style={styles.separadorTexto}>{categoria}</Text>
                </Separator>
            )
        }
        
    }

    return( 
        <Container style={globalStyles.contenedor}>
            <Content style={{backgroundColor:'#fff'}}>
                <List>
                    {menu.map((platillo,i)=>{
                        console.log(platillo)
                        const {imagen, nombre, precio, descripcion, categoria, id } =platillo;
                        return(
                            <Fragment key={id}>
                                {mostrarHeading(categoria,i)}
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

const styles = StyleSheet.create({
    separador:{
        backgroundColor:'#000'
    },
    separadorTexto:{
        color:'#ffda00',
        fontWeight:'bold',
        textTransform:'uppercase',
        fontSize:14
    }
})

export default Menu ;