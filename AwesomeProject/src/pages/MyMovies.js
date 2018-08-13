import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  Linking,
} from 'react-native';

const api = 'https://api.douban.com/v2/movie/subject';

export default class Detail extends Component {
  static navigationOptions = {
    title: '我的电影',
  };
  render() {
    return (
      <View>
        <Text>我的电影</Text>
      </View>
    )
  }
}