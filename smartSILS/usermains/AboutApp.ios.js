'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  PixelRatio,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';


var currWindow = Dimensions.get('window');


var silsLogo = require("../res/drawable/sils-logo.png");
var Lightbox = require('react-native-lightbox');

var aboutManning = require("./aboutApp/aboutManning.ios.js");
var aboutSils = require("./aboutApp/aboutSils.ios.js");
var contactSils = require("./aboutApp/contactSils.ios.js");

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

class AboutApp extends Component {
  constructor(props){
    super(props);
    var loginData=this.props.data;
    this.state={
      userData:loginData,
      animateLoading:false,
      indicatorHeight:0
    }
    this._handleScroll = this._handleScroll.bind(this);
    this._aboutManning = this._aboutManning.bind(this);
    this._aboutSils = this._aboutSils.bind(this);
    this._doContact = this._doContact.bind(this);
  }

  // handle scroll action of the scrollview
  _handleScroll(event: Object){
    if(event.nativeEvent.pageY>200*ratio){
      event.preventDefault();
      this.setState({indicatorHeight:20});
      this.setState({animateLoading:true});
      setTimeout(
      () => {
        this.setState({indicatorHeight:0});
        this.setState({animateLoading:false});},
      1000)
    }
  }

  _aboutSils(){
    console.log("aboutSils");
    this.props.navigator.push({
       component: aboutSils,
       title: 'About SILS',
       navigationBarHidden:false
   })
  }

  _aboutManning(){
    console.log("aboutManning");
      this.props.navigator.push({
         component: aboutManning,
         title: 'About Manning Hall',
         navigationBarHidden:false
     })
  }

  _doContact(){
    console.log("Contact");
    this.props.navigator.push({
       component: contactSils,
       title: 'Contact Us',
       navigationBarHidden:false
   })
  }

  render() {
    return (
      <Image style={styles.fitScreen} source={require('../res/drawable/sils-white-bkg.jpeg')}>
      <ScrollView onResponderRelease={this._handleScroll} scrollEventThrottle={1} >
      <View style={styles.container}>
      <View style={{height:this.state.indicatorHeight,marginTop:5,flex:1,justifyContent: 'center',alignSelf:'center',alignItems:'center'}}>
      <ActivityIndicator animating={this.state.animateLoading} size = 'large' color='#7BAFD4'/>
      </View>
      <StatusBar barStyle="default"/>
      <Lightbox springConfig={{tension: 30, friction: 10}} style={{marginTop:5,opacity:0.85}} >
        <Image
          resizeMode="contain"
          style={{paddingHorizontal: 5,height:currWindow.height*0.2, width:currWindow.width*0.9 , alignSelf:'center'}}
          source={silsLogo}
        />
      </Lightbox>

      <View style={{width:currWindow.width*0.8,justifyContent: 'center',alignSelf:'center',alignItems: 'center'}}>
                  <TouchableOpacity onPress={()=>this._aboutManning()}>
                       <View style={styles.loginButtonBox}>
                       <Text style ={styles.loginButtonStr}>ABOUT MANNING HALL</Text>
                       </View>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => this._aboutSils()}>
                      <View style={styles.loginButtonBox}>
                      <Text style ={styles.loginButtonStr}>ABOUT SILS</Text>
                      </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._doContact}>
                     <View style={styles.loginButtonBox}>
                     <Text style ={styles.loginButtonStr}>CONTACT US</Text>
                     </View>
               </TouchableOpacity>
        <Text style={{fontFamily: 'Helvetica Neue',fontWeight: '300',fontSize:14, marginTop:10, backgroundColor:'white',opacity:0.85, padding:6}}>
        Thank you for using this app to interact with Manning Hall, home of the School of Information and Library Science, UNC Chapel Hill, One of the top-ranked schools of library and information studies in the world.
        </Text>
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
  },
  fitScreen: {
    marginTop:-1,
    width: currWindow.width,
    height: currWindow.height+1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
    fontSize: 8 * ratio,
    color:'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    backgroundColor:'transparent',
  },
});

module.exports = AboutApp;
