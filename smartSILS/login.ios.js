
'use strict';

import React, { Component } from 'react';

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
  Alert
} from 'react-native';

const aboutApp = require('./res/about/about.json');
const backgroundImage = require('./res/drawable/sils_bkg.png');
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

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


class login extends Component {
  constructor(props) {
  super(props);
  this.state={
    username:"",
    password:"",
    falseSwitchIsOn:false,
  }
  this._doLogin = this._doLogin.bind(this);
}

componentWillMount() {
    // Animate creation

  }

  _doLogin(){
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
  }

  render(){
    return (
      <Image style={styles.fitScreen} source={backgroundImage}>
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
