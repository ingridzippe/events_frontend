import { StyleSheet } from 'react-native';

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282f37',
    // backgroundColor: '#F5FCFF',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    // white
    // backgroundColor: '#F5FCFF',
    // dark
    backgroundColor: '#282f37'
  },
  eventsContainer: {
    flex: 1,
    // borderColor: '#000',
    // borderWidth: 1,
    // backgroundColor: '#fff',
    backgroundColor: '#282f37',
    alignSelf: 'center'
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
    borderColor: '#a5c0df',
    borderWidth: 1
  },
  event: {
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: 10,
    height: 150,
    borderWidth: 1,
    borderRadius: 10,
    // borderColor: '#a5c0df',
    borderColor: '#fff'
  },
  user: {
    width: 270,
    marginTop: 6,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: '#fff'
  },
  words: {
    width: 270,
    marginTop: 6,
    marginLeft: 20,
    fontSize: 16,
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
    backgroundColor: '#0198E1'
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
    backgroundColor: '#282f37',
    height: 60,
    borderTopWidth: 0.5,
    borderColor: '#a5c0df',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderRadius: 1,
    borderColor: '#a5c0df',
  },
  bottombaritem: {
    paddingTop: 14.5,
    flex: 0.2,
    alignItems: 'center',
  }
});

export default styles;
