import React, { Component, PropTypes } from 'react-native'
const { StyleSheet, View, Text, } = React
import Button from 'react-native-button'
import Jar from './Jar'
import { VIEW_WIDTH } from '../config'

export default function JarCard({ jar, onOrderMore }){

    return (
        <View style={ styles.scrollviewPage }>

            <Text style={ styles.foodLabel }>
                { jar.food }
            </Text>

            <Jar
                style={ styles.jar }
                fillAmount={ jar.fillAmount }
            />

            <Button
                style={ styles.button }
                onPress={ onOrderMore }
            >
                Order more
            </Button>

        </View>

    )
}

Jar.propTypes = { fillAmount: PropTypes.number.isRequired }



let styles = StyleSheet.create({
    button: {
        top: 20
    },
    scrollviewPage: {
        width: VIEW_WIDTH,
        alignItems: 'center',
        paddingHorizontal: 100,
        //borderColor: 'red',
        //borderWidth: 2
    },
    jar: {
        // Need to style in Jar.js
    },
    foodLabel: {
        fontSize: 40
    },
    button: {
        top: 80,
        color: '#000'
    }
})

export default JarCard
