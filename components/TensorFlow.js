import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as tf from '@tensorflow/tfjs';

export default class TensorFlow extends Component {
  componentWillMount() {
    console.log('Tf');
  }
  render() {
    return <View />;
  }
}
