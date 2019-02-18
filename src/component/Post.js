import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';

const width = Dimensions.get('screen').width

export default class Post extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      foto: {...this.props.foto, likers:[{}]}
    }
  }

  like(){
    const fotoAtualizada = {
      ...this.state.foto,
      likeada: !this.state.foto.likeada
    }

    this.setState({ foto: fotoAtualizada })
  }

  carregaIcon(likeada){
      return likeada ? require('../../assets/s2-checked.png') : require('../../assets/s2.png') 
  }

  curtidas(likers){
    if(likers.length <= 0)
      return;

    return  (
      <Text style={estilos.like}>
      {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
    </Text> 
    )
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

  render() {
    const { foto } = this.state;
    return (
        <View key={foto.id}>
            <View  style={ { margin: 10, flexDirection: 'row', alignItems: 'center' } }>
                <Image source={{uri: foto.urlPerfil}} style={ estilos.imagemPerfil }/>
                <Text>{foto.loginUsuario}</Text>
            </View> 

            <Image source={{uri: foto.urlFoto}} style={estilos.postimage}/>

            <View style={estilos.rodape}>
              <TouchableOpacity onPress={this.like.bind(this)}>
                  <Image style={estilos.botaoLike} source={ this.carregaIcon(foto.likeada) }/>
              </TouchableOpacity>
              { this.curtidas(foto.likers) }

              { this.exibeLegenda(foto) }
       
              
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
