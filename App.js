// import React from 'react';
import { StackNavigator } from 'react-navigation';
import BottomBarNav from './components/BottomBarNav';
import TopBarNav from './components/TopBarNav';
import LoginScreen from './screens/LoginScreen';
import MessagesScreen from './screens/MessagesScreen';
import RegisterScreen from './screens/RegisterScreen';
// import SaveScreen from './screens/SaveScreen';
// import UsersScreen from './screens/UsersScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import InviteFriendsScreen from './screens/InviteFriendsScreen';
import SearchScreen from './screens/SearchScreen';
import PeopleScreen from './screens/PeopleScreen';
import UpdateScreen from './screens/UpdateScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import EditMyProfileScreen from './screens/EditMyProfileScreen';
import MapScreen from './screens/MapScreen';

// const domain = "https://something-horizons.herokuapp.com";
//const domain = "https://hohoho-backend.herokuapp.com"; // Old Server

// here some changes
//Navigator
export default StackNavigator({
  BottomBarNav: {
    screen: BottomBarNav,
    navigationOptions: {
      title: 'BottomBar',
    },
  },
  TopBarNav: {
    screen: TopBarNav,
    // navigationOptions: {
    //   title: 'TopBar',
    // },
  },
  // Home: {
  //   screen: HomeScreen,
  // },
  Register: {
    screen: RegisterScreen,
  },
  Login: {
    screen: LoginScreen,
  },
  Messages: {
    screen: MessagesScreen,
  },
  // Users: {
  //   screen: UsersScreen,
  // },
  Search: {
    screen: SearchScreen,
  },
  People: {
    screen: PeopleScreen,
  },
  Update: {
    screen: UpdateScreen,
  },
  Create: {
    screen: CreateEventScreen,
  },
  InviteFriends: {
    screen: InviteFriendsScreen,
  },
  MyProfile: {
    screen: MyProfileScreen,
  },
  Map: {
    screen: MapScreen,
  },
  EditMyProfile: {
    screen: EditMyProfileScreen,
  },
}, {
  initialRouteName: 'Messages',
  headerMode: 'screen'
});
