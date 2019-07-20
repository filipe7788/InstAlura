import React from 'react';
import { View,
         Dimensions,
         TextInput,
         StyleSheet, 
         Text, 
         AsyncStorage,
         Button } from 'react-native';

const width = Dimensions.get('screen').width

export default class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            usuario: '',
            senha: '', 
            mensagem: ''
        }
    }

    efetuaLogin(){
        const url = 'https://instalura-api.herokuapp.com/api/public/login' 

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario, 
                senha: this.state.senha
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }

        fetch(url, requestInfo).then(response => {
            if (response.ok) 
                return response.text();
            
            throw new Error("Não Foi Possível Efetuar o login.");
        })
        .then(token => {
            AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('usuario', this.state.usuario)
        })
        .catch(e => this.setState({mensagem: e.message}))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>InstaLura</Text>
                <View style={styles.formulario}>
                    <TextInput style={styles.input} placeholder="Usuário"
                    onChangeText = {text => this.setState({ usuario: text })}/>
                    <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true}
                    onChangeText = {text => this.setState({ senha: text })}/>
                </View>
                <Text style={styles.error}>{this.state.mensagem}</Text>
                <Button title="Login" on onPress={this.efetuaLogin.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formulario: {
        width: width * 0.8
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 26
    },
    error: {
        marginTop: '10',
        color: '#e74c3c'
    }
})