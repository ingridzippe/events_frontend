import React from 'react';
import {
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
import TopBar from '../components/TopBar';
import Background from '../components/Background';
import styles from '../styles/styles';

// const domain = "https://something-horizons.herokuapp.com";
const domain = 'https://still-citadel-74266.herokuapp.com';

class EditMyProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Drip',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      image: '',
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
    .then((response) => response.json())
    .then((resjson) => {
      console.log('responseJson', resjson);
      if (resjson.success === true) {
          console.log('indexing correctly?', resjson.user[0]);
          var u = resjson.user[0];
          this.setState({
            image: u.image,
            fullname: u.fullname,
            username: u.username,
            website: u.website,
            bio: u.bio,
            email: u.email,
            phone: u.phone,
            gender: u.gender,
          })
          console.log('RESPONSE JSON my profile', resjson);
       } else { alert('invalid') }
    })
    .catch((err) => { console.log('err'); });
  }
  pickImage() {
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      this.setState({ image: imageUri });
      console.log('this.state.image', this.state.image);
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
        image: this.state.image,
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
  render() {
    return (
        <Background>
        <TopBar />
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
              source={this.state.image ? { uri: this.state.image } : require('../assets/generic_user.png') } />
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
