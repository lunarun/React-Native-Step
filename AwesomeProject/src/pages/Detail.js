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
    title: '详情页',
  };
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('id', 'NO-ID');
    const callbackFn = navigation.getParam('callbackFn', {});

    return (
      <View>
        <Text>详情页</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text onPress={()=> {
          callbackFn('xxxx');
          navigation.goBack();
        }}>返回</Text>
      </View>
    )
  }
}