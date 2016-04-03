import React from 'react'
import { AppRegistry } from 'react-native'
import WebSocketProvider from './components/WebSocketProvider'
import App from './components/App'


const Root = () =>
    <WebSocketProvider>
        <App />
    </WebSocketProvider>


AppRegistry.registerComponent( 'App', () => Root )
