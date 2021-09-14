import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import Weather from "./Weather";


const API_KEY = "c870f23d31f768a39765bb0ec06e9603";

export default class extends React.Component{
  state = {
    isLoading : true,
  };
  getWeather = async(latitude, longitude) => {
   const {data} = await axios.get(
     `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
     ); 
     this.setState({isLoading:false, temp: data.main.temp})
     //console.log(data);
 };
  getLocation = async() => {
    try{
      //throw Error();
      await Location.requestForegroundPermissionsAsync();
      const {coords : {latitude, longitude}
    } = await Location.getCurrentPositionAsync();
    this.getWeather(latitude, longitude);
    this.setState({isLoading : false});
      // Send to API and get weather!

    }catch(error){
      Alert.alert("Can't find your position. ","Please Check again");
    }
    
  };
  componentDidMount(){
    this.getLocation();
  }
  render() {
    const {isLoading,temp} = this.state;
    return isLoading ? <Loading /> :<Weather temp = {Math.round(temp)}/>;
  }
}