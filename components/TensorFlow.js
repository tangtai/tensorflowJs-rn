import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as tf from '@tensorflow/tfjs';

export default class TensorFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainedModel: null,
      modelStatus: 'Model not trained',
      predictValues: null
    };
  }

  trainModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

    const xs = tf.tensor2d([[1], [2], [3], [4], [5], [6], [7]], [7, 1]);
    const ys = tf.tensor2d([[1], [3], [5], [7], [9], [11], [13]], [7, 1]);

    async () => model.fit(xs, ys, { epochs: 2000 });
    this.setState({ trainedModel: model, modelStatus: 'Model trained' });
    //const predictValue = model.predict(tf.tensor2d([[6]], [1, 1]));
    //const output = Array.from(predictValue.dataSync());
  }

  predictFuture() {
    const model = this.state.trainedModel;
    if (model) {
      const predictValue_1 = model.predict(tf.tensor2d([[4.5]], [1, 1])).dataSync();
      const predictValue_2 = model.predict(tf.tensor2d([[5.5]], [1, 1])).dataSync();
      const predictValue_3 = model.predict(tf.tensor2d([[6.5]], [1, 1])).dataSync();
      const predictValues = [predictValue_1[0], predictValue_2[0], predictValue_3[0]];
      this.setState({ predictValues: predictValues });
    }
  }

  render() {
    console.log(this.state.predictValues);
    return (
      <View style={styles.container}>
        <View>
          <Text>{this.state.predictValues}</Text>
          <Text>{this.state.modelStatus}</Text>
        </View>
        <Button onPress={this.trainModel.bind(this)} title="Train Staff" />
        <Button onPress={this.predictFuture.bind(this)} title="Predict Future" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});
