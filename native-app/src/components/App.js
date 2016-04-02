/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { Component, PropTypes } from 'react-native'
import JarCarousel from './JarCarousel'

const { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } = React


export default class App extends Component {

    constructor() {
        super()

        this.handleOrderMore = this.handleOrderMore.bind( this )
    }

    handleOrderMore() {
        console.log( "ORDER MORE" )
    }

    render() {
        const { data: { jars } } = this.props

        // TODO: Repalce with navigator
        return (
            <View style={ styles.container }>
                <JarCarousel
                    jars={ jars }
                    onOrderMore={ this.handleOrderMore }
                />
            </View>
        )
    }
}

App.propTypes = {
    data: PropTypes.shape({
        jars: PropTypes.array.isRequried
    })
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
