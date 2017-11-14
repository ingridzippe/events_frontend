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
import TopBar from '../components/TopBar';
import Background from '../components/Background';
import styles from '../styles/styles';
// import { StackNavigator } from 'react-navigation';
// import { ImagePicker, Location, Permissions, MapView } from 'expo';

// const domain = 'https://something-horizons.herokuapp.com';
const domain = "https://still-citadel-74266.herokuapp.com";

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
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
    this.formatDate = this.formatDate.bind(this);
    fetch(`${domain}/events`)
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
      <TopBar />
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
                  <Text style={{borderWidth: 1, borderRadius: 20, borderColor: '#ff4691', height: 40, width: 40}} />
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
