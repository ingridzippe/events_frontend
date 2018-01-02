import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  ListView,
} from 'react-native';
import BottomBarNav from '../components/BottomBarNav';
import TopBarNav from '../components/TopBarNav';
import Background from '../components/Background';
import MapView from 'react-native-maps';
import styles from '../styles/styles';

// const domain = "https://still-citadel-74266.herokuapp.com";
const domain = process.env.BACKEND;

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
        // latitude: 37.771620,
        // longitude: -122.409568,
        latitude: 0,
        longitude: 0,
        error: null,
        // dataSource: ds.cloneWithRows([]),
        usersarr: [],
    };
    this.postUserLocation = this.postUserLocation.bind(this);
  }
  componentWillMount() {
    // setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        console.log('lat', this.state.latitude)
        console.log('long', this.state.longitude)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    fetch(`http://localhost:3000/peoplelist`)
    .then((res) => { return res.json(); })
    .then((resj) => {
        if (resj.success === true) {
            console.log('users', resj.people)
            this.setState({usersarr: resj.people})
         } else { console.log('no users') }
    })
    .catch((err) => { console.log(err); });

    // this.postUserLocation();
  }


  postUserLocation() {

    navigator.geolocation.getCurrentPosition(
      (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        console.log('lat', this.state.latitude)
        console.log('long', this.state.longitude)


        return fetch(`http://localhost:3000/recordlatandlong`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                latitude: this.state.latitude,
                longitude: this.state.longitude,
            })
          })
          .then((res) => { res.json(); })
          .then((resj) => {
            if (resj.success === true) {
              console.log('response location', resj);
            } else { console.log('no location') }
          })
          .catch((err) => { console.log('it errored', err); });


      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

  }
  render() {
    return (
        <Background>
        <TopBarNav navigation={this.props.navigation} />
        <View style={styles.container}>
          <MapView
            style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
            initialRegion={{
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0201,
            }}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0201,
            }} >
            {/* <MapView.Marker
              coordinate={{longitude: this.state.longitude, latitude: this.state.latitude }}
              title={'Fay'}
              description={'Fay'}>
              <Image
                source={ require('../assets/drip_logo.png') }
                style={{width: 50, height: 50, borderWidth: 2, borderColor: '#24282a', borderRadius: 25}}
              />
            </MapView.Marker> */}
            { this.state.usersarr.map(user => {
              return <MapView.Marker
                coordinate={{longitude: user.longitude, latitude: user.latitude }}
                title={user.fullname}
                description={user.username}>
                <Image
                  source={ user.image ? { uri: user.image } : require('../assets/drip_logo.png') }
                  style={{width: 50, height: 50, borderWidth: 2, borderColor: '#24282a', borderRadius: 25 }}
                />
              </MapView.Marker>
            }) }
            {/* <MapView.Marker
              coordinate={{longitude: -122.406000, latitude: 37.785000 }}
              title={"test"}
              description={"testingg"}>
              <Image
                source={ require('../assets/drip_logo.png') }
                style={{width: 20, height: 20, borderWidth: 1, borderColor: '#000'}}
              />
            </MapView.Marker> */}
            {/* <ListView
              scrollEnabled={false}
              dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                      <View>
                        { console.log('ROW DATA PEOPLE', rowData)}
                        <MapView.Marker
                          coordinate={{longitude: rowData.longitude, latitude: rowData.latitude }}
                          title={"test"}
                          description={"testingg"}>
                          <Image
                            source={ require('../assets/drip_logo.png') }
                            style={{width: 20, height: 20, borderWidth: 1, borderColor: '#ff4691'}}
                          />
                        </MapView.Marker>
                      </View>
              }
            /> */}
          </MapView>
          <BottomBarNav navigation={this.props.navigation} />
        </View>
        </Background>
    );
  }
}

export default MapScreen;
