/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

const names = ['tom', 'jerry', 'kim'];

class GoodMorning extends Component  {
  // 添加默认值
  static defaultProps = {
    name: 'somebody'
  }

  render() {
    return (
      <Text>GoodMorning! {this.props.name}</Text>
    )
  }
} 

class ClickGood extends Component {
  state = {
    likes: 0,
    unlikes: 1
  };
  onPress = () => {
    const { likes } = this.state;
    this.setState({
      likes: likes + 1
    });
  }
  render () {
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Image style={{width: 50, height: 50}} 
            source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
          />
        </TouchableOpacity>
        <Text style={styles.likes}>{this.state.likes}</Text>
        <Text style={styles.likes}>{this.state.unlikes}</Text>
      </View>
    )
  }
}

class CountDown extends Component {
  state = {
    count: this.props.timer
  }

  // 自定义函数
  // renderResult = () => {
  //   const { count } = this.state;
  //   if (count > 0) {
  //     return <Text>{count}</Text>
  //   } else {
  //     return <Text>时间到！</Text>
  //   }
  // }

  componentDidMount() {
    this.timer = setInterval(() => {
      const { count } = this.state;
      if (count === 0) {
        return clearInterval(this.timer);
      }
      this.setState({
        count: count - 1,
      })
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }
  
  render() {
    const { count } = this.state
    return (
      <View>{count > 0 ? <Text>{count}</Text> : <Text>时间到！</Text>}</View>
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      count: nextProps.timer
    })
  }

  add = (time) => {
    this.setState({
      count: this.state.count + time
    })
  }
}

export default class App extends Component<Props> {
  state = {
    time1: 10,
    time2: 5
  }

  addTime = () => {
    this.countDown.add(10);
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        time1: 15
      })
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <ClickGood />
        {
          names.map((name, index) => {
            return (<GoodMorning key={index} name={name} />)
          })
        }
        <GoodMorning name="luna" />
        {/* <CountDown timer={this.state.time1} />
        <CountDown timer={5} /> */}
        <TouchableOpacity onPress={this.addTime}>
          <Text>延长10秒</Text>
        </TouchableOpacity>
        <CountDown timer={10} ref={countDown => this.countDown = countDown} />
        {/* <Text style={styles.welcome}>Welcome to React Native By Luna</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  likes: {
    textAlign: 'center'
  }
});
