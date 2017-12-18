import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';

class BottomBarNav extends React.Component {
  static navigationOptions = {
    title: 'BottomBarNav',
    header: null
  };
  render() {
    return (
        <View style={styles.bottombar}>
          <TouchableOpacity
            style={[styles.bottombaritem]}
            onPress={() => { this.props.navigation.navigate('Messages'); }}
          >
            <Icon name='home' style={{ fontSize: 24,
                color: '#fff' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottombaritem]}
            onPress={() => { console.log('in to', this.props.navigation.navigate('People')) }}
          >
            <Icon name='smile-o' style={{ fontSize: 24, marginTop: 0,
                color: '#fff' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottombaritem]}
            onPress={() => { this.props.navigation.navigate('Create'); }}
          >
            <Icon name='plus-square-o' style={{ fontSize: 24, marginTop: 1,
                // color: '#333333',
                color: '#fff' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottombaritem]}
            onPress={() => { this.props.navigation.navigate('Update'); }}
          >
            <Icon name='heart-o' style={{ fontSize: 21, marginTop: 3,
                color: '#fff' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottombaritem]}
            onPress={() => { this.props.navigation.navigate('MyProfile'); }}
          >
            <Icon name='user-o' style={{ fontSize: 20, marginTop: 3,
                color: '#fff' }} />
          </TouchableOpacity>
        </View>
    );
  }
}

export default BottomBarNav;
