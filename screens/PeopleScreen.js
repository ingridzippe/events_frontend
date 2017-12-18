import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  ListView,
} from 'react-native';
import BottomBarNav from '../components/BottomBarNav';
import TopBar from '../components/TopBar';
import Background from '../components/Background';
import DatePicker from '../components/DatePicker';
import styles from '../styles/styles';
import Swiper from '@reactscreens/swiper';
import Card from '@reactscreens/swiper/card';
import Actions from '@reactscreens/swiper/actions';

// const domain = "https://still-citadel-74266.herokuapp.com";
const domain = process.env.BACKEND;

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Ventful',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
        user: '',
        dataSource: ds.cloneWithRows([])
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3000/peoplelist`)
    .then((response) => {
      console.log('response 1', response)
      return response.json();
    })
    .then((responseJson) => {
        console.log('responseJson', responseJson);
        if (responseJson.success === true) {
            console.log('RESPONSE JSON people', responseJson);
            this.setState({ dataSource: ds.cloneWithRows(responseJson.people) });
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
  render() {
    return (
        <Background>
        <TopBar />
        <ListView
          // style={styles.eventsContainer}
          // showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
                  <View>
                  <Swiper
                    onTossLeft={card => console.log(card, 'tossed left')}
                    onTossRight={card => console.log(card, 'tossed right')}
                    actionsBar={toss => <Actions toss={toss} />}
                  >
                    <Card
                      image={rowData.image}
                      title={rowData.fullname}
                      subTitle={rowData.username}
                    />
                  </Swiper>
                  <Text style={{backgroundColor: 'transparent'}}></Text>
                  </View>
          }
        />
          <BottomBarNav navigation={this.props.navigation} />
        </Background>
    );
  }
}

export default SearchScreen;
