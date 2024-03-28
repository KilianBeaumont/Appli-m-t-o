import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TextInput, Text } from 'react-native';
import * as Location from 'expo-location';

const WeatherApp = () => {

const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
const [weatherData, setWeatherData] = useState(null);

useEffect(() => {
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        const url = `https://api.open-meteo.com/v1/forecast?`+
            `latitude=${location.coords.latitude}`+
            `&longitude=${location.coords.longitude}`+
            `&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max`+
            `&timezone=auto`+
            `&current_weather=true`;

        fetch(url)
            .then(response => response.json())
            .then(data => setWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    })();
}, []);

    const getBackgroundImage = () => {
        return require('../assets/background.png');
    }

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }
    
    return (
        <>
            <ImageBackground source={getBackgroundImage()} style={styles.background}>
                <View style={styles.container}>
                    <Text style={styles.temperature}>{weatherData.daily.temperature_2m_max[0]}°</Text>
                    <Text style={styles.city}>Ville</Text>
                    <Text style={styles.time}>{getCurrentTime()}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Chercher ville"
                        placeholderTextColor="black"
                    />
                </View>
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    background: {
        height: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      city: {
        position: 'absolute',
        top: 30,
        left: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      time: {
          position: 'absolute',
          top: 30,
          right: 20,
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
      },
      temperature: {
          position: 'absolute',
          top: 150,
          left: 30,
          fontSize: 100,
          fontWeight: 'bold',
          color: 'white',
      }
});

export default WeatherApp;
