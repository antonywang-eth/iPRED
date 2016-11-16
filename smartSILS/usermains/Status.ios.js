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
  TouchableOpacity
} from 'react-native';


var Manning014  = require("./rooms/Manning014.ios.js");
var VRroom  = require("./rooms/VRroom.ios.js");

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

const bookHeader={
  0: "You do not have any active booking",
  1: "You have 1 active booking",
}


class Status extends Component {
  constructor(props){
    super(props);
    this.state={
      bookingCount:0,
      dataSource: ds.cloneWithRows([]),
    };
    this.socket= smartSocket;
    this._renderRow = this._renderRow.bind(this);
    this._manning014 = this._manning014.bind(this);
    this._vrRoom = this._vrRoom.bind(this);
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

  _manning014(){
    console.log("aboutSils");
    this.props.navigator.push({
       component: Manning014,
       title: 'Manning 014',
       navigationBarHidden:false
    })
  }

  _vrRoom(){
    console.log("aboutSils");
    this.props.navigator.push({
       component: VRroom,
       title: 'Virtual Reality Room',
       navigationBarHidden:false
    })
  }

  _renderRow(rowData) {
      var roomTitle = rowData.name=="VRroom"? "The Virtual Reality Room\n(Manning 309)":"General Classroom\n(Manning 014)";
      var imageSource = rowData.name=="VRroom"? require('../res/drawable/VRroom.png'):require('../res/drawable/Manning014.png');
	    return (
	    	<TouchableOpacity onPress={() => {
                                          if (rowData.name=="VRroom"){this._vrRoom();}
                                          else {this._manning014();}
                                          }}
                          style={{marginTop:1*ratio}}>
                    <View style={{borderRadius:10,marginLeft:2*ratio,marginRight:2*ratio,backgroundColor:'#7BAFD4',marginBottom:10,width:currWindow.width*0.9}}>
                      <Image style={{borderWidth:1,borderRadius:10,width:currWindow.width*0.9, height:currWindow.width*0.6,resizeMode:'stretch',}} source={imageSource}/>
              	    	<View style={{borderWidth:1, width: currWindow.width*0.9}}>
              	    	  <Text style={{color:'white',fontSize: 9 * ratio}}>{roomTitle}</Text>
              	    	</View>
                      <View/>
          	    	</View>
	    	</TouchableOpacity>
	    )
	}

  render() {
    var title =bookHeader[this.state.bookingCount];

    return (
      <Image style={styles.fitScreenOpacity} source={require('../res/drawable/sils_lib_bkg.jpg')}>
      <ScrollView >
      <View style={styles.container}>
        <StatusBar barStyle="default"/>
        <View style={{ marginTop:20, backgroundColor:'#7BAFD4',borderWidth:2,borderColor:'#7BAFD4',borderRadius:10,}}>
        <Text style={styles.welcome}>
        Booking Status{'\n'}
        <Text style={{fontSize:12}}>
        {title}
        </Text>
        </Text>
        </View>
        <ListView style={{flex:2,flexDirection:'column'}}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              initialListSize={2}/>
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
  welcome: {
    fontSize: 10 * ratio,
    textAlign:'center',
    marginLeft:2*ratio,
    marginRight:2*ratio,
    width:currWindow.width*0.9,
    alignSelf:'center',
    color:'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    marginTop:10,
    marginBottom:10,
    justifyContent: 'center',
    alignItems: 'center',
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
    opacity:0.9,
    width: currWindow.width,
    height: currWindow.height+1,
  },
});

module.exports = Status;
