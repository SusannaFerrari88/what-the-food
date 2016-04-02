/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { Component, PropTypes } from 'react-native'
import JarCarousel from './JarCarousel'

const { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } = React
var Button = require( 'react-native-button' )

const TESTING = true


export default class App extends Component {

    constructor() {
        super()

        this.handleButtonPress = this.handleButtonPress.bind( this )

        this.state = {
            jars: [] 
        }
    }

    componentDidMount() {

        const fn = TESTING ? mock : setupWebSocket

        fn( this.setState.bind( this ) )

    }

    handleButtonPress() {
        console.log( "ORDER MORE" )
    }

    render() {

        const jars = this.state.jars
        
        return (
            <View style={ styles.container }>
                <JarCarousel jars={ this.state.jars } />
            </View>
        )
    }
}


function setupWebSocket( setState ) {
    console.log(" setup web socket")
    // return
    var ws = new WebSocket( 'ws://192.168.77.134:1337' )

    ws.onopen = () => {
        // connection opened
        // ws.send( 'Hey I\'m the end user' );
    }

    ws.onmessage = ( e ) => {
        // a message was received
        //
        try {
            console.log( e, typeof e )
            const payload = JSON.parse( e )
            console.log( "received", payload )
        } catch ( e ) {
            console.log( "error parsing message" )
            console.log( e )
        }

    // this.setState({ fillAmount: payload.data.text})
    }

    ws.onerror = ( e ) => {
        console.log( "onerror", e.message )
    }

    ws.onclose = ( e ) => {
        console.log( "onclose", e.code, e.reason )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function mock( setState ) {
    setState({ jars: [ {
        fillAmount: Math.random(),
        food      : 'banana'
    }, {
        fillAmount: Math.random(),
        food      : 'pasta'
    } ] })

    setTimeout( mock, 500, setState )
}
