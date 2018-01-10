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
  ListView,
} from 'react-native';
import TopBarNav from '../components/TopBarNav';
import Background from '../components/Background';
import styles from '../styles/styles';
import { RNS3 } from 'react-native-aws3';

// const domain = "https://something-horizons.herokuapp.com";
// const domain = 'https://still-citadel-74266.herokuapp.com';
// localhost
// const domain = 'http://localhost:3000';
// postgres SQL
const domain = 'https://whispering-savannah-32809.herokuapp.com';


class EditMyProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Drip',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      fullname: '',
      username: '',
      website: '',
      bio: '',
      email: '',
      phone: '',
      gender: '',
    };
  }
  componentDidMount() {
    fetch(`${domain}/getmyprofile`)
    .then((response) => {
      // console.log('az', response.json());
      return response.json();
    })
    .then((resjson) => {
      console.log('responseJson', resjson);
      // if (resjson.success === true) {
      // console.log('indexing correctly?', resjson.user[0]);
        var u = resjson.user;
        this.setState({
          profileImage: u.image,
          fullname: u.fullname,
          username: u.username,
          website: u.website,
          bio: u.bio,
          email: u.email,
          phone: u.phone,
          gender: u.gender,
        })
        console.log('RESPONSE JSON my profile', resjson);
       // } else { alert('invalid') }
    })
    .catch((err) => { console.log('err'); });
  }
  getSignedRequest(uri){
    var fileName;
    const storedUser = AsyncStorage.getItem('dripuser');
    if (storedUser !== null){
      var now = new Date();
      fileName = `avataruser${storedUser}date${now}`
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
      this.setState({ profileImage: response.body.postResponse.location });
    });
  }
  pickImage() {
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      this.setState({ profileImage: imageUri });
      console.log('this.state.profileImage', this.state.profileImage);
    }, error => console.error(error));
  }
  setModalVisible(visible) {
    this.setState({modalVisible: true});
  }
  closeModal(visible) {
    this.setState({modalVisible: false});
  }
  postUpdateMyUserInfo() {
  console.log('posting user info got here')
  fetch(`${domain}/updatemyuserinfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: this.state.profileImage,
        fullname: this.state.fullname,
        username: this.state.username,
        website: this.state.website,
        bio: this.state.bio,
        email: this.state.email,
        phone: this.state.phone,
        gender: this.state.gender
      })
    })
    .then((response) => {
      if (response) { console.log('response true') }
      else { console.log('error'); }
      return response.json();
    })
    .then((responseJson) => {
      this.props.navigation.navigate('MyProfile');
      console.log('responseJson', responseJson);
      if (responseJson.success === true) {
        console.log('RESPONSE EVENT');
        this.props.navigation.navigate('MyProfile');
      } else {
        console.log('no user data found')
      }
    })
    .catch((err) => { console.log('it errored', err); });
  }
  getSignedRequest(uri){
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
      this.setState({ profileImage: response.body.postResponse.location });
    });
  }
  pickImage() {
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      console.log('imageUri', imageUri);
      this.getSignedRequest(imageUri);
      this.setState({ profileImage: imageUri });
    }, error => console.error(error));
  }
  render() {
    return (
        <Background>
        <TopBarNav navigation={this.props.navigation} />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => { this.props.navigation.navigate('MyProfile'); }}>
            <Text style={{color: '#fff'}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.done}
            onPress={() => { this.postUpdateMyUserInfo(); }}>
            <Text style={{color: '#fff'}}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: -35, marginBottom: 5, alignItems: 'center'}}
            onPress={() => { this.pickImage(); }} >
            <Image
              style={{ width: 90, height: 90, borderColor: '#fff', borderWidth: 1, borderRadius: 45 }}
              source={this.state.profileImage ? { uri: this.state.profileImage } : require('../assets/generic_user.png') } />
            <Text style={{fontSize: 14, color: '#fff', marginTop: 10}}>
              Change Profile Photo
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.profileinput}
            value={this.state.fullname}
            placeholder='Name'
            onChangeText={(text) => this.setState({ fullname: text })}
          />
          <TextInput
            style={styles.profileinput}
            value={this.state.username}
            placeholder='Username'
            onChangeText={(text) => this.setState({ username: text })}
          />
          <TextInput
            style={styles.profileinput}
            value={this.state.website}
            placeholder='Website'
            onChangeText={(text) => this.setState({ website: text })}
          />
          <TextInput
            style={styles.profileinput}
            value={this.state.bio}
            placeholder='Bio'
            onChangeText={(text) => this.setState({ bio: text })}
          />
          <Text style={{color: '#fff', marginTop: 20, marginBottom: 10, fontSize: 14}}>Private Information</Text>
          <TextInput
            style={styles.profileinput}
            value={this.state.email}
            placeholder='Email'
            onChangeText={(text) => this.setState({ email: text })}
          />
          <TextInput
            style={styles.profileinput}
            value={this.state.phone}
            placeholder='Phone'
            onChangeText={(text) => this.setState({ phone: text })}
          />
          <TextInput
            style={styles.profileinput}
            placeholder='Gender'
            value={this.state.gender}
            onChangeText={(text) => this.setState({ gender: text })}
          />
        </View>
        </Background>
    );
  }
}

export default EditMyProfileScreen;
