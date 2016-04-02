/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { Component, PropTypes } from 'react-native'
import Jar from './Jar'

const { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } = React
var Button = require( 'react-native-button' )



export default class JarCarousel extends Component {

    constructor({ jars }) {
        super()

        this.handleButtonPress = this.handleButtonPress.bind( this )
    }

    handleButtonPress() {
        console.log( "ORDER MORE" )
    }

    render() {

        const jars = this.props.jars

        if( ! jars.length ) {
            return <Text>No jars provided</Text>
        }

        return (

            <ScrollView
                ref={ scrollView => { this._scrollView = scrollView } }
                contentContainerStyle={ styles.scrollViewContentContainer }
                automaticallyAdjustContentInsets={ false }
                horizontal
                pagingEnabled
                style={ [ styles.scrollView, styles.horizontalScrollView ] }
                showsHorizontalScrollIndicator
            >

                { jars.map( ( j, i ) =>
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
        )
    }
}

JarCarousel.propTypes = {
    jars: PropTypes.arrayOf( PropTypes.object.isRequired ).isRequired
}



let styles = StyleSheet.create({
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
