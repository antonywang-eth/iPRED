'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  PixelRatio,
  Image,
  Dimensions,
  Linking,
  TouchableHighlight,
  TouchableOpacity,
  AlertIOS,
  Modal,
  DatePickerIOS
} from 'react-native';

var Lightbox = require('react-native-lightbox');

var vrhowto = require("../../res/drawable/vr-howto.png");

import userDefaults from 'react-native-user-defaults';

var RoomCheckIn = require("./RoomCheckIn.ios.js");

var currWindow = Dimensions.get('window');
/*
  PixelRatio.get() === 2
  iPhone 4, 4S
  iPhone 5, 5c, 5s
  iPhone 6 (320 dpi)
  PixelRatio.get() === 3
  iPhone 6 plus  (480 dpi)
*/

if (PixelRatio.get()==2){
  var ratio = 2;
}
else if (PixelRatio.get()==3){
  var ratio = 3;
}

var roomAvailable = "Availibility\n8am-9am: available\n9am-10am: available\n10am-11am: available\n11am-12pm: available\n12pm-1pm: available\n1pm-2pm: available\n2pm-3pm: available\n3pm-4pm: available\n4pm-5pm: available\n5pm-6pm: available\n";

class VRroom extends Component {
  constructor(props){
    super(props);
    this.state={
      oculous:'https://product-guides.oculus.com/en-us/documentation/rift/latest/concepts/book-rug/',
      vive:'http://www.htc.com/managed-assets/shared/desktop/vive/Vive_PRE_User_Guide.pdf',
      ModalVisible:false,
      date: new Date(),
    }
    this._VRCheckIn= this._VRCheckIn.bind(this);
  }

// purple beacon major: 10517, minor:11548
  _VRCheckIn(){
    // Todo: interact with beacon
    console.log("Find VR Room");
    this.props.navigator.push({
       component: RoomCheckIn,
       title: 'Find VR Room',
       navigationBarHidden:false,
       passProps: { roomCheckIn:
                      {"floor":"3rd floor","room":"Virtual Reality Room","major":"10517","minor":"11548"}
                  }
    })
  }

  render() {
    var availabilityForDisplay = this.state.date.getDay()<5? roomAvailable:"Room Not Available on Weekends";
    return (
      <ScrollView >
      <View style={styles.container}>
        <StatusBar barStyle="default"/>

        <Text style={styles.welcome}>
        Location: 3rd Floor
        </Text>
        <Text style={styles.welcome}>
        Capacity: 10 People
        </Text>

       <Text style={styles.welcome}>
       Where is it?
       </Text>
       <Text style={{width:currWindow.width*0.9}}>
       Enter the SILS library and walk to the stair shown in the map below. Climb the stair to the top floor and the VR room is on your right.
       </Text>
       <Lightbox springConfig={{tension: 30, friction: 10}} style={{marginTop:5,opacity:0.85,borderWidth:1,borderColor:'black'}} >
         <Image
           resizeMode="stretch"
           style={{paddingHorizontal: 5,height:currWindow.width*0.9, width:currWindow.width*0.9 , alignSelf:'center'}}
           source={vrhowto}
         />
       </Lightbox>
       <TouchableOpacity onPress={() => this._VRCheckIn()}>
            <View style={styles.loginButtonBox}>
            <Text style ={styles.loginButtonStr}>Find Room</Text>
            </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  this.setState({ModalVisible:true})}>
           <View style={styles.loginButtonBox}>
           <Text style ={styles.loginButtonStr}>Check Availabilty</Text>
           </View>
     </TouchableOpacity>

     <Modal
     animationType={"slide"}
     transparent={false}
     visible={this.state.ModalVisible}
     onRequestClose={() => {this.setState({ModalVisible:false});
                            }}>
                            <View style={{backgroundColor:'white',alignItems:'center',marginTop:30}}>
                            <Text style={{textAlign:'center',fontSize:10*ratio,marginTop:10}}>
                            Select date to check availabilty
                            </Text>
                            <DatePickerIOS
                              date={this.state.date}
                              minimumDate={new Date()}
                              mode="date"
                              style={{flex: 1, width:currWindow.width*0.9}}
                              onDateChange={(selectedDate) =>{this.setState({date:selectedDate})}}/>

                              <Text style={{textAlign:'center',fontSize:8*ratio,marginTop:10}}>
                              {availabilityForDisplay}
                              </Text>


                            <TouchableOpacity onPress={() => this.setState({ModalVisible:false})} >
                                 <View style={styles.loginButtonBox}>
                                 <Text style ={styles.loginButtonStr}>Close</Text>
                                 </View>
                           </TouchableOpacity>
                           </View>
      </Modal>
        <Text style={styles.welcome}>
        Devices Available:
        </Text>
        <Text>
        Oculous Rift
        </Text>
        <TouchableHighlight onPress={()=>{
          AlertIOS.alert(null,'You will be redirected to Oculous Rift User Manual',[
                                                            {text: 'Cancel'},
                                                            {text: 'OK',onPress: () =>Linking.canOpenURL(this.state.oculous)
                                                                                      .then(supported => {
                                                                                        if (supported) {
                                                                                          Linking.openURL(this.state.oculous);
                                                                                          } else {}
                                                                                          })
                                                            }
                                                          ])
      }}>
        <Image source={require('../../res/drawable/oculous-rift.jpg')} style={{borderWidth:1,borderColor:'black',width:currWindow.width*0.6,height:currWindow.height*0.2,resizeMode:'contain', alignSelf:'flex-start'}}/>
        </TouchableHighlight>


        <Text>
        {'\n'}
        HTC Vive
        </Text>
        <TouchableHighlight onPress={()=>{
          AlertIOS.alert(null,'You will be redirected to HTC Vive User Manual',[
                                                            {text: 'Cancel'},
                                                            {text: 'OK',onPress: () =>Linking.canOpenURL(this.state.vive)
                                                                                      .then(supported => {
                                                                                        if (supported) {
                                                                                          Linking.openURL(this.state.vive);
                                                                                          } else {}
                                                                                          })
                                                            }
                                                          ])
      }}>
        <Image source={require('../../res/drawable/htc-vive.jpg')} style={{borderWidth:1,borderColor:'black',width:currWindow.width*0.6,height:currWindow.height*0.2,resizeMode:'contain', alignSelf:'flex-start'}}/>
        </TouchableHighlight>

        <Text>
        {'\n'}
        Please note that this room is monitored by a camera.
        {'\n'}
        </Text>

        <Image source={require('../../res/drawable/securityCamera.png')} style={{width:currWindow.width*0.6,height:currWindow.height*0.2,resizeMode:'contain', alignSelf:'center'}}/>
        <Text>
        {'\n'}{'\n'}
        </Text>
      </View>
      </ScrollView>
    );
  }
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent',
  },
  welcome: {
    fontSize: 10 * ratio,
    width:currWindow.width*0.9,
    color:'black',
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    marginTop:10,
    alignSelf:'center',
    marginBottom:10,
  },
  instructions: {
    alignSelf:'flex-start',
    marginLeft:currWindow.width*0.05,
    marginRight:currWindow.width*0.05,
    fontSize: 8 * ratio,
    color:'black',
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    marginTop:5,
    marginBottom:5,
  },
  loginButtonBox:{
    borderRadius: 10,
    marginTop: 10,
    opacity:0.85,
    width: currWindow.width*0.75,
    height: currWindow.width*0.18,
    backgroundColor:'#7BAFD4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonStr:{
    fontSize: 10 * ratio,
    color:'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    backgroundColor:'transparent',
  },
  });


module.exports = VRroom;
