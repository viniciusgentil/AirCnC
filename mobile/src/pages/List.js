import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, AsyncStorage, Image, StyleSheet, TouchableHighlight, Alert } from 'react-native';

import SpotList from '../components/SpotList';

import Logo from '../assets/logo.png';

export default function List({ navigation }) {

    const [techs, setTechs] = useState([]);

    useEffect( () => {
        AsyncStorage.getItem('user').then( user_id => {
            const socket = socketio('http://192.168.15.13:3333', {
                query: { user_id }
            });
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA' }`);
            })
        });
    }, []);

    useEffect( () => {

        AsyncStorage.getItem('techs').then( storageTechs => {
            const techsArray = storageTechs.split(',').map( tech => tech.trim() );

            setTechs(techsArray);
        })
    }, [])

    function handleLogout() {
        AsyncStorage.setItem('user', '');
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={ styles.container }>
            <TouchableHighlight onPress={ handleLogout }>
                <Image source={ Logo } style={ styles.logo } />
            </TouchableHighlight>

            <ScrollView>
                {techs.map( tech => <SpotList key={tech} tech={tech} /> )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 40
    }
})