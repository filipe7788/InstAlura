import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList } from 'react-native';
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
  
  render() {
    return (
      <FlatList 
        style={estilos.container}
        keyExtractor={item => item.id}
        data= {this.state.fotos}
        renderItem= { ({item}) =>
          <Post foto={ item }/>
        }
      />
    );
  }
}

const estilos = StyleSheet.create({
    container: {
      marginTop: 50
    }
})
