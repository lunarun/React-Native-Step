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

export default class Cinemas extends Component {
  static navigationOptions = {
    title: '影院',
  };
  render() {
    return (
      <View>
        <Text>影院页</Text>
      </View>
    )
  }
}