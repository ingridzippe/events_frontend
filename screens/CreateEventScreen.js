import React from 'react';
import {
  AsyncStorage,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ImagePickerIOS,
  Image,
  Button,
  ScrollView,
  // DatePickerIOS,
} from 'react-native';
import BottomBarNav from '../components/BottomBarNav';
import TopBarNav from '../components/TopBarNav';
import Background from '../components/Background';
import DatePicker from '../components/DatePicker';
// import ImagePicker from 'react-native-image-crop-picker';
import styles from '../styles/styles';

// const domain = "https://something-horizons.herokuapp.com";
// const domain = 'https://still-citadel-74266.herokuapp.com';
// const domain = process.env.BACKEND;
import { RNS3 } from 'react-native-aws3';
// import { StackNavigator } from 'react-navigation';
// import { ImagePicker, Location, Permissions, MapView } from 'expo';
// const domain = 'https://something-horizons.herokuapp.com';
// localhost

// postgres SQL
const domain = 'https://whispering-savannah-32809.herokuapp.com';


// var ImagePicker = require('react-native-image-crop-picker');

// DATE PICKER CODE STARTS HERE

// DATE PICKER CODE ENDS HERE

var defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
};

class CreateEventScreen extends React.Component {
  static navigationOptions = {
    title: 'Drip',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
        user: '',
        displayName: '',
        eventImage: '',
        eventDate: '',
        eventLocation: '',
        eventDescription: '',
        date: this.props.date,
        timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
        modalVisible: false,
        displayImage: null,
    };
    this.getSignedRequest = this.getSignedRequest.bind(this);
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
  setModalVisible(visible) {
    this.setState({modalVisible: true});
  }
  closeModal(visible) {
    this.setState({modalVisible: false});
  }
  postCreateEvent() {
  fetch(`${domain}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          eventimage: this.state.eventImage,
          eventdate: this.state.eventDate,
          eventlocation: this.state.eventLocation,
          eventdescription: this.state.eventDescription
      })
    })
    .then((response) => {
        console.log('RESPONSE', response);
        return response.json();
        // console.log('RESPONSE.JSON', response.json());

    })
    .then((responseJson) => {
      /* do something with responseJson and go back to the Login view but
       * make sure to check for responseJson.success! */
      console.log('responseJson', responseJson);
      if (responseJson.success === true) {
        console.log('RESPONSE EVENT');
      } else {
        console.log('event did not save')
      }
      console.log(responseJson);
    })
    .catch((err) => {
      /* do something if there was an error with fetching */
      console.log('it errored', err);
    });
  }
  uploadImage() {
    //   ImagePicker.openCamera({
    //     width: 300,
    //     height: 400,
    //     cropping: true
    //   }).then(image => {
    //     console.log(image);
    //   });
  }
  onDateChange() {
    this.setState({ date: this.state.date });
  }
  render() {
    return (
        <Background>
        <TopBarNav navigation={this.props.navigation} />
        <ScrollView contentContainerStyle={styles.container, {paddingTop: 130, paddingBottom: 100}}>
          {/* <Text style={styles.textBig}>Create an event.</Text> */}
          {/* <TouchableOpacity
            style={[styles.button, styles.buttonBlue]}
            onPress={() => { this.uploadImage(); }}
          >
            <Text style={styles.buttonLabel}>Upload an Image</Text>
          </TouchableOpacity> */}
          {/* <DatePickerIOS
            date={this.state.date}
            mode="time"
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange.bind(this)}
            minuteInterval={10}
          /> */}

          <Modal
            transparent={false}
            visible={this.state.modalVisible}
          >
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
              <View style={{justifyContent: 'center', width: 300, height: 600}}>
                <DatePicker
                  events={this.props.events}
                />
                <Button
                    title={'Yup'}
                    text={'Set Time'}
                    onPress={this.closeModal.bind(this, false)}
                />

              </View>
            </View>
          </Modal>
          {/* <TouchableOpacity onPress={() => {
            this.setModalVisible(true)
          }}>
            <Text style={{ fontSize: 23 }}>Pick a time</Text>
          </TouchableOpacity> */}

          {this.state.displayImage ?
            <TouchableOpacity onPress={() => { this.pickImage(); }}>
              <Image
                style={{ alignSelf: 'stretch', height: 100, marginBottom: 24, marginTop: -53 }}
                source={{ uri: this.state.displayImage }} /></TouchableOpacity> :
            <TouchableOpacity
              style={[styles.button, styles.buttonBlue, {marginTop: -52, marginBottom: 30}]}
              onPress={() => { this.pickImage(); }} >
              <Text style={styles.buttonLabel}>Pick Image</Text>
            </TouchableOpacity> }
          <TextInput
            style={styles.input}
            placeholderTextColor='#fff'
            placeholder='Date, eg. 11-11-17'
            onChangeText={(text) => this.setState({ eventDate: text })}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor='#fff'
            placeholder='Place'
            onChangeText={(text) => this.setState({ eventLocation: text })}
          />
            <TextInput
              style={styles.input}
              placeholderTextColor='#fff'
              placeholder='What else?'
              onChangeText={(text) => this.setState({ eventDescription: text })}
            />
          <TouchableOpacity
            style={[styles.button, styles.buttonBlue]}
            onPress={() => { this.postCreateEvent(); }}
          >
            <Text style={styles.buttonLabel}>Post</Text>
          </TouchableOpacity>
        </ScrollView>
        <BottomBarNav navigation={this.props.navigation} />
        </Background>
    );
  }
}

export default CreateEventScreen;
