import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, ActivityIndicator} from 'react-native';
import Item from '../components/Item';

// import movies from './movies.json';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const api = "https://api.douban.com/v2/movie/in_theaters";

export default class List extends Component {
  static navigationOptions = {
    title: '上映',
    header: null
  };
  state = {
    movies: [], //movies.subjectws
    refreshing: false,
    ready: false,
    childState: ''
  }
  refreshing = false;
  start = 0;  // 分页page
  count = 15; 
  fetchData = (start = 0, count = 15) => {
    if (this.refreshing) return;
    this.setState({
      refreshing: true
    })
    this.refreshing = true;
    return fetch(`${api}?start=${start}&count=${count}`)
      .then(response => response.text())  // json 改成 text，拿到纯文本，先不解析成json。（如果用json(),必须是合法的json, 如果返回的数据如果有一个符号等地方错误导致返回的不是json，就会进入到catch里面报错）
      .then(responseText => {
        const json = JSON.parse(responseText);
        this.setState({
          // movies: json.subjects,
          refreshing: false
        });
        this.refreshing = false;
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  }

  freshData = () => {
    this.start = 0;
    this.fetchData().then(json => {
      this.start += this.count;
      this.setState({
        movies: json.subjects,
      })
    })
  };

  fetchMore = async () => {
    const json = await this.fetchData(this.start, this.count);
    if (json) {
      this.start += this.count;
      this.setState({
        movies: this.state.movies.concat(json.subjects)
      });
    }
  };

  async componentDidMount () {
    await this.fetchMore();
    this.setState({
      ready: true,
    })
  }

  render() {
    const { movies, refreshing, ready, childState } = this.state
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>子组件传回来的数据{childState}</Text>
        {
          ready ? 
            <FlatList
              style={styles.row}
              numColumns={3}
              keyExtractor={item => item.id}
              data={movies}
              onRefresh={this.freshData}
              refreshing={refreshing}
              onEndReached={() => this.fetchMore()}
              onEndReachedThreshold={0.1}
              ListFooterComponent={() => {
                return refreshing && 
                <ActivityIndicator size="small"/>
              }}
              renderItem={({item}) => {
                return (<Item 
                  title={item.title} 
                  image={item.images.medium} 
                  stars={item.rating.stars}
                  onPress={() => navigate('Detail', {
                    id: item.id,
                    callbackFn: (data) => {
                      this.setState({
                        childState: data
                      })
                    }
                  })}
                />)
              }
              }
            />
            :
            <ActivityIndicator size="large" style={styles.loading} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    // justifyContent: 'space-between',
    // paddingHorizontal: 15,
    marginLeft: 15
  },
  loading: {
    marginTop: 100,
  }
});
