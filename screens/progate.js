import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude,
          longitude,
          current_weather: true
        }
      });

      if (response.data && response.data.current_weather) {
        const temp = response.data.current_weather.temperature;
        setTemperature(temp);
      } else {
        setError('Failed to retrieve temperature data');
      }

    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching the weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCoordinates = async () => {
    setLoading(true);
    setError(null);
    setTemperature(null);

    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: city,
          key: '9ab29c4c56e84d4ea861917a80cd9403'
        }
      });

      if (response.data && response.data.results && response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        fetchWeather(lat, lng);
      } else {
        setError('Failed to retrieve coordinates for the specified city');
        setLoading(false);
      }

    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching the coordinates');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Seacrh" onPress={fetchCoordinates} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.text}>{error}</Text>
      ) : (
        temperature !== null && <Text style={styles.text}>Temperature: {temperature}°C</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default App;
