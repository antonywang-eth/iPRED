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
  Image,
  Linking,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

var manning = require("../../res/drawable/manninghall.jpg");
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

class contactSils extends Component {
  constructor(props){
    super(props);
    this.state={
      content:"If you have any questions, suggestions, or comments, please send us a message. If you prefer, you can call us or email us. For anonymous feedback, please send us feedback by clicking the \"SEND FEEDBACK\" button below.",
      feedbackLink:"https://sils.unc.edu/it-services/contact",
      phone:"Phone: (919) 962-8188",
      emailURL:"mailto:silshelp@unc.edu?subject=About Smart SILS",
    }
  }
  render() {
    return (
      <ScrollView style={{backgroundColor:'#7BAFD4',}}>
      <View style={styles.container}>
        <StatusBar barStyle="default"/>
        <Lightbox springConfig={{tension: 30, friction: 10}} style={{marginTop:10,}} >
          <Image
            resizeMode="contain"
            style={{paddingHorizontal: 5,height:currWindow.height*0.2, width:currWindow.width*0.9 , alignSelf:'center'}}
            source={manning}
          />
        </Lightbox>
        <Text style={styles.welcome}>
        Contact Us:
        </Text>
        <Text style={styles.instructions}>
        {this.state.content}
        </Text>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#a5a5a5"
          onPress={()=>{
            AlertIOS.alert(null,'An email will be sent to silshelp@unc.edu',[
                                                              {text: 'Cancel'},
                                                              {text: 'OK',onPress: () =>Linking.canOpenURL(this.state.emailURL)
                                                                                        .then(supported => {
                                                                                          if (supported) {
                                                                                            Linking.openURL(this.state.emailURL);
                                                                                            } else {}
                                                                                            })
                                                              }
                                                            ])
        }}>
          <Text style={styles.buttonContent}>EMAIL US</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#a5a5a5"
            onPress={()=>{
              AlertIOS.alert(null,'You will be redirected to SILS website to submit your feedback',[
                                                                {text: 'Cancel'},
                                                                {text: 'OK',onPress: () =>Linking.canOpenURL(this.state.feedbackLink)
                                                                                          .then(supported => {
                                                                                            if (supported) {
                                                                                              Linking.openURL(this.state.feedbackLink);
                                                                                              } else {}
                                                                                              })
                                                                }
                                                              ])
          }}>
            <Text style={styles.buttonContent}>SEND FEEDBACK</Text>
            </TouchableHighlight>
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
  button:{
    height: currWindow.height*0.1,
    width: currWindow.width*0.5,
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10 * ratio,
    justifyContent: 'center'
  },
  buttonContent:{
    alignSelf:'center',
    marginLeft:currWindow.width*0.05,
    marginRight:currWindow.width*0.05,
    fontSize: 8 * ratio,
    color:'#7BAFD4',
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    marginTop:5,
    marginBottom:5,
  }
});


module.exports = contactSils;
