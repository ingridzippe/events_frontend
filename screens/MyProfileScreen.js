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
const domain = "https://still-citadel-74266.herokuapp.com";

class MyProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Ventful', //you put the title you want to be displayed here
    header: null
  };
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
    fetch(`${domain}/myevents`)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log('responseJson', responseJson);
        if (responseJson.success === true) {
            console.log('RESPONSE JSON MESSAAGES', responseJson);
            this.setState({ dataSource: ds.cloneWithRows(responseJson.events) });
         } else {
            alert('invalid')
         }
         console.log(responseJson);
    })
    .catch((err) => {
      console.log(err);
      console.log('it errored MMMMM');
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
  render() {
    return (
      <Background>
      <TopBar />
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={require('../assets/generic_user.png')}
                 style={{marginLeft: 30, marginTop: 10, width: 76, height: 76, borderWidth: 1, borderRadius: 38, borderColor: '#f7f7f7'}}/>
          <View style={{ height: 120, flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
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
              <View style={{ flex: 1, width: 200, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity>
                    <Text style={{
                      marginTop: 35,
                      marginLeft: 30,
                      textAlign: 'center',
                      overflow: 'hidden',
                      backgroundColor: '#fff',
                      height: 29,
                      width: 200,
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
          </View>
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
                      <Image source={ require('../assets/generic_user.png') }
                             style={{width: 40, height: 40, borderWidth: 1, borderRadius: 20, borderColor: '#f7f7f7'}}/>
                      {/* <Image source={rowData.userDetails.image ? {uri: rowData.userDetails.image} : require('../assets/generic_user.png') }
                             style={{width: 40, height: 40, borderWidth: 1, borderRadius: 20, borderColor: '#f7f7f7'}}/> */}
                      <Text style={styles.user}>{rowData.userDetails.username}</Text>
                    </View>
                    <Image
                      style={{ alignSelf: 'stretch', height: 100, marginBottom: 0, marginTop: 0 }}
                      source={{ uri: rowData.eventImage }} />
                    <Text style={styles.details}>
                        { this.formatDate(rowData.eventDate) }
                    </Text>
                    <Text style={styles.details}>{rowData.eventLocation}</Text>
                    <Text style={styles.words}>{rowData.eventDescription}</Text>
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
