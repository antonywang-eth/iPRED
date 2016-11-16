'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  PixelRatio,
  Switch,
  TouchableOpacity
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


var map = {
"Clear":require("../res/drawable/weather/Clear.png"),
"Snow": require("../res/drawable/weather/Snow.png"),
"Extreme" : require("../res/drawable/weather/Extreme.png"),
"Rain" : require("../res/drawable/weather/Rain.png"),
"Clouds" : require("../res/drawable/weather/Clouds.png")
}

var preferenceMenuIcon ={
  false :require('../res/drawable/menu.png'),
  true :require('../res/drawable/cancel.png'),
}

var currWindow = Dimensions.get('window');

class AboutUser extends Component {
  constructor(props){
    super(props);
    var loginData=this.props.data;

    this.state={
      weather:"Clear",
      weatherTitle:"Weather",
      temp:"N/A",
      humidity:"N/A",
      userData:loginData,
      bookCount:0,
      animateLoading:false,
      indicatorHeight:0,
      getNotification:false,
      showEquipInfo:false,
      saveRoomPreference:false,
      receiveNotificationTitle:'Receive notification from beacon when in range.',
      showRoomInfo:'Show lab equipment information when check in.',
      saveRoomPreferenceTitle:'Highlight previously booked rooms when booking.',
      renderPreference:false,
      cascadePreferencePane:false,
      preferenceTitle:' My App Preference',
    }
    this._getWeather = this._getWeather.bind(this);
    this._handleScroll = this._handleScroll.bind(this);
    this._getWeatherPane = this._getWeatherPane.bind(this);
    this._getPreferencePane = this._getPreferencePane.bind(this);
  }
  componentDidMount(){
    this._getWeather(0);

  }

  _handleScroll(event: Object){
      event.preventDefault();
      console.log(event.nativeEvent);
      if(event.nativeEvent.pageY>200*ratio){
      this.setState({indicatorHeight:20});
      this.setState({animateLoading:true});
      this.setState({weatherTitle:'Refreshing Weather...'});
      setTimeout(
      () => { this._getWeather(0);
        this.setState({indicatorHeight:0});
        this.setState({animateLoading:false});},
      1000)
    }
  }

