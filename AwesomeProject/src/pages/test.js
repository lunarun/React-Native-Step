import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

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
        this.timeUp()
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

  timeUp = () => {
    this.props.timeupParent && this.props.timeupParent('子组件传回的参数' + '123')
  }
}

export default class Test extends Component<Props> {
  state = {
    time1: 10,
    time2: 5,
    arr: [1,2,3]
  }

  addTime = () => {
    this.countDown.add(10);
  }

  timeupParent = (param, child) => {
    alert('第一个参数：' + param)
    alert('第二个参数：' + child)
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
        <CountDown timer={this.state.time1} />
        {/* <CountDown timer={5} /> */}
        <TouchableOpacity onPress={this.addTime}>
          <Text>延长10秒</Text>
        </TouchableOpacity>
        <CountDown timer={10} ref={countDown => this.countDown = countDown} />
        {
          this.state.arr.map(i => {
            return <CountDown timer={5} key={i} timeupParent={(childParam) => this.timeupParent('父组件用于区分的参数' + i, childParam)}></CountDown>
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  likes: {
    textAlign: 'center'
  }
});
