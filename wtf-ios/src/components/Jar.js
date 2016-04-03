import React, { Component, PropTypes } from 'react-native'
import LinearGradient from 'react-native-linear-gradient/index.ios.js'
const { Platform, StyleSheet, View, Text, Image, } = React

Jar.propTypes = { jar: PropTypes.object.isRequired }

export default function Jar( props ){

    const { jar: { fillAmount, food } } = props
    const min = 21
    const max = 355

    let height = fillAmount * ( 355 - 21 ) + 21
    if( height > max )
        height = max
    if( height < 0 )
        height = 0

    const fillerStyle = {
        position: 'absolute',
        resizeMode: 'cover', // or 'stretch'
        bottom: 0,
        left: 0,
        right: 0,
        height
    }


    const uri = food === 'Reis' ? 'rice' : 'nudeln'
    return (

        <View style={ styles.container }>

            <View style={ styles.jarContainer }>


                <Image
                    source={ { uri, isStatic: true } }
                    style={ fillerStyle }
                />

                <Image
                    source={ { uri: "jar", isStatic: true } }
                    style={ styles.jar }
                />

            </View>

        </View>
    )
}


let styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 60,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: 'red',
        // borderWidth: 2
    },
    jarContainer: {
        width: 320,
        height: 433,
    //borderColor: 'blue',
    //borderWidth: 2
    },
    jar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    }

})
