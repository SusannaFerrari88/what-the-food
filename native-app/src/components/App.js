/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { Component, PropTypes } from 'react-native'
import Jar from './Jar'

const { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } = React
var Button = require( 'react-native-button' )


export default class App extends Component {

    constructor() {
        super()

        this.handleButtonPress = this.handleButtonPress.bind( this )

        this.state = {
            jars: [ {
                fillAmount: Math.random(),
                food      : 'banana'
            }, {
                fillAmount: Math.random(),
                food      : 'pasta'
            }
        ] }
    }

    componentDidMount() {

        const testing = true
        const fn = testing ? mock : setupWebSocket

        fn( this.setState.bind( this ) )

    }

    handleButtonPress() {
        console.log( "ORDER MORE" )
    }

    render() {
        return (
            <View style={ styles.container }>

                <ScrollView
                    ref={ scrollView => { this._scrollView = scrollView } }
                    contentContainerStyle={ styles.scrollViewContentContainer }
                    automaticallyAdjustContentInsets={ false }
                    horizontal
                    pagingEnabled
                    style={ [ styles.scrollView, styles.horizontalScrollView ] }
                    showsHorizontalScrollIndicator
                >

                    { this.state.jars.map( ( j, i ) =>
                        <View key={ i } style={ styles.scrollviewPage }>

                            <Text style={ styles.foodLabel }>
                                { j.food }
                            </Text>

                            <Jar fillAmount={ j.fillAmount }/>

                            <Button
                                style={ styles.button }
                                onPress={ this.handleButtonPress }
                            >
                                Order more
                            </Button>

                        </View>
                    ) }

                </ScrollView>

            </View>
        )
    }
}


function setupWebSocket( setState ) {
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
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        top: 20
    },
    scrollViewContentContainer: {
        width: 640
    },
    foodLabel: {
        fontSize: 40
    },
    scrollviewPage: {
        width: 320,
        alignItems: 'center'
    },
    scrollView: {
        width: 320,
        height: 300,
        top: 100
    },
    button: {
        top: 30,
        color: '#000'
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
