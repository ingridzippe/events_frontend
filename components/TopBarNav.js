import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';

class TopBarNav extends React.Component {
  static navigationOptions = {
    title: 'TopBarNav',
    header: null
  };
  render() {
    return (
      <View style={styles.topbar}>
        {/* <StatusBar
          barStyle="light-content"
        /> */}
        <TouchableOpacity
          style={{position: 'absolute', left: 14, top: 32}}
          onPress={() => { this.props.navigation.navigate('Create'); }} >
          <Icon name='plus-square-o' style={{ fontSize: 24, marginTop: 1, color: '#fff'}} />
        </TouchableOpacity>
        <Image source={require('../assets/drip_current.png')}
              style={{marginTop: 22, width: 54, height: 35}}/>
              {/* style={{marginTop: 21, width: 50, height: 30}}/> */}
         {/* <TouchableOpacity
           style={{position: 'absolute', right: 14, top: 32}}
           onPress={() => { this.props.navigation.navigate('InviteFriends'); }} >
           <Icon name='plus' style={{ fontSize: 20, marginTop: 3, color: '#fff'}} />
         </TouchableOpacity> */}
      </View>
    );
  }
}

export default TopBarNav;
