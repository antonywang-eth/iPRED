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
  AlertIOS,
  ListView,
  TouchableOpacity,
  Picker,
  DatePickerIOS
} from 'react-native';


var Manning014  = require("./rooms/Manning014.ios.js");
var VRroom  = require("./rooms/VRroom.ios.js");
var monthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const smarturl = "ipred.mybluemix.net";

window.navigator.userAgent = "react-native"

const io = require('socket.io-client/socket.io');

const smartSocket  = io(smarturl, {transports: ['websocket'] });

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

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});


class Booking extends Component {
  constructor(props){
    super(props);
    this.state={
      bookingCount:0,
      dataSource: ds.cloneWithRows([]),
      language:'none',
      date:new Date(),
      roomBooking:"Room 309 (VR)",
    };
    this.socket= smartSocket;
    this._bookRoom=this._bookRoom.bind(this);
    this._confirmBooking= this._confirmBooking.bind(this);
  }

  componentWillMount(){
    userDefaults.get('servers')
     .then(data =>{
      var allRooms = [];
      allRooms.push(JSON.parse(data).servers.VRroom);
      allRooms.push(JSON.parse(data).servers.Manning14);
      console.log(allRooms);
      this.setState({dataSource: ds.cloneWithRows(allRooms)});
       })
     .catch(error =>{
       console.log("DATA ERROR: " + error);
       return (
       AlertIOS.alert(null,"All smart Rooms are offline.",[{text: 'OK'}])
     )});
  }

  _confirmBooking(){
    //TODO: contact server
    return (
      AlertIOS.alert(null,"Booking Confirmed",[{text: 'Done'}])
    )
  }

  _bookRoom(){
    var dateString = this.state.date.getDate()+"/"+monthArray[this.state.date.getMonth()]+"/"+this.state.date.getFullYear();
    var timeString = this.state.date.getMinutes()==0? this.state.date.getHours()+" : "+this.state.date.getMinutes()+this.state.date.getMinutes():this.state.date.getHours()+" : "+this.state.date.getMinutes();
    var endHour = parseInt(this.state.date.getHours())+2;
    var endingString =this.state.date.getMinutes()==0? endHour+" : "+this.state.date.getMinutes()+this.state.date.getMinutes():endHour+" : "+this.state.date.getMinutes();
    var combinedString = "ROOM: "+this.state.roomBooking+"\nDATE: "+dateString+"\nFROM: "+timeString+"\nTO: "+endingString;
    AlertIOS.alert("Booking Confirmation",combinedString,[{text: 'Cancel'},
                                                          {text: 'OK',onPress: () =>{this._confirmBooking()}}
    ])
  }

  render() {
    var dateString = this.state.date.getDate()+"/"+monthArray[this.state.date.getMonth()]+"/"+this.state.date.getFullYear();
    var timeString = this.state.date.getMinutes()==0? this.state.date.getHours()+" : "+this.state.date.getMinutes()+this.state.date.getMinutes():this.state.date.getHours()+" : "+this.state.date.getMinutes();
      return (
      <Image style={styles.fitScreenOpacity} source={require('../res/drawable/silslib.jpg')}>
      <ScrollView >
      <View style={styles.container}>
        <StatusBar barStyle="default"/>

        <Text style={styles.welcome}>
        Reserve the room
        </Text>
        <View style={{ marginTop:20, backgroundColor:'#7BAFD4',borderWidth:2,borderColor:'#7BAFD4',borderRadius:10,}}>
              <Text style ={styles.reservStats}>
              ROOM: {this.state.roomBooking}{'\n'}
              DATE: {dateString} {'\n'}
              FROM: {timeString} {'\n'}You may use the room for up to 2 hours)
              </Text>
        </View>
        <TouchableOpacity onPress={() => this._bookRoom()}>
             <View style={styles.loginButtonBox}>
             <Text style ={styles.loginButtonStr}>Book Room</Text>
             </View>
       </TouchableOpacity>
        <View style={{ marginTop:20, backgroundColor:'#7BAFD4',borderWidth:2,borderColor:'#7BAFD4',borderRadius:10,}}>
        <Text style ={styles.reservStats}>
        Select Time:
        </Text>
        <DatePickerIOS
          style={styles.picker}
          date={this.state.date}
          mode="datetime"
          minuteInterval={30}
          minimumDate={new Date()}
          onDateChange={(selectedDate) =>{this.setState({date:selectedDate})}}/>
        <Text style ={styles.reservStats}>
        Select Room:
        </Text>
        <Text style={{marginLeft:2*ratio,color:'white', fontSize:6*ratio}}>
        For room availabilty information, go to the status page
        </Text>
        <Picker
          style={{width: currWindow.width*0.9,marginTop:-50}}
          selectedValue={this.state.roomBooking}
          onValueChange={(room) => this.setState({roomBooking: room})}>
          <Picker.Item label="Room 309 (VR)" value="Room 309 (VR)" />
          <Picker.Item label="Room 014 (General)" value="Room 014 (General)" />
          </Picker>
        </View>
      </View>
      </ScrollView>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent',
    alignSelf:'center',
  },
  reservStats:{
    fontSize: 10 * ratio,
    textAlign:'left',
    opacity:0.9,
    marginLeft:2*ratio,
    marginRight:2*ratio,
    width:currWindow.width*0.9,
    color:'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
  },
  welcome: {
    fontSize: 14 * ratio,
    textAlign:'center',
    marginLeft:2*ratio,
    marginRight:2*ratio,
    width:currWindow.width*0.9,
    color:'black',
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    marginTop:10,
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
  fitScreenOpacity: {
    marginTop:-1,
    width: currWindow.width,
    height: currWindow.height+1,
  },
  picker: {
  width: currWindow.width*0.9,
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

module.exports = Booking;
