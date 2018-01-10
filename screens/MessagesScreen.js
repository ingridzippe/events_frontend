import React from 'react';
import {
  AsyncStorage,
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image,
} from 'react-native';
import BottomBarNav from '../components/BottomBarNav';
import TopBarNav from '../components/TopBarNav';
import Background from '../components/Background';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { StackNavigator } from 'react-navigation';
// import { ImagePicker, Location, Permissions, MapView } from 'expo';

// const domain = 'https://something-horizons.herokuapp.com';
// const domain = "https://still-citadel-74266.herokuapp.com";
// const domain = process.env.BACKEND;
// localhost
// postgres SQL
const domain = 'https://whispering-savannah-32809.herokuapp.com';


const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class MessagesScreen extends React.Component {
  static navigationOptions = {
    title: 'Drip', //you put the title you want to be displayed here
    // headerLeft: null,
    // headerTintColor: "#fff",
    // headerStyle: {
    //   backgroundColor: "#000"
    // },
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      latitude: 0,
      longitude: 0,
    };
    this.formatDate = this.formatDate.bind(this);
    this.formatMonth = this.formatMonth.bind(this);
    this.formatDay = this.formatDay.bind(this);
  }
  componentDidMount() {
    // if there is a user in phone storage, go to posts
    AsyncStorage.getItem('dripuser')
      .then((result) => {
        console.log(result);
        if(result) {
          console.log('yes user, stay on posts');
        } else {
          this.props.navigation.navigate('Login')
        }
      })

  // LOADS EVENTS
  // fetch(`http://localhost:3000/events`)
  // .then((response) => {
  //   console.log('response 1', response)
  //   return response.json();
  // })
  // .then((responseJson) => {
  //     console.log('responseJson', responseJson);
  //     if (responseJson.success === true) {
  //         console.log('RESPONSE JSON MESSAAGES', responseJson);
  //         this.setState({ dataSource: ds.cloneWithRows(responseJson.events) });
  //      } else {
  //         alert('invalid')
  //      }
  //      console.log(responseJson);
  // })
  // .catch((err) => {
  //   console.log(err);
  //   console.log('could not get events');
  // });
  // }

    fetch(`${domain}/reactions`)
    .then((response) => {
      console.log('response 1', response)
      return response.json();
    })
    .then((responseJson) => {
        console.log('responseJson', responseJson);
        if (responseJson.success === true) {
            console.log('RESPONSE JSON MESSAAGES', responseJson);
            this.setState({ dataSource: ds.cloneWithRows(responseJson.reactions) });
         } else {
            alert('invalid')
         }
         console.log(responseJson);
    })
    .catch((err) => {
      console.log(err);
      console.log('could not get events');
    });

  }

  // componentDidMount() {
  //   this.props.navigation.setParams({
  //     onRightPress: yourHandlerFunctionGoesHere
  //   })
  // }

  //
  postCreateEvent() {
  console.log('creating event');
  return fetch(`${domain}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          eventDate: this.state.eventDate,
          eventLocation: this.state.eventLocation,
          eventDescription: this.state.eventDescription
      })
    })
    .then((response) => {
        console.log('RESPONSE', response);
        response.json();
    })
    .then((responseJson) => {
      /* do something with responseJson and go back to the Login view but
       * make sure to check for responseJson.success! */
      console.log('responseJson', responseJson);
      if (responseJson.success === true) {
        console.log('RESPONSE EVENT', responseJson);
      } else {
        alert('invalid');
      }
    })
    .catch((err) => {
      /* do something if there was an error with fetching */
      console.log('it errored', err);
    });
  }
  // longTouchUser(lat, long) {
  // console.log('long touch user YAYAYAYAY');
  //   return fetch(`${domain}/create`, {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         eventLatitude: lat,
  //         eventLongitude: long
  //       })
  //     })
  //     .then((response) => response.json())
  //     console.log('HUH2', response);
  //     console.log('this is the pin', responseJson)
  //     .then((responseJson) => {
  //       if (responseJson.success === true) {
  //         console.log('response', responseJson)
  //         console.log('LOCATION', location)
  //         Alert.alert('Your location has been pinned.')
  //       } else {
  //         alert('did not send')
  //       }
  //       console.log(responseJson)
  //     })
  //     .catch((err) => {
  //       /* do something if there was an error with fetching */
  //       console.log('it errored')
  //     });
  // }
  longTouchUser(lat, long) {
      return fetch(`${domain}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventLatitude: lat,
          eventLongitude: long
        })
      })
        .then((response) => console.log('RESPONSE HERE HERE', response))
        .then((responseJson) => {
          if (responseJson.success) {
            console.log('SUCCESSSS');
          } else {
            alert('pin not pinning');
          }
        })
        .catch((err) => {
          /* do something if there was an error with fetching */
          console.log('it errored', err);
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
  postGoingReaction(eventid) {
  fetch(`${domain}/createreaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          eventid: eventid,
          type: 'going',
      })
    })
    .then((response) => {
        console.log('RESPONSE', response);
        return response.json();
    })
    .then((responseJson) => {
      console.log('responseJson', responseJson);
      if (responseJson.success === true) {
        console.log('reaction', responseJson.reaction);
      } else { console.log('reaction did not save') }
    })
    .catch((err) => { console.log('it errored', err); });
  }
  postLikeReaction(eventid) {
  fetch(`${domain}/createreaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          eventid: eventid,
          type: 'like',
      })
    })
    .then((response) => {
        console.log('RESPONSE', response);
        return response.json();
    })
    .then((responseJson) => {
      console.log('responseJson', responseJson);
      if (responseJson.success === true) {
        console.log('reaction', responseJson.reaction);
      } else { console.log('reaction did not save') }
    })
    .catch((err) => { console.log('it errored', err); });
  }

  // sendLocation = async(user) => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== 'granted') {
  //     //handle failure
  //     alert('Sorry this app cannot do cool things now.')
  //   }
  //   let location = await Location.getCurrentPositionAsync({
  //     enableHighAccuracy: true});
  //   console.log('LOCATION HERE', location)
  //   console.log('sendlatitude', location.coords.latitude)
  //   console.log('sendlongitude', location.coords.longitude)
  //   let latInt = parseInt(location.coords.latitude);
  //   let longInt = parseInt(location.coords.longitude);
  //   this.longTouchUser(latInt, longInt);
  //   console.log('kasdfksjf;slf')
  // }
  render() {
    return (
      <Background>
      <TopBarNav navigation={this.props.navigation} />
      <View style={{
        flex: 1,
        // dark
        // backgroundColor: '#282f37',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* <TouchableOpacity
            style={[styles.button, styles.buttonBlue]}
            onPress={() => { this.props.navigation.navigate('Create'); }}
        >
            <Text style={styles.buttonLabel}>Create Event</Text>
        </TouchableOpacity> */}
        {/* <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => */}
            {/* <TouchableOpacity
                style={[styles.button, styles.buttonBlue]}
                // onPress={this.sendLocation.bind(this)}
            >
                <Text style={styles.buttonLabel}>New Pin</Text>
            </TouchableOpacity> */}
          {/* }
        /> */}
        <ListView
          style={styles.eventsContainer}
          showsVerticalScrollIndicator={false}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity style={styles.event}>
              {!rowData.eventLatitude &&
                <View>
                <View style={{flexDirection: 'row', marginLeft: 20, marginBottom: 12}}>
                  <Image source={rowData.user.image ? {uri: rowData.user.image} : require('../assets/generic_user.png') }
                         style={{width: 40, height: 40, borderWidth: 1, borderRadius: 20, borderColor: '#f7f7f7'}}/>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                      <Text style={styles.user}>{rowData.user.username}</Text>
                      <Text style={{fontSize: 16, marginLeft: 8, marginTop: 11.8, alignItems: 'flex-start', color: '#fff' }}>{rowData.type==='like' ? 'likes' : 'is going to'}</Text>
                  </View>
                </View>
                <Image
                  style={{ alignSelf: 'stretch', height: 100, marginBottom: 0, marginTop: 0 }}
                  source={ rowData.event.eventimage ? { uri: rowData.event.eventimage } : require('../assets/drip_logo.png') } />
                <View style={{flex: 1, marginTop: 2, marginBottom: 9, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={[styles.bottombaritem]} onPress={() => { this.postGoingReaction(rowData.event.id); }} >
                      <Icon name='hand-peace-o' style={{ fontSize: 18, color: '#f7f7f7' }} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={[styles.bottombaritem]}>
                      <Icon name='comment-o' style={{ fontSize: 18, color: '#f7f7f7' }} />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={[styles.bottombaritem]} onPress={() => { this.postLikeReaction(rowData.event.id); }} >
                      <Icon name='heart-o' style={{ fontSize: 18, color: '#f7f7f7' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.bottombaritem]}>
                      <Icon name='paper-plane-o' style={{ fontSize: 18, color: '#f7f7f7' }} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10}}>
                    <View style={{ marginLeft: 75 }}>
                        <View style={{flex: 1, flexDirection: 'row', width: 40}}>
                          <Text style={{color: '#fff', fontSize: 16}}>
                            { this.formatMonth(rowData.event.eventdate) }
                          </Text>
                          <Text style={{color: '#fff', fontSize: 16, marginLeft: 4, fontWeight: "bold"}}>
                            { this.formatDay(rowData.event.eventdate) }
                          </Text>
                        </View>
                      <Text style={{color: '#fff', fontSize: 16, marginTop: 3}}>{rowData.event.eventdescription}</Text>
                      <Text style={{color: '#fff', fontSize: 16, marginTop: 3}}>{rowData.event.eventlocation}</Text>
                    </View>
                </View>
                </View>}
              {/* {rowData.eventLatitude &&
                <MapView
                  style={{ flex: 7}}
                  region={{ latitude: 37.77182221974024,
                           longitude: -122.409295264717,
                           latitudeDelta: 0.1,
                           longitudeDelta: 0.05 }}
              />} */}
              {/* {rowData.eventLatitude &&
                <MapView style={{flex: 7}}
                    region={{ latitude: 37.77182221974024,
                             longitude: -122.409295264717,
                             latitudeDelta: 0.1,
                             longitudeDelta: 0.05 }}
                />} */}
            </TouchableOpacity>
          }
        />
        <BottomBarNav navigation={this.props.navigation} />
      </View>
      </Background>
    );
  }
}

export default MessagesScreen;
