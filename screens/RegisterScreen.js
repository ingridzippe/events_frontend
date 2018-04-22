import React, { Component } from 'react';
import {
  Image,
  Linking,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  AsyncStorage,
  ImagePickerIOS,
} from 'react-native';
// import BottomBar from '../components/BottomBar'
import Background from '../components/Background';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChooseImage from '../components/ChooseImage';
import SafariView from 'react-native-safari-view';
import styles from '../styles/styles';
import { connect } from 'react-redux';

import { RNS3 } from 'react-native-aws3';

// import { ImagePicker, Location, Permissions, MapView } from 'expo';

// const domain = 'https://something-horizons.herokuapp.com';
// const domain = "https://still-citadel-74266.herokuapp.com";
// const domain = process.env.BACKEND;

// localhost
// const domain = 'http://localhost:3000';
// postgres sql
const domain = 'https://whispering-savannah-32809.herokuapp.com';


class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      email: '',
      fullname: '',
      username: '',
      password: '',
      displayImage: null,
    };
    this.getSignedRequest = this.getSignedRequest.bind(this);
  }
  // Set up Linking
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
  // Handle Login with Facebook button tap
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
    console.log('signup clicked');
    // return fetch(`${domain}/register`, {
    return fetch(`${domain}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          fullname: this.state.fullname,
          username: this.state.username,
          password: this.state.password,
          image: '../assets/generic.jpg',
        })
      })
      .then((response) => {
        console.log('RESPONSE', response);
        this.props.navigation.navigate('Login');
        response.json();
      })
      .then((responseJson) => {
        /* do something with responseJson and go back to the Login view but
         * make sure to check for responseJson.success! */
        console.log('responseJson', responseJson);
        if (responseJson.success === true) {
          this.props.navigation.navigate('Login');
        } else {
          alert('invalid');
        }
      })
      .catch((err) => {
        /* do something if there was an error with fetching */
        console.log('it errored', err);
      });
  }
  // fb() {
  //   fetch('http://localhost:3000/golden')
  //     .then(function (response) {
  //       if (response.status !== 200) {
  //         console.log('Looks like there was a problem. Status Code: ' + response.status);
  //           return;
  //       }
  //       // Examine the text in the response
  //       response.json().then(function (data) {
  //         console.log(data);
  //       });
  //     })
  //     .catch(function (err) {
  //       console.log('Fetch Error :-S', err);
  //     });
  // }
  fb() {
    fetch(`${domain}/fb/login`)
      .then((response) => console.log(response))
    // .then((response) => { return response.json() } )
    // .then((response) => {
    //   console.log('RESPONSE', response)
    //   if (response) {
    //     console.log('responseJson', response);
    //   } else { alert('not response.success'); }
    // })
    // .catch((err) => {
    //   console.log(err);
    //   console.log('it errored MMMMM');
    // })
  }
  getSignedRequest(uri){
    // give it a unique file name
    var fileName;
    const storedUser = AsyncStorage.getItem('dripuser');
    if (storedUser !== null){
      var now = new Date();
      fileName = `user${storedUser}date${now}`
    }
    const file = {
        uri: uri,
        name: fileName,
        type: "image/png"
    }
    const options = {
      keyPrefix: "uploads/",
      bucket: "ingridzippe-events",
      region: "us-east-1",
      accessKey: "AKIAJF47MJIHMZNLEMUA",
      secretKey: "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",
      successActionStatus: 201
    }
    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      console.log("RESPONSE.BODY.POSTRESP.LOC", response.body.postResponse.location);
      this.setState({ eventImage: response.body.postResponse.location });
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
    });
  }
  pickImage() {
    // openSelectDialog(config, successCallback, errorCallback);
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      console.log('imageUri', imageUri);
      this.getSignedRequest(imageUri);
      this.setState({ displayImage: imageUri });

        // const request = new XMLHttpRequest();
        //
        // request.onload = () => {
        //   if (request.status < 400) { console.log('success') }
        //   else { const error = new Error(request.response); }
        // };
        //
        // request.onerror = (error) => { console.log('error') };
        //
        // request.open('POST', `${domain}/create`);
        // request.setRequestHeader('content-type', 'application/json');
        // console.log('hmjj', request.send({ uri: this.state.image }));

    }, error => console.error(error));
  }
  render() {
    const { user } = this.state;
    return (
      <Background>
      <ScrollView style={styles.container, {paddingTop: 130, paddingBottom: 100}}>
        {/* <TouchableOpacity
          style={[styles.button, styles.buttonBlue]}
        >
          <Text
            style={styles.buttonLabel}
            onPress={() => { this.loginWithFacebook(); }}>
            Log in with Facebook
          </Text>
        </TouchableOpacity> */}
        {/* <Text style={styles.or}>OR</Text> */}
        {/* <Text>Email: {this.props.email}</Text> */}
        {this.state.displayImage ?
          <TouchableOpacity onPress={() => { this.pickImage(); }}>
            <Image
              style={{ alignSelf: 'center', height: 130, width: 130, borderRadius: 65, marginBottom: 24, marginTop: -53 }}
              source={{ uri: this.state.displayImage }} /></TouchableOpacity> :
          <TouchableOpacity
            style={[styles.button, styles.buttonBlue, {marginTop: -52, marginBottom: 30}]}
            onPress={() => { this.pickImage(); }} >
            <Text style={styles.buttonLabel}>Choose A Profile Picture</Text>
          </TouchableOpacity> }
        <TextInput
          style={styles.input}
          placeholderTextColor='#fff'
          placeholder='Email'
          // onChangeText={(text) => this.props.updateEmail(text)}
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='#fff'
          placeholder='Full Name'
          onChangeText={(text) => this.setState({ fullname: text })}
        />
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
          onPress={() => { this.postLogin(); }}
        >
          <Text style={styles.buttonLabel}>Sign up</Text>
        </TouchableOpacity>
      </ScrollView>
      </Background>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     usercount: state,
//     email: state.email
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     incrementUserCount: () => {
//       dispatch(addTodo(id, task));
//     },
//     updateEmail: (text) => {
//       dispatch({type: 'UPDATE_EMAIL', text: text})
//     }
//   }
// }

// RegisterScreen = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)

export default RegisterScreen;
