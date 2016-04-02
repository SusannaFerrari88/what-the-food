import React, { Component, PropTypes } from 'react-native'
//import LinearGradient from 'react-native-linear-gradient/index.ios.js'
const { Platform, StyleSheet, View, Text, Image, } = React

Jar.propTypes = { fillAmount: PropTypes.number.isRequired }

export default function Jar( props ){

    const { fillAmount } = props
    const min = 21
    const max = 355

    const fillerStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'green',
        height: fillAmount * ( 355 - 21 ) + 21
    }

    return (
        <View style={ styles.container }>

            <View style={ styles.jarContainer }>

                {/*<LinearGradient colors={['red', 'transparent']} style={styles.linearGradient}>*/}

                <View style={ fillerStyle } />

                <Image
                    source={ { uri: "jar", isStatic: true } }
                    style={ styles.jar }
                    resizeMode={ Image.resizeMode.contain }
                />

                {/*</LinearGradient>*/}
            </View>

        </View>
    )
}


let styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    // borderRadius: 5
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

export default Jar
