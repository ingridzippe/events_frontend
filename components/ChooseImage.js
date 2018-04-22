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
} from 'react-native';
import Background from '../components/Background';
import styles from '../styles/styles';

import { RNS3 } from 'react-native-aws3';

const domain = 'https://whispering-savannah-32809.herokuapp.com';

var defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
};

class ChooseImage extends React.Component {
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
      if (imageUri) {
        this.getSignedRequest(imageUri);
        this.setState({ displayImage: imageUri });
      }

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
  render() {
    return (
        <View>
         <Modal
            transparent={false}
            visible={this.state.modalVisible}
          >
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
              <View style={{justifyContent: 'center', width: 300, height: 600}}>

              </View>
            </View>
          </Modal>
          {this.state.displayImage ?
            <Image
              style={{ alignSelf: 'stretch', height: 100, marginBottom: 24, marginTop: -53 }}
              source={{ uri: this.state.displayImage }} /> :
            <TouchableOpacity
              style={[styles.button, styles.buttonBlue, {marginTop: -52, marginBottom: 30}]}
              onPress={() => { this.pickImage(); }} >
              <Text style={styles.buttonLabel}>Choose A Profile Picture</Text>
            </TouchableOpacity> }
        </View>
    );
  }
}

export default ChooseImage;
