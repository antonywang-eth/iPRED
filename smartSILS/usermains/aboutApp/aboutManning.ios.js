'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Dimensions,
  PixelRatio,
  Image
} from 'react-native';


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


// modify the sorce code by following: waiting for possible newer version https://github.com/airbnb/react-native-maps/pull/680
var MapView = require('react-native-maps');
var currWindow = Dimensions.get('window');

class aboutManning extends Component {
  constructor(props){
    super(props);
    this.state={
      region: {
      latitude: 35.911070,
      longitude: -79.049267,
      latitudeDelta: 0.03,
      longitudeDelta: 0.02,},
    coordinate: new MapView.AnimatedRegion({
    latitude: 35.911232,
    longitude: -79.049310,
    }),
     history: 'Manning Hall, built in 1923, was named for John Hall Manning, a lawyer, congressman and professor. He was also the third leader of the UNC School of Law.',
     manningQuote: "\"Our Alumni have been, are now, and if we do our duty to the University, among the foremost leaders of public opinion and thought in the State and the pioneers of every good work.\"",
    }
  }
  render() {
    return (
      <ScrollView style={{backgroundColor:'#7BAFD4',}}>
      <View style={styles.container}>
        <StatusBar barStyle="default"/>

        <Text style={styles.welcome}>
        Welcome to Manning Hall
        </Text>
        <Text style={styles.instructions}>
        {this.state.history}
        </Text>
        <View style={{marginTop:10,marginBottom:10,borderWidth:1, borderColor:'white',flexDirection: 'row', width: currWindow.width*0.92, alignSelf:'center'}}>
            <Image style={{alignSelf:'flex-start',width:currWindow.width*0.4}} source={require('../../res/drawable/jmanning-headshot.jpg')}/>
          <Text style={{fontStyle:'italic',fontWeight: 'bold',color:'white',justifyContent:'center',alignSelf:'center',marginLeft:currWindow.width*0.05, width:currWindow.width*0.45}}>
          {this.state.manningQuote}
          </Text>
        </View>
        <Text style={styles.instructions}>
        Where is Manning Hall:
        </Text>
        <MapView
        region={this.state.region}
        style={{height: currWindow.width*0.9, width:currWindow.width*0.9, flex:1, alignSelf:'center'}}>
        <MapView.Marker.Animated coordinate={this.state.coordinate} />
        </MapView>


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
  },
  welcome: {
    fontSize: 10 * ratio,
    width:currWindow.width*0.9,
    color:'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    marginTop:10,
    alignSelf:'center',
    marginBottom:10,
  },
  instructions: {
    alignSelf:'flex-start',
    marginLeft:currWindow.width*0.05,
    marginRight:currWindow.width*0.05,
    fontSize: 7 * ratio,
    color:'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    marginTop:5,
    marginBottom:5,
  },
});

module.exports = aboutManning;
