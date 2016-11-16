
'use strict';

import React, { Component} from 'react';

import userDefaults from 'react-native-user-defaults'

import Dimensions from 'Dimensions';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  PixelRatio,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
  AlertIOS,
  DeviceEventEmitter
} from 'react-native';

const smarturl = "ipred.mybluemix.net";
window.navigator.userAgent = "react-native"
const io = require('socket.io-client/socket.io');
const smartSocket  = io(smarturl, {transports: ['websocket'] });

const aboutApp = require('./res/about/about.json');
const backgroundImage = require('./res/drawable/sils_bkg.png');
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

// var Beacons = require('react-native-ibeacon');
// // Define a region which can be identifier + uuid,
// // identifier + uuid + major or identifier + uuid + major + minor
// // (minor and major properties are numbers)
// var region = {
//     identifier: 'Estimotes',
//     uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
// };

var UserMain = require('./UserMain.ios.js');
/*
  PixelRatio.get() === 2
  iPhone 4, 4S
  iPhone 5, 5c, 5s
  iPhone 6 (320 dpi)
  PixelRatio.get() === 3
  iPhone 6 plus  (480 dpi)
*/
if (PixelRatio.get()==2){ var ratio = PixelRatio.get()*0.9;}
else if (PixelRatio.get()==3){ var ratio = PixelRatio.get()*0.7;}
// Beacons.requestWhenInUseAuthorization();
//
// Beacons.startMonitoringForRegion(region);
// Beacons.startRangingBeaconsInRegion(region);
//
// Beacons.startUpdatingLocation();

// Listen for beacon changes
// var subscription = DeviceEventEmitter.addListener(
//   'beaconsDidRange',
//   (data) => {
//     Alert.alert(null,JSON.stringify(data),
//     [{text: 'OK', onPress: () => console.log('OK Pressed')}]);
//     //         onPress: () => {
//     //             if (this.state.username==''){
//     //               this.refs.usernameInput.focus();
//     //             }
//     //             else{
//     //               this.refs.passwordInput.focus();
//     //             }
//     //         }
//     //     }
//     //   ]
//     // data.region - The current region
//     // data.region.identifier
//     // data.region.uuid
//
//     // data.beacons - Array of all beacons inside a region
//     //  in the following structure:
//     //    .uuid
//     //    .major - The major version of a beacon
//     //    .minor - The minor version of a beacon
//     //    .rssi - Signal strength: RSSI value (between -100 and 0)
//     //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
//     //    .accuracy - The accuracy of a beacon
//   }
// );

class login extends Component {
  constructor(props) {
  super(props);
  this.state={
    username:"",
    password:"",
    falseSwitchIsOn:false,
  }
  this._doLogin = this._doLogin.bind(this);
  this.socket = smartSocket;
}

componentWillMount() {
    this.socket.on('onlogin',(data) =>{
      // data format {'username':'data.username','status':'granted'}

      // if login succeed
      if (data.status=='granted'){
        this.props.navigator.replace(
            {title:"Smart SILS",
             component: UserMain,
             passProps: { loginInfo: data.username }
          },
        )
      }
      // if login failed
      else{
        AlertIOS.alert('User not registered',data.username+' is not registered to use the system.',[
                                                          {text: 'OK',onPress:()=>{
                                                            this.setState({username: ""});
                                                            this.setState({password: ""});
                                                          }},
                                                        ])

      }


    }
  )

  //
  this.socket.on('servers',(data) =>{
    //use userdefautls to store server data
    var serverData =JSON.stringify(data);
    userDefaults.set('servers', serverData).then(data => {console.log("Done!")});


  });

    this.socket.on("connect_error"||"connect_failed"||"connect_timeout", (data) =>{
        this.socket.disconnect();
        return(AlertIOS.alert('Connection Error','Server Connection Lost!',[
                                                                              {text: 'Retry',onPress: () =>this.socket.connect()},
                                                                              {text: 'Cancel'},
                                                        ]))
    });

  }

  _doLogin(){
    this.socket.connect();
    if(this.state.username=='' || this.state.password==''){
      Alert.alert(null,'Please enter username and password',
      [
        {text: 'OK',
            onPress: () => {
                if (this.state.username==''){
                  this.refs.usernameInput.focus();
                }
                else{
                  this.refs.passwordInput.focus();
                }
            }
        }
      ]
    )
    }
    else{
      this.socket.emit('login',{'username':this.state.username,'type':'client'});

    }
  }

