import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Location, Permissions } from 'expo'
import API from './API'
import Map from './components/Map'

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class App extends React.Component {

  state = {
    region: null,
    courts: []
  }

  componentWillMount() {
    this.getLocationAsync();
  }

  getCourts = async () => {
    const { latitude, longitude } = this.state.region;
    const userLocation = { latitude, longitude };
    const courts = await API.getCourts(userLocation);
    this.setState({ courts });
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied;'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region })
    await this.getCourts();
  }

  onMoveMap = region => {
    this.setState({ region })
    let query = {
      lat: region.latitude,
      lng: region.longitude
    }
    this.getCourts()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Map
          region={this.state.region}
          places={this.state.courts}
          moveMap={this.onMoveMap}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
