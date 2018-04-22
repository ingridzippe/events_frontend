import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Linking,
  Platform,
  Image,
} from 'react-native';
import SafariView from 'react-native-safari-view';
import styles from '../styles/styles';
import TopBarNav from '../components/TopBarNav';
import Background from '../components/Background';
import MapView from 'react-native-maps';
// import { StackNavigator } from 'react-navigation';
// import { ImagePicker, Location, Permissions, MapView } from 'expo';

// const domain = 'https://something-horizons.herokuapp.com';
// const domain = 'https://localhost:3000'//"https://still-citadel-74266.herokuapp.com";
// const domain = process.env.BACKEND;
// localhost
// postgres SQL
const domain = 'https://whispering-savannah-32809.herokuapp.com';


class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      username: '',
      password: '',
      latitude: 0,
      longitude: 0,
    };
  }

  watchID: ?number = null;

  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs

    // locationManager.requestAlwaysAuthorization();
    navigator.geolocation.requestAuthorization();
    // Geolocation.requestAuthorization();
    //
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     this.setState({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       error: null,
    //     });
    //   },
    //   (error) => this.setState({ error: error.message }),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );

    navigator.geolocation.getCurrentPosition((position) => {
          var lat = parseFloat(position.coords.latitude);
          var lon = parseFloat(position.coords.longitude);
          // const initialPosition = JSON.stringify(position);
          // this.setState({ initialPosition });
          console.log("lat");
          console.log(lat);
          console.log("lon");
          console.log(lon);
       },
       (error) => alert(error.message),
       { timeout: 20000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
       const lastPosition = JSON.stringify(position);
       this.setState({ lastPosition });
    });

    console.log(this.state.latitude);
    console.log(this.state.longitude);

    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('URL', url);
        this.handleOpenURL({ url });
      }
    });
  }
  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
    if (this.state.user) {
      this.props.navigation.navigate('Messages');
    }
  }
  loginWithFacebook = () => this.openURL(`${domain}/fb/login`);
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    } // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };
  postLogin() {
    console.log('signing in');
    // console.log('domain', domain);
    return fetch(`${domain}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        if (responseJson.user) {
          AsyncStorage.setItem('dripuser', responseJson.user.username);
          console.log('R', responseJson)
          console.log('R P', responseJson.password)
          AsyncStorage.setItem('dripuserpassword', responseJson.user.password);
        }
        this.props.navigation.navigate('Messages');
      } else {
        alert('Invalid credentials bruh');
      }
    })
    .catch((err) => {
      /* do something if there was an error with fetching */
      console.log('it errored', err);
    });
  }
  render() {
    return (
      <Background>
        <View style={styles.container}>
          <Image source={require('../assets/drip_logo.png')}
          style={{margin: 26, width: 75, height: 40}}/>
          <TextInput
            style={styles.input}
            placeholderTextColor='#fff'
            placeholder='Username'
            onChangeText={(text) => this.setState({ username: text })}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor='#fff'
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonBlue]}
            onPress={() => { this.postLogin(); }} >
            <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.or}>OR</Text>
          {/* <TouchableOpacity style={[styles.button, styles.buttonBlue]}>
            <Text
              style={styles.buttonLabel}
              onPress={() => { this.loginWithFacebook(); }} >
              Log in with Facebook
            </Text>
          </TouchableOpacity> */}
          <Text
            style={styles.or}
            onPress={() => { this.props.navigation.navigate('Register'); }}>
            Don't have an account? Sign up.
          </Text>
        </View>
      </Background>
    );
  }
}

export default LoginScreen;
