import { StyleSheet } from 'react-native';

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // dark
    // backgroundColor: '#282f37',
    // transparent
    backgroundColor: 'transparent',
    // backgroundColor: '#F5FCFF',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    // white
    // backgroundColor: '#F5FCFF',
    // dark
    // backgroundColor: '#282f37',
    // transparent
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderColor: '#ffb6c1',
    borderWidth: 20
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    // resizeMode: 'cover'
  },
  eventsContainer: {
    flex: 1,
    // backgroundColor: '#fff',
    // dark
    // backgroundColor: '#282f37',
    // transparent
    backgroundColor: 'transparent',
    alignSelf: 'stretch'
  },
  peopleContainer: {
    flex: 1,
    // backgroundColor: '#fff',
    // dark
    // backgroundColor: '#282f37',
    // transparent
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
    height: 500
  },
  smallButton: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    height: 40,
    padding: 30,
    margin: 30,
    fontFamily: 'AvenirNext-Regular',
    borderRadius: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    margin: 25,
    marginTop: -50,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular'
  },
  input: {
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
    borderRadius: 5,
    color: '#fff',
    borderColor: '#fff',
    // borderColor: '#a5c0df',
    borderWidth: 1
  },
  profileinput: {
    alignSelf: 'stretch',
    paddingTop: 17,
    paddingBottom: 17,
    color: '#fff',
    borderColor: '#fff',
    // borderColor: '#a5c0df',
    borderBottomWidth: 1
  },
  event: {
    alignSelf: 'stretch',
    marginTop: 20,
    marginBottom: 27,
    // height: 300,
    // borderColor: '#000',
    // borderWidth: 1,
    // borderWidth: 1,
    // borderRadius: 10,
    // borderColor: '#a5c0df',
    // borderColor: '#fff'
  },
  user: {
    width: 270,
    marginTop: 11,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: '#fff'
  },
  words: {
    width: 270,
    marginTop: 6,
    marginLeft: 75,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Helvetica Neue',
    fontWeight: '300'
  },
  profilewords: {
    width: 270,
    marginTop: 10,
    marginLeft: 35,
    fontSize: 15.5,
    color: '#fff',
    fontFamily: 'Helvetica Neue',
    fontWeight: '300'
  },
  lessthan: {
    width: 270,
    marginTop: 10,
    marginLeft: 17,
    fontSize: 15.5,
    color: '#fff',
    fontFamily: 'Helvetica Neue',
    fontWeight: '300'
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#13111c'
    // backgroundColor: '#0198E1'
    // backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  grey: {
    backgroundColor: '#f7f7f7'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    padding: 10,
    fontFamily: 'AvenirNext-Regular',
    borderRadius: 5
  },
  or: {
    fontFamily: 'AvenirNext-Regular',
    padding: 20,
  },
  bottombar: {
    flex: 1,
    // white
    // backgroundColor: '#f7f7f7',
    // dark
    // backgroundColor: '#282f37',
    // purple-dark
    backgroundColor: '#13111c',
    // backgroundColor: '#241a22',
    height: 60,
    borderTopWidth: 0.5,
    // borderColor: '#a5c0df',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderRadius: 1,
    // borderColor: '#a5c0df',
  },
  topbar: {
    alignItems: 'center',
    backgroundColor: '#13111c',
    // backgroundColor: '#241a22',
    height: 69,
    borderBottomWidth: 0.5,
    // borderColor: '#a5c0df',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderRadius: 1,
    // borderColor: '#a5c0df',
  },
  done: {
    position: 'absolute',
    top: -34,
    right: 20,
  },
  cancel: {
    position: 'absolute',
    top: -34,
    left: 20,
  },
  bottombaritem: {
    paddingTop: 14.5,
    flex: 0.2,
    alignItems: 'center',
  }
});

export default styles;
