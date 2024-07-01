import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { fetchWeatherData } from './api/weather'; // Adjust path as per your file structure

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'London', // Default city
      weatherData: null,
      initialRegion: {
        latitude: 51.5074, // Default latitude for London
        longitude: -0.1278, // Default longitude for London
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
      searchCity: '', // State to store the city being searched
    };
  }

  componentDidMount() {
    this.fetchWeatherDataForCity(this.state.city);
  }

  fetchWeatherDataForCity = async (city) => {
    try {
      const weatherData = await fetchWeatherData(city);
      const { coord } = weatherData;
      if (coord) {
        const { lat, lon } = coord;
        this.setState({
          weatherData,
          initialRegion: {
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          },
        });
      } else {
        console.error('Unable to fetch coordinates from weather data');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  handleSearch = async () => {
    Keyboard.dismiss(); // Dismiss keyboard on search
    const { searchCity } = this.state;
    if (searchCity) {
      await this.fetchWeatherDataForCity(searchCity);
      this.setState({ searchCity: '' }); // Clear input after search
    }
  }

  render() {
    const { weatherData, initialRegion, searchCity } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
        >
          {weatherData && (
            <Marker
              coordinate={{
                latitude: initialRegion.latitude,
                longitude: initialRegion.longitude,
              }}
              title={weatherData.name}
              description={`Temperature: ${weatherData.main.temp}°C`}
              pinColor={weatherData.weather[0].main === 'Clouds' ? 'blue' : 'red'}
            />
          )}
        </MapView>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={searchCity}
            onChangeText={(text) => this.setState({ searchCity: text })}
            onSubmitEditing={this.handleSearch} // Handle search on submit
          />
          <Button
            title="Search"
            onPress={this.handleSearch}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    width: '100%',
  },
  input: {
    height: 40,
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});
