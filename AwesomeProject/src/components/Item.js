import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';

const {width, height} = Dimensions.get('window');
const thirdWidth = width / 3;
const imageWidth = thirdWidth - 10 * 2
const imageHight = imageWidth / 0.697

export default class Item extends Component<Props> {
  onPress = () => {
    alert('press')
  }

  render() {
    return (
      <View style={styles.root}>
        <Image 
          source={require('../img/poster.jpg')} 
          style={styles.image}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.title} numberOfLines={1}>金刚狼3：殊死一战</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    // margin: 8
    // width: thirdWidth,
  },
  image: {
    width: imageWidth,
    height: imageHight,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  }
})