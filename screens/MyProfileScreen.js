import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image
} from 'react-native';
import BottomBarNav from '../components/BottomBarNav';
import TopBar from '../components/TopBar';
import Background from '../components/Background';
// import BottomBar from '../components/BottomBar';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { StackNavigator } from 'react-navigation';
// import { ImagePicker, Location, Permissions, MapView } from 'expo';

// const domain = 'https://something-horizons.herokuapp.com';
// const domain = "https://still-citadel-74266.herokuapp.com";
const domain = 'http://localhost:3000';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class MyProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Ventful', //you put the title you want to be displayed here
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      user: null,
    };
    this.formatDate = this.formatDate.bind(this);
    this.formatMonth = this.formatMonth.bind(this);
    this.formatDay = this.formatDay.bind(this);
    fetch(`${domain}/myevents`)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log('responseJson', responseJson);
        if (responseJson.success === true) {
            console.log('RESPONSE JSON MESSAAGES', responseJson);
            this.setState({ dataSource: ds.cloneWithRows(responseJson.events) });
         } else {
            console.log('no personal events found')
         }
         console.log(responseJson);
    })
    .catch((err) => {
      console.log(err);
      console.log('it errored MMMMM');
    });
  }
  componentWillMount() {
    fetch(`${domain}/getmyprofile`)
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      // console.log('responseJson', responseJson);
      // if (responseJson.success === true) {
        this.setState({user: responseJson.user})
      // } else { console.log('cant get user proile'); }
    })
    .catch((err) => {
      console.log(err, 'user profile not found');
    });
  }
  formatDate(date) {
    var monthNames = [
      "Jan", "Feb", "Mar", "April", "May",
      "June", "July", "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
    date = String(date).split(' ');
    var days = String(date[0]).split('-');
    var hours = String(date[1]).split(':');
    var dateArr = [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
    return dateArr[2] + ' ' + monthNames[dateArr[1]] + ' ' + dateArr[0];
  }
  formatMonth(date) {
    var monthNames = [
      "JAN", "FEB", "MAR", "APRIL", "MAY",
      "JUN", "JUL", "AUG", "SEP", "OCT",
      "NOV", "DEC"
    ];
    date = String(date).split(' ');
    var days = String(date[0]).split('-');
    var hours = String(date[1]).split(':');
    var dateArr = [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
    return monthNames[dateArr[1]];
  }
  formatDay(date) {
    date = String(date).split(' ');
    var days = String(date[0]).split('-');
    var hours = String(date[1]).split(':');
    var dateArr = [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
    return dateArr[2];
  }
  render() {
    return (
      <Background>
      <TopBar />
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Image source={this.state.user ? {uri: this.state.user.image} : require('../assets/generic_user.png')}
               style={{height: 250, borderTopWidth: 0, borderColor: '#f7f7f7'}}/>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: '#946E6E'}}>
        <View style={{flex: 0.7, marginTop: 6 }}>
        <Text style={styles.profilewords, {marginLeft: 33, marginTop: 16, color: '#fff', fontSize: 35}}>{this.state.user ? this.state.user.fullname : ''}</Text>
        <Text style={styles.profilewords}>{this.state.user ? this.state.user.username : ''}</Text>
        <Text style={styles.profilewords}>{this.state.user ? this.state.user.website : ''}</Text>
        </View>
          {/* <Image source={this.state.user ? {uri: this.state.user.image} : require('../assets/generic_user.png')}
                 style={{marginLeft: 30, marginTop: 10, width: 76, height: 76, borderWidth: 1, borderRadius: 38, borderColor: '#f7f7f7'}}/> */}
          {/* <View style={{ marginTop: 12, height: 120, flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={styles.profilewords}>{this.state.user ? this.state.user.fullname : ''}</Text>
              <Text style={styles.profilewords}>{this.state.user ? this.state.user.username : ''}</Text>
              <Text style={styles.profilewords}>{this.state.user ? this.state.user.website : ''}</Text> */}
              {/* <View style={{flex: 1, flexDirection: 'column', width: 200}}>
                  <View style={{ flex: 1, width: 200, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>1,000</Text>
                      <Text>380</Text>
                      <Text>400</Text>
                  </View>
                  <View style={{ flex: 1, width: 200, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>events</Text>
                      <Text>followers</Text>
                      <Text>following</Text>
                  </View>
              </View> */}
              <View style={{ marginTop: 17, flex: 0.5, width: 200, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity>
                    <Text style={{
                      marginTop: 10,
                      marginLeft: 30,
                      textAlign: 'center',
                      overflow: 'hidden',
                      backgroundColor: '#fff',
                      height: 29,
                      width: 110,
                      padding: 5,
                      margin: 6,
                      borderWidth: 0.8,
                      fontFamily: 'AvenirNext-Regular',
                      borderRadius: 7,
                      borderColor: '#A9A9A9',
                    }}
                    onPress={() => { this.props.navigation.navigate('EditMyProfile'); }}
                    >Edit Profile</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity >
                    <Icon
                      name='cog'
                      style={{ marginTop: 5, marginLeft: 3, fontSize: 30, color: '#808080' }} />
                  </TouchableOpacity> */}
              </View>
          {/* </View> */}
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 10, marginTop: 18, height: 64, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#946E6E' }}>
          <Icon name='map-marker' style={{ width: 10, fontSize: 17, marginLeft: 37, marginTop: 10, color: '#fff' }} />
          <Text style={styles.lessthan}>less than a mile away</Text>
        </View>
        <View style={{ justifyContent: 'space-between', backgroundColor: '#221720', flexDirection: 'row', paddingTop: 10, height: 64, borderBottomWidth: 1, borderColor: '#946E6E' }}>
          <Icon name='hand-peace-o' style={{ flex: 0.5, textAlign: 'center', width: 20, fontSize: 20, marginTop: 11, color: '#fff' }} />
          <Icon name='heart-o' style={{ flex: 0.5, textAlign: 'center', width: 20, fontSize: 20, marginTop: 11, color: '#fff' }} />
          <Icon name='smile-o' style={{ flex: 0.5, textAlign: 'center', width: 20, fontSize: 21, marginTop: 11, color: '#fff' }} />
          <Icon name='calendar-o' style={{ flex: 0.5, textAlign: 'center', width: 20, fontSize: 20, marginTop: 11, color: '#fff' }} />
        </View>
          <View style={{
            flex: 1,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <ListView
              style={styles.eventsContainer}
              showsVerticalScrollIndicator={false}
              dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                <TouchableOpacity style={styles.event}>
                  {!rowData.eventLatitude &&
                    <View>
                    <View style={{flexDirection: 'row', marginLeft: 20, marginBottom: 12}}>
                      { console.log('rowdata.image', rowData.userDetails.image) }
                      <Image source={ rowData.userDetails.image ? { uri: rowData.userDetails.image } : require('../assets/generic_user.png') }
                             style={{width: 40, height: 40, borderWidth: 1, borderRadius: 20, borderColor: '#f7f7f7'}}/>
                      {/* <Image source={rowData.userDetails.image ? {uri: rowData.userDetails.image} : require('../assets/generic_user.png') }
                             style={{width: 40, height: 40, borderWidth: 1, borderRadius: 20, borderColor: '#f7f7f7'}}/> */}
                      <Text style={styles.user}>{rowData.userDetails.username}</Text>
                    </View>
                    <Image
                      style={{ alignSelf: 'stretch', height: 100, marginBottom: 0, marginTop: 0 }}
                      source={{ uri: rowData.eventImage }} />
                      <View style={{flex: 1, marginTop: 2, marginBottom: 9, flexDirection: 'row', justifyContent: 'space-between'}}>
                          <TouchableOpacity style={[styles.bottombaritem]}>
                            <Icon name='heart-o' style={{ fontSize: 18, color: '#f7f7f7' }} />
                          </TouchableOpacity>
                          <TouchableOpacity style={[styles.bottombaritem]}>
                            <Icon name='comment-o' style={{ fontSize: 18, color: '#f7f7f7' }} />
                          </TouchableOpacity>
                          <TouchableOpacity style={[styles.bottombaritem]}>
                            <Icon name='bookmark-o' style={{ fontSize: 18, color: '#f7f7f7' }} />
                          </TouchableOpacity>
                          <TouchableOpacity style={[styles.bottombaritem]}>
                            <Icon name='paper-plane-o' style={{ fontSize: 18, color: '#f7f7f7' }} />
                          </TouchableOpacity>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10}}>
                          <View style={{ marginLeft: 75 }}>
                              <View style={{flex: 1, flexDirection: 'row', width: 40}}>
                                <Text style={{color: '#fff', fontSize: 16}}>
                                  { this.formatMonth(rowData.eventDate) }
                                </Text>
                                <Text style={{color: '#fff', fontSize: 16, marginLeft: 4, fontWeight: "bold"}}>
                                  { this.formatDay(rowData.eventDate) }
                                </Text>
                              </View>
                            <Text style={{color: '#fff', fontSize: 16, marginTop: 3}}>{rowData.eventDescription}</Text>
                            <Text style={{color: '#fff', fontSize: 16, marginTop: 3}}>{rowData.eventLocation}</Text>
                          </View>
                      </View>
                    </View>}
                </TouchableOpacity>
            }
          />
         </View>
         <BottomBarNav navigation={this.props.navigation} />
      </View>
      </Background>
    );
  }
}

export default MyProfileScreen;
