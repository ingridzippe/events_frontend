import React, { Component } from 'react';
import {
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
import TopBar from '../components/TopBar';
import Background from '../components/Background';
// import { StackNavigator } from 'react-navigation';
// import { ImagePicker, Location, Permissions, MapView } from 'expo';

// const domain = 'https://something-horizons.herokuapp.com';
// const domain = 'https://localhost:3000'//"https://still-citadel-74266.herokuapp.com";
const domain = process.env.BACKEND;

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
      password: ''
    };
  }
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
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
  loginWithFacebook = () => this.openURL(`http://localhost:3000/fb/login`);
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
    return fetch(`http://localhost:3000/login`, {
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
          AsyncStorage.setItem('dripuser', JSON.stringify(responseJson.user));
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
          <TouchableOpacity style={[styles.button, styles.buttonBlue]}>
            <Text
              style={styles.buttonLabel}
              onPress={() => { this.loginWithFacebook(); }} >
              Log in with Facebook
            </Text>
          </TouchableOpacity>
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
