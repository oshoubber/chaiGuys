/**
 * ChaiGuys Georgetown React Native App
 * @author Zain Rehmani
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ChaiMenuTable = require('./ChaiMenuTable');

/* Root Class */
export default class ChaiGuys extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Chai Guys
        </Text>
        <Text style={styles.instructions}>
          @ Georgetown University
        </Text>
        <ChaiMenuTable />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcome: {
    fontSize: 48,
    fontStyle: 'italic',
    marginTop: 64,
    textAlign: 'center',
  },
  instructions: {
    color: '#333333',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('ChaiGuys', () => ChaiGuys);
