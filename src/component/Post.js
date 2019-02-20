import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';

const width = Dimensions.get('screen').width

export default class Post extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      foto: this.props.foto,
      valorComentario: ''
    }
  }

  like(){
    const { foto } = this.state

    let novaLista = []

    if(!foto.likeada){
      novaLista = [
        ...foto.likers,
        {login: 'meuUsuario'}
      ]
    } else {
      novaLista = foto.likers.filter(liker => {
        return liker.login !== 'meuUsuario'
      })
    }
 
    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
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

  adicionaComentario(){
    if(this.state.valorComentario === '')
      return;

    const  novaLista = [...this.state.foto.comentarios, {
      id: this.state.valorComentario,
      login: 'meuUsuario',
      texto: this.state.valorComentario
    }]

    const fotoAtualizada = {
      ...this.state.foto,
     ...this.state.foto.comentarios = novaLista
    }
    this.setState({foto: fotoAtualizada, valorComentario: ''})
    this.InputComentario.clear()
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
       
              {foto.comentarios.map(comentario => 
                <View key={comentario.id} style={estilos.comentario}>
                  <Text style={estilos.tituloComentario}>{comentario.login}</Text>
                  <Text>{comentario.texto}</Text>
                </View>
            )}

              <View style={estilos.novoComentario}>
                <TextInput style={estilos.input} placeholder='Adicione um comentário...' onChangeText={texto => this.setState({valorComentario: texto})} ref={input => this.InputComentario = input}></TextInput>
                
                <TouchableOpacity onPress={this.adicionaComentario.bind(this)}>
                <Image style={estilos.imagem} source={require('../../assets/send.png')}></Image>
                </TouchableOpacity>

              </View>
        

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
    },
    input:{
      height: 40,
      flex: 1
    }, 
    imagem: {
      width: 30,
      height: 30
    },
     novoComentario:{
       flexDirection: 'row',
       alignItems: 'center',
       borderBottomWidth: 1,
       borderBottomColor: '#ddd'
     }
})
