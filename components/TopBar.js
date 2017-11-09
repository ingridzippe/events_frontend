import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar
} from 'react-native';
import styles from '../styles/styles';

class TopBar extends React.Component {
  static navigationOptions = {
    title: 'TopBar',
    header: null
  };
  render() {
    return (
        <View style={styles.topbar}>
          <StatusBar
            barStyle="light-content"
          />
          <Image source={require('../assets/drip_logo.png')}
                 style={{marginTop: 21, width: 50, height: 30}}/>
        </View>
    );
  }
}

export default TopBar;
