import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native';

export default class InputComentario extends React.Component {

    constructor(){
        super()
        this.state = {
            valorComentario: ''
        }
    }
    render(){
        return(
            <View style={estilos.container}>
            <TextInput style={estilos.input} placeholder='Adicione um comentário...' 
                    onChangeText={texto => this.setState({valorComentario: texto})} 
                    ref={input => this.inputComentario = input}></TextInput>
                    <TouchableOpacity onPress={() => {
                        this.props.comentarioCallBack(this.props.idFoto,
                            this.state.valorComentario, this.inputComentario)
                        this.setState({valorComentario:''})
                        }}>
                          <Image style={estilos.imagem}
                              source={require('../../assets/send.png')} />
            </TouchableOpacity>
        
        </View>
        )
    }
}


const estilos = StyleSheet.create({
    input:{
      height: 40,
      flex: 1
    }, 
    imagem: {
      width: 30,
      height: 30
    },
    container:{
       flexDirection: 'row',
       alignItems: 'center',
       borderBottomWidth: 1,
       borderBottomColor: '#ddd'
     }
})
