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
import TopBarNav from '../components/TopBarNav';
import Background from '../components/Background';
import DatePicker from '../components/DatePicker';
import styles from '../styles/styles';

// const domain = "https://still-citadel-74266.herokuapp.com";
const domain = process.env.BACKEND;

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class UpdateScreen extends React.Component {
  static navigationOptions = {
    title: 'Ventful',
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
        user: '',
        match: [],
        dataSource: ds.cloneWithRows([]),
    };
    this.postMatch = this.postMatch.bind(this);
  }
  componentDidMount(id) {
    fetch(`http://localhost:3000/updates`)
    .then((res) => { return res.json(); })
    .then((resj) => {
        console.log('WHAT IS THIS', resj);
        if (resj.success === true) {
            console.log('MATCHES', resj.updates)
            this.setState({ dataSource: ds.cloneWithRows(resj.updates) });
         } else { console.log('no updates') }
    })
    .catch((err) => { console.log('could not get updates'); });


    var alikesarr = [];
    var ilikesarr = [];
    var match = [];
    var thisuser = '';
    fetch(`http://localhost:3000/getlikes`)
      .then((alikes) => { return alikes.json(); })
      .then((alikesjson) => {
        console.log('alikesjson', alikesjson);
        thisuser = alikesjson['likes'][0].likingid;
        for (key in alikesjson['likes']) {
            alikesarr.push(alikesjson['likes'][key].likedid)
            console.log('alikesarr', alikesarr)
        }


        console.log('out hea', alikesarr);
        for (var i=0; i<alikesarr.length; i++) {
          console.log('i', i);
          console.log('alikesarr[i]', alikesarr[i]);
          var thei = alikesarr[i];
          fetch(`http://localhost:3000/getlikes/${alikesarr[i]}`)
            .then((ilikes) => { return ilikes.json(); })
            .then((ilikesjson) => {
              console.log(`i=${thei}=likesjson`, ilikesjson);
              for (key in ilikesjson['likes']) {
                console.log('ilikesjson[likes][key].likedid', ilikesjson['likes'][key].likedid);
                console.log('thisuser', thisuser);
                if (ilikesjson['likes'][key].likedid === thisuser) {
                  this.postMatch(ilikesjson['likes'][key].likingid);
                  // match.push(ilikesjson['likes'][key].likingid);
                  //
                  // console.log('match', match)
                  // this.setState({ match: match });
                  // this.postMatch(match[0], match[1]);
                }
                  // ilikesarr.push(ilikesjson['likes'][key].likedid)
              }
            })
            .catch((err) => { console.log(err); });
        }






      })
      .catch((err) => { console.log(err); });





    // fetch(`http://localhost:3000/getlikes`)
    // .then((res) => { return res.json(); })
    // .then((alikesj) => {
    //     if (alikesj.success === true) {
    //
    //         // for all the people A likes
    //         var alikes = alikesj['likes'];
    //         var alikesarr = [];
    //         var ilikesarr = [];
    //         var imatcharr = [];
    //         var jlikesback = [];
    //         var finalmatch = [];
    //         var finalmatches = [];
    //         for (var key in alikes) {
    //           // if (alikes.hasOwnProperty(key)) {
    //             var thisuser = alikes[key].likingid;
    //             alikesarr.push(alikes[key].likedid);
    //             console.log('A Likes : should be [2, 3]', alikesarr);
    //
    //             // check if person likes A back
    //             for (var i=0; i<alikesarr.length; i++) { // with execute twice
    //               fetch(`http://localhost:3000/getlikes/${alikesarr[i]}`)
    //               .then((res) => { return res.json(); })
    //               .then((ilikesj) => {
    //                   if (ilikesj.success === true) {
    //                     var ilikes = ilikesj['likes']; // get 'likes' instead of 'success' and 'likes'
    //                     console.log('WHAT IS I LIKES', ilikes)
    //                     for (var key in ilikes) {
    //                       // if (ilikes.hasOwnProperty(key)) {
    //                         ilikesarr.push(ilikes[key].likedid);
    //                         console.log('ilikesarr', ilikesarr);
    //                         console.log(`I Likes ${ilikes[key].likedid} : should be [1, 3]`, ilikesarr);
                            // console.log('same?', ilikes[key].likedid, thisuser)
                            // if (ilikes[key].likedid === thisuser) {
                            //   console.log('likedid', ilikes[key].likingid)
                            //   imatcharr.push(ilikes[key].likingid); // array of i where A likes i, and i likes A
                            //   console.log('A Likes i, I Likes a', imatcharr);

                              // check people who i likes
                              // for (var j=0; j<imatcharr.length; j++) {
                              //   fetch(`http://localhost:3000/getlikes/${imatcharr[j]}`)
                              //   .then((res) => { return res.json(); })
                              //   .then((jlikesj) => {
                              //       if (jlikesj.success === true) {
                              //         console.log('jlikesj', jlikesj);
                              //
                              //         var jlikes = jlikesj['likes'];
                              //         for (var key in jlikes) {
                              //           if (jlikes.hasOwnProperty(key)) {
                              //             console.log('i here', imatcharr[i]);
                              //             if (jlikes[key].likedid === i) {
                              //               jlikesback.push(jlikes[key].likedid);
                              //             }
                              //             if (jlikes[key].likedid === thisuser) {
                              //               jlikesback.push(jlikes[key].likedid);
                              //             }
                              //             if (jlikesback.includes(imatcharr[i]) && jlikesback.includes(thisuser)) {
                              //               console.log('what is it', !finalmatch.includes(imatcharr[i]))
                              //               if (!finalmatch.includes(imatcharr[i])) {
                              //                 finalmatch.push(imatcharr[i]);
                              //               }
                              //               if (finalmatch.includes(j) != true) {
                              //                 finalmatch.push(j);
                              //               }
                              //               if (finalmatch.length >= 2) {
                              //                 console.log('?', finalmatches.includes(finalmatch))
                              //                 var istherealready = finalmatches.indexOf(finalmatch);
                              //                 console.log('istherealready', istherealready);
                              //                 for (var u=0; u<finalmatches.length; u++) {
                              //                   if (finalmatches[u] === finalmatch) {
                              //                   finalmatch = [];
                              //                   console.log('fm', finalmatch)
                              //                   console.log('length', finalmatches.length)
                              //                 // for (var u=0; u<finalmatches.length; u++) {
                              //                   // console.log('fm(u)', finalmatches[u]);
                              //                   // console.log('fm', finalmatch);
                              //                   // if (finalmatches[u] = finalmatch) {
                              //                   //   finalmatch = null;
                              //                   // }
                              //                   }
                              //                 }
                              //                   console.log('fm in else', finalmatch)
                              //                   finalmatches.push(finalmatch);
                              //
                              //
                              //                 console.log('final matches', finalmatches);
                              //               }
                              //
                              //             }
                              //           }
                              //         }
                              //
                              //       } else { console.log('no likes') }
                              //   })
                              //   .catch((err) => { console.log(err); });
                              // }




                            // }
                          // }
                        // }

    //                   } else { console.log('no likes') }
    //               })
    //               .catch((err) => { console.log(err); });
    //             }
    //
    //           // }
    //         }
    //      } else { console.log('no likes') }
    // })
    // .catch((err) => { console.log(err); });
  }
  postMatch(people1, people2, event) {
  fetch(`http://localhost:3000/createupdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        people1: people1,
        people2: people2,
        events: event,
      })
    })
    .then((response) => {
        console.log('RESPONSE', response);
        return response.json();
    })
    .then((responseJson) => {
      console.log('responseJson', responseJson);
      if (responseJson.success === true) {
        console.log('match', responseJson.match);
      } else { console.log('match did not save') }
    })
    .catch((err) => { console.log('it errored', err); });
  }
  getUserLikes(id) {
    fetch(`http://localhost:3000/getlikes/:${id}`)
    .then((res) => res.json())
    .then((resj) => {
        console.log('resj', resj);
        if (resj.success === true) {
            console.log('resj', resj);
            this.setState({ dataSource: ds.cloneWithRows(resj.likes) });
         } else { console.log('no likes') }
    })
    .catch((err) => { console.log(err); });
  }
  produceMatches() {
    // for (all the people A likes) {  DONE
    // 	// check if person likes A back
    //   	if (i likes A) {
    //     		// check all the people i likes
    // 		for (all the people i likes) {
    // 			// check if person i likes likes A  DONE
    // 			if (j likes i & j likes A) {
    // 				if (A likes j) {
    // 					then all three matched
    // 				}
    // 			}
    // 		}
    // 	}
    // }
    // // check for all events A likes
    // for (all events A likes) {
    // 	if (B likes that event) {
    // 		if (C likes that event) {
    // 			event is a match
    // 		}
    // 	}
    // }
  }
  render() {
    return (
        <Background>
        <TopBarNav navigation={this.props.navigation} />
        <View style={styles.container}>
          <ListView
            scrollEnabled={false}
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <View style={{flex: 1, width: 400, borderBottomWidth: 1, borderColor: '#946E6E' }}>
                <Text style={{padding: 40, paddingBottom: 37, fontSize: 16, flex: 1, flexDirection: 'row', margin: 0, color: '#fff'}}>
                  You matched with {rowData.username}!
                </Text>
              </View>
            }
          />
          {/* { this.state.match.map(match => {
            return <View style={{width: 300, height: 100, borderWidth: 1, borderColor: '#fff' }}>
              <Text style={style.profilewords}>HKAKSHKL{match} yaaaa</Text>
            </View>
          }) } */}
          {/* <Text style={styles.profilewords}>
            You, Millie, and Fay want to go to [event name] on [event date] at [event address].
          </Text> */}
          {/* <Text style={styles.textBig}>
            Notifications telling you about new invites from your friends and which friends are going to your events are coming soon.
          </Text> */}
          <BottomBarNav navigation={this.props.navigation} />
        </View>
        </Background>
    );
  }
}

export default UpdateScreen;
