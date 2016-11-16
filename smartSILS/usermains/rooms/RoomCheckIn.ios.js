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
  DeviceEventEmitter,
  ActivityIndicator
} from 'react-native';


var beaconEmitter;
var Lightbox = require('react-native-lightbox');

import userDefaults from 'react-native-user-defaults';

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

var Beacons = require('react-native-ibeacon');
// Define a region which can be identifier + uuid,
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
var region = {
    identifier: 'Estimotes',
    uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
};
Beacons.requestWhenInUseAuthorization();

Beacons.startMonitoringForRegion(region);
Beacons.startRangingBeaconsInRegion(region);

Beacons.startUpdatingLocation();

// Listen for beacon changes


class RoomCheckIn extends Component {
  constructor(props){
    super(props);
    this.state={
      data:this.props.roomCheckIn,
      proximity:"Not in range",
      reached:false,
      major: this.props.roomCheckIn.major,
      minor: this.props.roomCheckIn.minor,
      animating:true
    }
    this._doCheckIn = this._doCheckIn.bind(this);
    // The beacon emitter takes the major and minor info and listen to beacon event,
    //   when reached the destination, remove the emitter because the task is over.

  }
  componentDidMount(){
    beaconEmitter = DeviceEventEmitter.addListener(
        'beaconsDidRange',
        (data) => {
          for (var i=0;i<data.beacons.length;i++){
            if (data.beacons[i].major == this.state.major && data.beacons[i].minor == this.state.minor){
                this.setState({proximity:data.beacons[i].proximity});
                if (data.beacons[i].proximity=='immediate'){
                  AlertIOS.alert(null,'You have arrived!',[{text: 'OK'},]);
                  this.setState({reached:true});
                  this.setState({animating:false});
                  beaconEmitter.remove();
                }
            }
          }

        }
      );
  }

  _doCheckIn(){
    // TODO: do check in, check this.state.reached ==true
    return (
      AlertIOS.alert("CHECK IN COMPLETE",'You can use the room in the next 2 hours!',[{text: 'OK'},])
    )
  }

  render() {
    return (
      <ScrollView >
      <View style={styles.container}>
        <StatusBar barStyle="default"/>

        <Text style={styles.welcome}>
        Target:{'\n'}{this.state.data.room} on the {this.state.data.floor}.
        </Text>
        <Text style={styles.welcome}>
        Proximity:
        </Text>
        <View style={{flexDirection: 'row', marginTop:-10, width:currWindow.width*0.9,}}>

        <Text style={{  fontSize: 10 * ratio,fontFamily: 'Helvetica Neue',fontWeight: '400',marginRight:10}}>
        {this.state.proximity}
        </Text>
        <ActivityIndicator
        animating={this.state.animating}
        size="small"

        />
        </View>
        <Lightbox springConfig={{tension: 30, friction: 10}} style={{marginTop:5,opacity:0.85,borderWidth:1,borderColor:'black'}} >
           <Image
             resizeMode="stretch"
             style={{paddingHorizontal: 5,height:currWindow.width*0.9, width:currWindow.width*0.9 , alignSelf:'center'}}
             source={this.state.data.room=="Virtual Reality Room"? require("../../res/drawable/vr-howto.png"):require("../../res/drawable/14-howto.png")}
           />
       </Lightbox>
       <TouchableOpacity onPress={() => this._doCheckIn()}>
            <View style={styles.loginButtonBox}>
            <Text style ={styles.loginButtonStr}>Check In</Text>
            </View>
      </TouchableOpacity>
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


module.exports = RoomCheckIn;
