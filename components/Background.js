import React from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View
} from 'react-native';
import styles from '../styles/styles';

class Background extends React.Component {
  static navigationOptions = {
    title: 'BottomBarNav',
    header: null
  };
  render() {
    return (
      <ImageBackground source={require('../assets/fly.jpg')}
        style={styles.backgroundImage}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

export default Background;
