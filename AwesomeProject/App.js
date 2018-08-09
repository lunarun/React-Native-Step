/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList} from 'react-native';
import Item from './src/components/Item';

import movies from './movies.json';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class App extends Component {
  render() {
    return (
      <View>
        <FlatList 
          numColumns={3}
          columnWrapperStyle={styles.row}
          keyExtractor={item => item.id}
          data={movies.subjects}
          renderItem={({item}) => <Item title={item.title} image={item.images.medium}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
})