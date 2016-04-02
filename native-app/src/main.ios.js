/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React from 'react'
import { AppRegistry } from 'react-native'
import WebSocketProvider from './components/WebSocketProvider'


const Root = () =>
    <WebSocketProvider />

AppRegistry.registerComponent( 'App', () => Root )
