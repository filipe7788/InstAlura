import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width

export default class Likes extends React.Component {

    constructor(){
        super()
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

    render(){
        const{ foto, likeCallBack } = this.props;
        return(
            <View>
                <TouchableOpacity onPress={() => {likeCallBack(foto)}}>
                    <Image style={estilos.botaoLike} source={ this.carregaIcon(foto.likeada) }/>
                </TouchableOpacity>
                { this.curtidas(foto.likers) }
            </View>
        )
    }
}


const estilos = StyleSheet.create({
    botaoLike: {
      height: 40,
      width: 40
    },
    like: {
      fontWeight: 'bold'
    },
 
})
