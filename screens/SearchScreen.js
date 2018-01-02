import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import BottomBarNav from '../components/BottomBarNav';
import TopBarNav from '../components/TopBarNav';
import Background from '../components/Background';
import DatePicker from '../components/DatePicker';
import styles from '../styles/styles';

// const domain = "https://still-citadel-74266.herokuapp.com";
const domain = process.env.BACKEND;

class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Ventful',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
        user: '',
    };
  }
  render() {
    return (
        <Background>
        <TopBarNav navigation={this.props.navigation} />
        <View style={styles.container}>
          <Text style={styles.textBig}>
            Search by event type, other keywords, and location coming soon.
          </Text>
          <BottomBarNav navigation={this.props.navigation} />
        </View>
        </Background>
    );
  }
}

export default SearchScreen;
