import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';

const {width, height} = Dimensions.get('window');
const thirdWidth = width / 3;
const imageWidth = thirdWidth - 10 * 2
const imageHight = imageWidth / 0.697

// '35' '40'
const renderStars = (stars) => {
  const total = 5;
  let full, half, empty;
  full = parseInt(stars[0]);
  if (stars[1] === '5') {
    full++;
    half = 0;
    empty = total - full;
  } else {
    half = 1;
    empty = total - full - half;
  }

  const results = [];
  let i;
  for (i = 0; i < full; i++) {
    results.push(
      <Image 
        key={i} 
        style={styles.starts} 
        source={require('../img/star-full.png')}
      />
    );
  }
  if (half) {
    results.push(
      <Image 
        key={i} 
        style={styles.starts} 
        source={require('../img/star-half.png')}
      />
    )
  }
  for (let j = 0; j < empty; j++) {
    results.push(
      <Image 
        key={i + j + 1} 
        style={styles.starts} 
        source={require('../img/star-empty.png')}
      />
    );
  }
  return (
    <View style={styles.starWrapper}>
      {results}
    </View>
  );
}
// 无状态组件 可以把const函数renderStars()写在外面
const Item = (props) => {
  const {title, image, stars, onPress} = props;
  
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Image 
        source={{uri: image}} 
        style={styles.image}
      />
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      {renderStars(stars)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    marginRight: 15,
    width: imageWidth
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
  },
  starts: {
    width: 10,
    height: 10
  },
  starWrapper: {
    flex: 1,
    flexDirection: 'row'
  }
})

export default Item