  _getWeather(id){
    var key = ['29abb9d642f2f5126530f09e7498f1ad','0aecd94ecb3d10c4694043aeccc4eb36'];
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=Chapel%20Hill&units=imperial&APPID='+key[id];
   fetch(url,{method: 'GET'})
   .then((response) => response.json())
   .then((responseData) => {
                      if(responseData.cod=="200"){
                        this.setState({weather:responseData.weather[0].main});
                        this.setState({temp:Math.round(responseData.main.temp)});
                        this.setState({humidity:responseData.main.humidity});
                        this.setState({weatherTitle:'Weather'});
                      }
                      else{
                        this._getWeather(1);
                      }
                      })
    .catch((err) => {console.log(err)})
    .done();

}
  _getWeatherPane(){
    return(
    <View style={{marginTop:currWindow.height*0.03}}>

    <View style={styles.weatherPane}>

    <Text style={{marginTop:currWindow.height*0.01, fontSize: 10 * ratio,fontFamily: 'Helvetica Neue',fontWeight: '200',}}>
     {this.state.weatherTitle}
    </Text>
    <Text style={{fontSize:5}}>{'\n'}</Text>
        <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
            <Image source={map[this.state.weather]}style={{width: 85, height: 85 ,tintColor:'grey'}}/>
            <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'stretch',}}>
                <Text style={{fontFamily: 'Helvetica Neue',fontWeight: '100',fontSize:75,color:"grey"}}> {this.state.temp}°F</Text>
                <Image source={require('../res/drawable/weather/thermometer.png')}style={{width: 20, height: 20 }}/>
            </View>
        </View>
        <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'stretch'}}>
        <Text style={{fontFamily: 'Helvetica Neue',fontWeight: '200',fontSize:20,color:"grey"}}>Chapel Hill  {new Date().toLocaleString('en-US', { year: 'numeric', month : 'numeric', day : 'numeric' })} </Text>
        </View>
        <Text style={{fontSize:5}}>{'\n'}</Text>
    </View>
  </View>);
  }

  _getPreferencePane(){
    if(this.state.renderPreference){
    return(
      <View>
        <View style={styles.preferencePane}>
            <Switch
              onValueChange={(value) => this.setState({getNotification: value})}
              style={{alignSelf:'center'}}
              value={this.state.getNotification} />
              <Text style={styles.eachPreference}>{this.state.receiveNotificationTitle}</Text>
      </View>
      <View style={styles.preferencePane}>
          <Switch
            onValueChange={(value) => this.setState({showEquipInfo: value})}
            style={{alignSelf:'center'}}
            value={this.state.showEquipInfo} />
            <Text style={styles.eachPreference}>{this.state.showRoomInfo}</Text>
    </View>
    <View style={styles.preferencePane}>
        <Switch
          onValueChange={(value) => this.setState({saveRoomPreference: value})}
          style={{alignSelf:'center'}}
          value={this.state.saveRoomPreference} />
          <Text style={styles.eachPreference}>{this.state.saveRoomPreferenceTitle}</Text>
  </View>
    </View>

    )
  }
  }

  render() {
    var data= JSON.stringify(this.state.userData);
    return (
      <Image style={styles.fitScreen} source={require('../res/drawable/manning-hall.jpg')}>
      <ScrollView onResponderRelease={this._handleScroll} scrollEventThrottle={1} >
      <View style={styles.container}>
            <View style={{height:this.state.indicatorHeight,marginTop:5,flex:1,justifyContent: 'center',alignSelf:'center',alignItems:'center'}}>
              <ActivityIndicator animating={this.state.animateLoading} size = 'large' color='#7BAFD4'/>
            </View>
            <StatusBar barStyle="default"/>
            <View style={styles.welcomePane}>
                <Text style={styles.welcome}>
                  Hello! {this.state.userData}
                </Text>
                <Text style={styles.bookingCount}>
                You have booked <Text style={{fontWeight:'400'}}>{this.state.bookCount}</Text> labs using this app at Manning Hall so far.
                </Text>
            </View>
      </View>


      <View style={{backgroundColor:'white',marginLeft: currWindow.width*0.075,borderWidth:5,borderColor:'white',borderRadius:10, opacity:0.9,width:currWindow.width*0.85}}>

          <TouchableOpacity  onPress={()=>{this.setState({cascadePreferencePane:!this.state.cascadePreferencePane}); this.setState({renderPreference:!this.state.renderPreference})}}>
          <View style={{flexDirection:'row',}}>
          <Image style={{alignSelf:'center',width:currWindow.width*0.07,height:currWindow.width*0.07,}} source={preferenceMenuIcon[this.state.cascadePreferencePane]}/>
          <Text style={{fontSize: 10 * ratio,fontFamily: 'Helvetica Neue',fontWeight: '200',}}>{this.state.preferenceTitle}</Text>
          </View>
          </TouchableOpacity>

          {this._getPreferencePane()}
      </View>
          {this._getWeatherPane()}

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
  weatherPane:{
    borderRadius:5,
    borderColor:'white',
    width:currWindow.width*0.85,
    alignSelf:'center',
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:0.5,
    opacity:0.9,
  },
  eachPreference:{
    width: currWindow.width*0.65,
    marginLeft: 5,
    fontSize: 6 * ratio,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    justifyContent:"center",
  },
  preferencePane:{
    borderRadius:5,
    marginTop:10,
    borderColor:'white',
    width:currWindow.width*0.8,
    alignSelf:'center',
    alignItems: 'center',
    borderWidth:0.5,
    opacity:0.8,
    flexDirection:'row',
  },
  welcomePane:{
    backgroundColor:'white',
    borderWidth:5,
    borderRadius:10,
    borderColor:'white',
    opacity:0.9,
    width:currWindow.width*0.85,
    marginBottom:currWindow.height*0.03,
    marginTop: currWindow.height*0.04,
  },
  welcome: {
    textAlign: 'center',
    fontSize: 12*ratio,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    marginTop:5,
    marginBottom:5,
  },
  bookingCount: {
    textAlign: 'center',
    fontSize: 8 * ratio,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  fitScreen: {
    marginTop:-1,
    width: currWindow.width,
    height: currWindow.height+1,
  },
});

module.exports = AboutUser;
