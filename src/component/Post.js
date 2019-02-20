import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import  InputComentario  from './InputComentario'
import Likes from "./Likes";


const width = Dimensions.get('screen').width

export default class Post extends React.Component {

  constructor(props){
    super(props)
   
  }

  
  exibeLegenda(foto){
    if(foto.comentario === ''){
      return
    }

    return(       
      <View style={estilos.comentario}>
        <Text style={estilos.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
      </View>
    ) 
  }

  adicionaComentario(valorComentario, inputComentario){
    if(valorComentario === '')
      return;

    const  novaLista = [...this.state.foto.comentarios, {
      id: valorComentario,
      login: 'meuUsuario',
      texto: valorComentario
    }]

    const fotoAtualizada = {
      ...this.state.foto,
     ...this.state.foto.comentarios = novaLista
    }
    this.setState({foto: fotoAtualizada})
    inputComentario.clear()
  }

  render() {
    const { likeCallBack, foto } = this.props
    return (
        <View key={foto.id}>
            <View  style={ { margin: 10, flexDirection: 'row', alignItems: 'center' } }>
                <Image source={{uri: foto.urlPerfil}} style={ estilos.imagemPerfil }/>
                <Text>{foto.loginUsuario}</Text>
            </View> 

            <Image source={{uri: foto.urlFoto}} style={estilos.postimage}/>

            <View style={estilos.rodape}>
           
            <Likes foto={foto} likeCallBack={likeCallBack}/>

              { this.exibeLegenda(foto) }
       
              {foto.comentarios.map(comentario => 
                <View key={comentario.id} style={estilos.comentario}>
                  <Text style={estilos.tituloComentario}>{comentario.login}</Text>
                  <Text>{comentario.texto}</Text>
                </View>
            )}

              <InputComentario comentarioCallBack={this.adicionaComentario.bind(this)}></InputComentario>

            </View>
        </View>
        )
    }
}

const estilos = StyleSheet.create({
    container: {
      marginTop: 50
    },
    imagemPerfil: {
      width: 40, 
      height: 40 , 
      marginRight: 10, 
      borderRadius: 20
    },
    postimage: {
      width: width, 
      height: width
    },
    botaoLike: {
      height: 40,
      width: 40
    },
    rodape: {
      margin: 10
    },
    like: {
      fontWeight: 'bold'
    },
    comentario: {
      flexDirection: 'row'
    },
    tituloComentario: {
      fontWeight: 'bold',
      marginRight: 5
    }
})
