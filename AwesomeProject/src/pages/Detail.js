import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
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
        alert('成功获取本地缓存');
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

    this.fetchVideo(jsonData.mobile_url);
  }

  fetchVideo = async (mobile_url) => {
    let pageHtml = await fetch(mobile_url);
    pageHtml = await pageHtml.text();
    const regex = /href="([\w|\W]*\.mp4)"/;
    const result = pageHtml.match(regex);
    if (result && result[1]) {
      const videoUri = result[1];
      this.setState({
        videoUri
      })
    }
  }

  playVideo = () => {
    const { videoUri } = this.state;
    if (videoUri) {
      alert('Linking');
      Linking.canOpenURL(videoUri).then(supported => {
        if (!supported) {
          alert('Can\'t handle url: ' + videoUri);
        } else {
          return Linking.openURL(videoUri);
        }
      }).catch(err => console.error('An error occurred', err));
    } else {
      alert("正在获取预告片地址，请稍后重试");
    }
  };

  render() {
    const { navigation } = this.props;
    const { data: { title, summary, image }, ready } = this.state;
    const callbackFn = navigation.getParam('callbackFn', {});

    return (
      <View>
        {
          ready ? 
            <View>
              <TouchableOpacity onPress={this.playVideo}>
                <ImageBackground  source={{ uri: image }} style={styles.image} >
                  <Image source={require('../img/play-icon.png')} style={styles.play} />
                </ImageBackground>
              </TouchableOpacity>
              
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
    overflow: 'visible'
  },
  loading: {
    marginTop: 100,
  },
  play: {
    width: 107,
    height: 107,
    position: 'absolute',
    bottom: -50,
    right: -50,
  }
});