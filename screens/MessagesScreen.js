import React from 'react';
import {
  AsyncStorage,
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image,
  TextInput
} from 'react-native';
import BottomBarNav from '../components/BottomBarNav';
import TopBarNav from '../components/TopBarNav';
import Background from '../components/Background';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigator } from 'react-navigation';
// import { ImagePicker, Location, Permissions, MapView } from 'expo';

// const domain = 'https://something-horizons.herokuapp.com';
// const domain = "https://still-citadel-74266.herokuapp.com";
// const domain = process.env.BACKEND;
// localhost
// postgres SQL
const domain = 'https://whispering-savannah-32809.herokuapp.com';


var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
var search = false;

class MessagesScreen extends React.Component {
  static navigationOptions = {
    title: 'Drip', //you put the title you want to be displayed here
    // headerLeft: null,
    // headerTintColor: "#fff",
    // headerStyle: {
    //   backgroundColor: "#000"
    // },
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      latitude: 0,
      longitude: 0,
      username: null,
      password: null,
      search: false,
    };
    this.formatDate = this.formatDate.bind(this);
    this.formatMonth = this.formatMonth.bind(this);
    this.formatDay = this.formatDay.bind(this);
    this.searchByKeyword = this.searchByKeyword.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.postCreateEvent = this.postCreateEvent.bind(this);
  }
  componentDidMount() {
    // if there is a user in phone storage, go to posts
    AsyncStorage.getItem('dripuser')
      .then((resultuser) => {
        if(resultuser) {

          AsyncStorage.getItem('dripuserpassword')
          .then((resultpass) => {
            if(resultpass) {

              console.log('USER', resultuser)
              console.log('PASS', resultpass)
              // this.setState({ username: resultuser });
              // this.setState({ password: resultpass });

              return fetch(`${domain}/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  username: resultuser,
                  password: resultpass,
                })
              })
              .then((response) => response.json())
              .then((responseJson) => {
                console.log("DOES THIS SEND AYTHING BACK?", responseJson)
                if (responseJson.success) {
                  if (responseJson.user) {
                    console.log('PLEASE RETURN VALID LOGIN', responseJson.user)
                    AsyncStorage.setItem('dripuser', responseJson.user.username);
                    AsyncStorage.setItem('dripuserpassword', responseJson.user.password);

                  }
                } else {
                  alert('Invalid credentials bruh');
                }
              })
              .catch((err) => {
                /* do something if there was an error with fetching */
                console.log('it errored', err);
              });

            } else { // if result pass
              this.props.navigation.navigate('Login');
            }
          }) // result pass

        } else { // if resultuser
          this.props.navigation.navigate('Login');
        }
      }) // resultuser


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
    {console.log("right before")}
    navigator.geolocation.getCurrentPosition(
      (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        console.log('currlat', this.state.latitude)
        console.log('currlong', this.state.longitude)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    {console.log("right after")}

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
          eventLongitude: long,
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

  searchByKeyword(keyword) {
    console.log(keyword);
    // fetch(`https://www.eventbriteapi.com/v3/events/search?token=ZGQUVO5F3V3AXFDYRINO&q=${keyword}`)
    fetch(`https://www.eventbriteapi.com/v3/events/search?expand=organizer,venue&token=ZGQUVO5F3V3AXFDYRINO&q=${keyword}`)
    .then((response) => {
      console.log('response 1', response)
      return response.json();
    })
    .then((responseJson) => {
        console.log('responseJson', responseJson);
        if (responseJson.events) {
            console.log('RESPONSE JSON MESSAAGES', responseJson);
            console.log(this.state.search);
            search = true;
            this.setState({ dataSource: ds.cloneWithRows(responseJson.events), search: true });
         } else { console.log("no events here") }
         console.log(responseJson);
    })
    .catch((err) => {
      console.log(err);
      console.log('could not get events');
    });
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

  setSearch() {
    search = true;
  }
  getLocation(venueid) {
    console.log("Whats the id");
    console.log(venueid);
    fetch(`https://www.eventbriteapi.com/v3/venues/${venueid}/?token=ZGQUVO5F3V3AXFDYRINO`)
    .then((response) => { return response.json(); })
    .then((responseJson) => {
        console.log('responseJson', responseJson);
        if (responseJson) {
            console.log('venue', responseJson);
            return responseJson.venue;
        } else { console.log("no events here") }
    })
    .catch((err) => { console.log(err); });
  }
  postCreateEvent(img, date, loc, des) {
  fetch(`${domain}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          eventimage: img,
          eventdate: date,
          eventlocation: loc,
          eventdescription: des,
      })
    })
    .then((response) => {
        console.log('RESPONSE', response);
        return response.json();
    })
    .then((responseJson) => {
      if (responseJson.success === true) {
          search = false;
          this.postLikesReaction(rowData.id);
          console.log("yes");
      }
      else { console.log('event did not save') }
    })
    .catch((err) => { console.log('it errored', err); });
  }


render() {
    return (
      <Background>
      <TopBarNav navigation={this.props.navigation} />
      <View style={{backgroundColor: "#1d161c", height: 33}}>
        <View style={{backgroundColor: "#544945", marginTop: 2, height: 27, marginLeft: 16, marginRight: 16, borderRadius: 20}}>
        <TextInput
            style={{color: "#fff", marginTop: 3, marginLeft: 20}}
            autoCapitalize="sentences"
            autoCorrect={true}
            onChangeText={(text) => this.setState({text})}
            keyboardType="default"
            returnKeyType="search"
            onSubmitEditing={(event) => {
                console.log(this.state.search);
                this.setState({search: false});
                console.log('what?');
                this.setSearch();
                this.searchByKeyword(this.state.text);
            }}
            placeholder="Search"
        />
        </View>
      </View>
      <View style={{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}>


        { this.state.search ? <ListView
          style={styles.eventsContainer}
          showsVerticalScrollIndicator={false}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity style={styles.event}>
              {!rowData.eventLatitude &&
                <View>
                <View style={{flexDirection: 'row', marginLeft: 20, marginBottom: 12}}>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                      <Text style={{ marginTop: 11, marginLeft: 16, fontSize: 19, fontWeight: "bold", color: '#fff'}}>
                          {rowData.name.text}
                      </Text>
                  </View>
                </View>
                <Image
                  style={{ alignSelf: 'stretch', height: 100, marginBottom: 0, marginTop: 0 }}
                  source={ rowData.logo ? { uri: rowData.logo.url } : require('../assets/drip_logo.png') } />
                <View style={{flex: 1, marginTop: 2, marginBottom: 9, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={[styles.bottombaritem]}
                        onPress={() => {
                            this.postCreateEvent(rowData.logo.url, rowData.end.local, rowData.venue.address.address_1, rowData.description.text, rowData.id)
                        }}>
                      <Icon name='hand-peace-o' style={{ fontSize: 18, color: '#f7f7f7' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.bottombaritem]}
                        onPress={() => {
                            this.postCreateEvent(rowData.logo.url, rowData.end.local, rowData.venue.address.address_1, rowData.description.text, rowData.id)
                        }}>
                      <Icon name='heart-o' style={{ fontSize: 18, color: '#f7f7f7' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.bottombaritem]}>
                      <Icon name='paper-plane-o' style={{ fontSize: 18, color: '#f7f7f7' }} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10}}>
                    <View style={{ marginLeft: 37}}>
                        <View style={{flex: 1, flexDirection: 'row', width: 50}}>
                          <Text style={{color: '#fff', fontSize: 16}}>
                            { this.formatMonth(rowData.end.local) }
                          </Text>
                          <Text style={{color: '#fff', fontSize: 16, marginLeft: 4, fontWeight: "bold"}}>
                            { this.formatDay(rowData.end.local) }
                          </Text>
                        </View>
                      <Text style={{fontWeight: "bold", color: '#fff', fontSize: 16, marginTop: 3}}>{rowData.venue.address.address_1}</Text>
                      <Text style={{color: '#fff', fontSize: 16, marginTop: 3}}>{rowData.description.text}</Text>
                    </View>
                </View>
                </View>}
            </TouchableOpacity> }
        /> :
        <ListView
          style={styles.eventsContainer}
          showsVerticalScrollIndicator={false}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity style={styles.event}>
              {!rowData.eventLatitude &&
                <View>
                <View style={{flexDirection: 'row', marginLeft: 20, marginBottom: 12}}>
                  <Image source={rowData.user.image ? {uri: rowData.user.image} : require('../assets/generic.png') }
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
                    <TouchableOpacity style={[styles.bottombaritem]} onPress={() => { this.postLikeReaction(rowData.event.id); }} >
                      <Icon name='heart-o' style={{ fontSize: 18, color: '#f7f7f7' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.bottombaritem]}>
                      <Icon name='paper-plane-o' style={{ fontSize: 18, color: '#f7f7f7' }} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10}}>
                    <View style={{ marginLeft: 75, marginRight: 15}}>
                        <View style={{flex: 1, flexDirection: 'row', width: 50}}>
                          <Text style={{color: '#fff', fontSize: 16}}>
                            { this.formatMonth(rowData.event.eventdate) }
                          </Text>
                          <Text style={{color: '#fff', fontSize: 16, marginLeft: 4, fontWeight: "bold"}}>
                            { this.formatDay(rowData.event.eventdate) }
                          </Text>
                        </View>
                      <Text style={{fontWeight: 'bold', paddingBottom: 0, color: '#fff', fontSize: 16, marginTop: 3}}>{rowData.event.eventlocation}</Text>
                      <Text style={{color: '#fff', fontSize: 16, marginTop: 3}}>{rowData.event.eventdescription}</Text>
                    </View>
                </View>
                </View>}
            </TouchableOpacity>}
        /> }
        <BottomBarNav navigation={this.props.navigation} />
      </View>
      </Background>
    );
  }
}

export default MessagesScreen;
