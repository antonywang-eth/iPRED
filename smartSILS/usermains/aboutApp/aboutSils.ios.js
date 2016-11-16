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

var silsLogo = require("../../res/drawable/sils-logo.png");
var Lightbox = require('react-native-lightbox');

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

class aboutSils extends Component {
  constructor(props){
    super(props);
    this.state={
     mission: 'SILS educates innovative and responsible thinkers who will lead the information professions; discovers principles and impacts of information; creates systems, techniques, and policies to advance information processes and services; and advances information creation, access, use, management, and stewardship to improve the quality of life for diverse local, national, and global communities.',
     about: "Located in the heart of the beautiful UNC at Chapel Hill campus, the School of Information and Library Science (SILS) prides itself on providing high quality educational and research opportunities in a dynamic, interdisciplinary learning environment.",
    }
  }
  render() {
    return (
      <ScrollView style={{backgroundColor:'#7BAFD4',}}>
      <View style={styles.container}>
        <StatusBar barStyle="default"/>
        <Lightbox springConfig={{tension: 30, friction: 10}} style={{marginTop:5,opacity:0.85}} >
          <Image
            resizeMode="contain"
            style={{paddingHorizontal: 5,height:currWindow.height*0.2, width:currWindow.width*0.9 , alignSelf:'center'}}
            source={silsLogo}
          />
        </Lightbox>
        <Text style={styles.welcome}>
        About:
        </Text>
        <Text style={styles.instructions}>
        {this.state.about}
        </Text>
        <Text style={styles.welcome}>
        Mission:
        </Text>
        <Text style={styles.instructions}>
        {this.state.mission}
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
  },
  welcome: {
    fontSize: 10 * ratio,
    width:currWindow.width*0.9,
    color:'white',
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
    fontSize: 7 * ratio,
    color:'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    marginTop:5,
    marginBottom:5,
  },
});


module.exports = aboutSils;
