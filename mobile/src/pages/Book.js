import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert, AsyncStorage, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {

    const id = navigation.getParam('id');
    
    const [data, setData] = useState('');

    async function handleSubmit() {

        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date: data
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={ styles.container }>
            
            <Text style={ styles.label }>DATA DE INTERESSE *</Text>
            <TextInput 
                style={ styles.input}
                placeholder="Data de interesse"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={data}
                onChangeText={ text => setData(text) }
            />

            <TouchableOpacity onPress={ handleSubmit } style={ styles.button }>
                <Text style={ styles.buttonText }>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ handleCancel } style={ [styles.button, styles.cancelButton] }>
                <Text style={ styles.buttonText }>Cancelar reserva</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        margin: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
})