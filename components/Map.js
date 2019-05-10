import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { MapView } from 'expo'

const Marker = MapView.Marker

class Map extends React.Component {
    renderMarkers() {
        return this.props.places.map((place, i) => (
            <Marker key={i} title={place.name} coordinate={place.coords} />
        ))
    }

    render() {
        return (
            <MapView 
                style={styles.container}
                region={this.props.region}
                showsUserLocation
                showsMyLocationButton
            >
            {this.renderMarkers()}
            </MapView>
        )
    }
}

const styles = {
    container: {
        width: '100%',
        height: '80%'
    }
}

export default Map