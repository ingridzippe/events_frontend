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
        <Image source={require('../assets/drip_logo.png')}
               style={{marginTop: 21, width: 50, height: 30}}/>
      </View>
    );
  }
}

export default TopBarNav;