  render(){
    return (
      <Image style={styles.fitScreen} source={require('./res/drawable/sils_bkg.png')}>
             <View style={styles.container}>
                 <StatusBar barStyle="light-content"/>
                 <View style={styles.titleBox}>
                     <Text style = {styles.title}>
                        {aboutApp.appName}
                     </Text>
                 </View>

                 <View style = {styles.loginBox}>
                              <View style = {styles.usernameBox}>
                                 <Text style ={styles.loginBoxFont}>USERNAME:</Text>
                                 <TextInput
                                   ref='usernameInput'
                                   clearButtonMode = 'while-editing'
                                   placeholder="ENTER YOUR ONYEN ID"
                                   keyboardType="email-address"
                                   autoCapitalize="none"
                                   autoCorrect={false}
                                   onSubmitEditing={(event) => {
                                         this.refs.passwordInput.focus();
                                   }}
                                   style={styles.textInput}
                                     onChangeText={(username) => this.setState({username})}
                                     value={this.state.username}
                                     />

                             </View>
                             <View style = {styles.underLine}/>

                             <View style = {styles.passwordBox}>
                             <Text style ={styles.loginBoxFont}>PASSWORD:</Text>
                             <TextInput
                               ref='passwordInput'
                               clearButtonMode = 'while-editing'
                               placeholder="ENTER PASSWORD"
                               autoCorrect={false}
                               secureTextEntry={true}
                               style={styles.textInput}
                                 onChangeText={(password) => this.setState({password})}
                                 value={this.state.password}
                                 />

                             </View>
                             <View style = {styles.underLine}/>

                             <View style ={styles.switchView}>
                                <Text style ={styles.toolbarTitle}>REMEMBER ME</Text>
                                <Switch
                                  onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                                  style={{marginLeft: 5, alignSelf:'center'}}
                                  value={this.state.falseSwitchIsOn} />
                             </View>
                 </View>

                 <TouchableOpacity onPress={this._doLogin}>
                      <View style={styles.loginButtonBox}>
                      <Text style ={styles.loginButtonStr}>LOGIN</Text>
                      </View>
                </TouchableOpacity>


                 <View style = {styles.aboutApp}>
                 <Text style = {styles.about}>
                    {aboutApp.version}{"\n"}{aboutApp.source}
                 </Text>
             </View>
             </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  fitScreen: {
    marginTop:-1,
    width: width,
    height: height+1,
  },
  loginBox:{
    borderRadius: 10,
    marginTop:10,
    opacity:0.9,
    width: width/1.3,
    height: 80*ratio,
    backgroundColor:'white',
    alignItems: 'center',
  },
  loginButtonBox:{
    borderRadius: 10,
    marginTop: 40,
    opacity:0.9,
    width: width/2.5,
    height: 30*ratio,
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonStr:{
    fontSize: 14 * ratio,
    fontFamily: 'Helvetica Neue',
    fontWeight: '100',
    backgroundColor:'transparent',
  },
  loginBoxFont:{
    fontSize: 7 * ratio,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    backgroundColor:'transparent',
  },
  textInput:{
      marginLeft: 4 * ratio,
      width: 90 * ratio,
      fontSize: 7 * ratio,
      fontFamily: 'Helvetica Neue',
      fontWeight: '200',
      backgroundColor:'transparent',
    },
  title:{
    fontSize:28*ratio,
    color:'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: '100',
    backgroundColor:'transparent',
  },
  aboutApp:{
    position: 'absolute',
    left: 0,
    right: 2,
    bottom: 0,
  },
  titleBox:{
      marginTop:-80*ratio,
      height: 100,
    },
  usernameBox:{
    marginTop:25,
    flexDirection:'row',
  },
  passwordBox:{
    marginTop:10,
    flexDirection:'row',
  },
  underLine: {
      marginTop: 5 * ratio,
      width:width/1.5,
      height:0.5 * ratio,
      backgroundColor:"lightgrey",
      borderRadius: 15,
    },
  about:{
    textAlign:'right',
    fontSize: 4*ratio,
    color:'white',
    backgroundColor:'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchView: {
      flexDirection:'row',
      marginTop:12 * ratio,
      marginLeft:60 * ratio,
    },
  toolbarTitle:{
    marginTop:4 * ratio,
    fontSize: 7 * ratio,
    justifyContent:"center",
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    backgroundColor:'transparent',
  },
});

module.exports = login;
