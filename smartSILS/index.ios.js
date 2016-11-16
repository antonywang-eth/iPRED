'use strict';


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

var login = require('./login.ios.js');

class smartSILS extends Component {
  constructor(props) {
   super(props);
 }
   render() {
      return (
         <NavigatorIOS
           style={{flex: 1}}
           initialRoute={{
             title: 'SmartSILS',
             component: login,
           }}
           interactivePopGestureEnabled ={true}
           shouldUpdate={true}
           navigationBarHidden={true}
           />
       )

   }
}



AppRegistry.registerComponent('smartSILS', () => smartSILS);
