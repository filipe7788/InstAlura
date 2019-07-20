import React from 'react';
import { StyleSheet, Dimensions, FlatList } from 'react-native';
import Login from './src/Screens/login'

export default class App extends React.Component {

  constructor(){
    super()
  }

  render() {
    return (
      <Login/> 
    );
  }
}

