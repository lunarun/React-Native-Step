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

  state = {
    data: {},
    ready: false,
  }

  // 异步函数
  async componentDidMount() {
    let textData, jsonData;
    const { state } = this.props.navigation;
    const id = state.params.id;
    // const itemId = navigation.getParam('id', 'NO-ID');

    try {
      AsyncStorage.getItem('id', (error, result)=>{
        alert(result);
      });  // 调试中断代码--待调试
      if (!textData) {
        const rawData = await fetch(`${api}/${id}`);
        textData = await rawData.text();
      } 
    } catch (error) {
       // Error retrieving data
       alert(error);
    }
    
    
    // title, summary,
    // "images": {
    //   "small": "http://img3.doubanio.com/view/movie_poster_cover/ipst/public/p494268647.webp",
    //     "large": "http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p494268647.webp",
    //     "medium": "http://img3.doubanio.com/view/movie_poster_cover/spst/public/p494268647.webp"
    // },

    // 反序列化 字符串==》对象
    jsonData = JSON.parse(textData);
    jsonData.image = jsonData.images.large.replace('webp', 'jpg');

    // 序列化： "活的"对象 => "死的"字符串
    // const textData = JSON.stringify(jsonData);
    AsyncStorage.setItem('id', textData);  // AsyncStorage只能存字符串

    this.setState({
      data: jsonData,
      ready: true
    });
  }

  render() {
    const { navigation } = this.props;
    const { data: { title, summary, image }, ready } = this.state;
    const callbackFn = navigation.getParam('callbackFn', {});

    return (
      <View>
        {
          ready ? 
            <View>
              <Image source={{ uri: image }} style={styles.image} />
              <Text>{title}</Text>
              <Text>{summary}</Text>
            </View>
            :
            <ActivityIndicator size="large" style={styles.loading}/>
        }
        <Text onPress={()=> {
          callbackFn('xxxx');
          navigation.goBack();
        }}>返回</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 222,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginTop: 100,
  },
  play: {
    width: 107,
    height: 107,
  }
});