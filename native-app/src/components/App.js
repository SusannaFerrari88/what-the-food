/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { Component, PropTypes } from 'react-native'
import Jar from './Jar'

const {
  Platform,
  StyleSheet,
  Text,
  View
} = React

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      fillAmount: 0
    }
  }

  componentDidMount() {
    var ws = new WebSocket('ws://192.168.77.134:1337')

    ws.onopen = () => {
      // connection opened
      ws.send( 'Hey I\'m the end user' );
    };

    ws.onmessage = (e) => {
      // a message was received
      const payload = JSON.parse( e.data )
      console.log("received",payload.data.text);
      this.setState({ fillAmount: payload.data.text})
    };

    ws.onerror = (e) => {
      // an error occurred
      console.log("onerror", e.message);
    };

    ws.onclose = (e) => {
      console.log("onclose", e.code, e.reason);
    };
  }

  render() {
    return (
      <View style={ styles.container }>
        <Jar fillAmount={ this.state.fillAmount }/>
      </View>
    )
  }
}


let styles = StyleSheet.create({
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
})
