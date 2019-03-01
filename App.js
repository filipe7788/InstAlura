import React from 'react';
import { StyleSheet, Image, Dimensions, FlatList, Platform } from 'react-native';
import Post from './src/component/Post'

const width = Dimensions.get('screen').width

export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
        fotos: []
    }
  }

  componentDidMount(){
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(resposta => resposta.json())
      .then(json => this.setState({fotos: json}))

  }

  adicionaComentario(idFoto, valorComentario, inputComentario){
    if(valorComentario === '')
      return;

    const foto = this.state.fotos.find(foto => foto.id === idFoto)

    const  novaLista = [...foto.comentarios, {
      id: valorComentario,
      login: 'meuUsuario',
      texto: valorComentario
    }]

    const fotoAtualizada = {
      ...foto,
     ...foto.comentarios = novaLista
    }

    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({fotos})
    inputComentario.clear()
  }

  like(idFoto){
    const  foto  = this.state.fotos.find(foto => foto.id === idFoto.id)

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

    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({ fotos })
  }

  
  render() {
    return (
      <FlatList 
        style={estilos.container}
        keyExtractor={item => item.id}
        data= {this.state.fotos}
        renderItem= { ({item}) =>
          <Post likeCallBack={this.like.bind(this)} comentarioCallBack={this.adicionaComentario.bind(this)} foto={ item }/>
        }
      />
    );
  }
}

const margin = Platform.OS == 'ios' ? 50 : 20;

const estilos = StyleSheet.create({
    container: {
      marginTop: margin
    }
})
