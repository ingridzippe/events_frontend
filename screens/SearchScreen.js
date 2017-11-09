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
import DatePicker from '../components/DatePicker';
import styles from '../styles/styles';

const domain = "https://still-citadel-74266.herokuapp.com";

class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Ventful',
    headerLeft: null
  };
  constructor(props) {
    super(props);
    this.state = {
        user: '',
    };
  }
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.textBig}>
            Search by event type, other keywords, and location coming soon.
          </Text>
          <BottomBarNav navigation={this.props.navigation} />
        </View>
    );
  }
}

export default SearchScreen;
