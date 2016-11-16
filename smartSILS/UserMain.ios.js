'use strict';
var AboutApp = require('./usermains/AboutApp.ios.js');
var AboutUser = require('./usermains/AboutUser.ios.js');
var Status = require('./usermains/Status.ios.js');
var Booking = require('./usermains/Booking.ios.js');

import React, { Component } from 'react';

import {
  AppRegistry,
  TabBarIOS,
} from 'react-native';



class UserMain extends Component{
  constructor(props){
    super(props);
    var loginData = (this.props.loginInfo==null)? "null":this.props.loginInfo;
	    this.state = {
    loginInfo: loginData,
    selectedTab:'AboutUser',
  };

}

render(){
  return (
    <TabBarIOS selectedTab = {this.state.selectedTab} tintColor = "black" barTintColor = "#7BAFD4">

        <TabBarIOS.Item
          selected = {this.state.selectedTab ==='AboutUser'}
          icon={require('./res/drawable/avatar.png')}
          title='PROFILE'
          onPress={() => {
              this.setState({
                  selectedTab: 'AboutUser',
              });
          }}>
            <AboutUser data ={this.state.loginInfo} navigator={this.props.navigator}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          selected = {this.state.selectedTab ==='Status'}
          icon={require('./res/drawable/house.png')}
          title='STATUS'
          onPress={() => {
              this.setState({
                  selectedTab: 'Status',
              });
          }}>
            <Status data ={this.state.loginInfo} navigator={this.props.navigator}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          selected = {this.state.selectedTab ==='Booking'}
          icon={require('./res/drawable/placeholder.png')}
          title='BOOKING'
          onPress={() => {
              this.setState({
                  selectedTab: 'Booking',
              });
          }}>
            <Booking data ={this.state.loginInfo} navigator={this.props.navigator}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          selected = {this.state.selectedTab ==='AboutApp'}
          icon={require('./res/drawable/star.png')}
          title='ABOUT'
          onPress={() => {
              this.setState({
                  selectedTab: 'AboutApp',
              });
          }}>
            <AboutApp data ={this.state.loginInfo} navigator={this.props.navigator}/>
        </TabBarIOS.Item>
        </TabBarIOS>
  );
}



}

module.exports = UserMain;
