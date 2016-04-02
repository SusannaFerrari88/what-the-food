/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { Component, PropTypes } from 'react-native'
import Jar from './Jar'

const { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } = React
var Button = require( 'react-native-button' )


const VIEW_WIDTH = 375

export default class JarCarousel extends Component {

    constructor({ jars }) {
        super()

        this.state = {
            page: 0
        }

        this.handleScroll = this.handleScroll.bind( this )
    }

    handleScroll( evt ) {

        const edges = this.props.jars.map( ( _, i ) => i * VIEW_WIDTH )
        const offset = evt.nativeEvent.contentOffset.x

        edges.forEach( ( e, i ) => {
            console.log( e, offset )
            console.log( Math.abs( e - offset ) )
            if( Math.abs( e - offset ) < 2 ) {
                this.setState({ page: i })
            }
        })
    }

    renderPageIndicator() {
        const parts = []
        const jars = this.props.jars
        const page = this.state.page

        jars.forEach( ( p, i ) => {

            const key = i === page ? 'activePage' : 'inactivePage'
            let element = (
                <Text key={ i + '-text' } style={ styles[ key ] } >
                    { p.food }
                </Text>
            )

            parts.push( element )

            if( i !== jars.length - 1 )
                parts.push( ' | ' )

        })

        return parts
    }

    render() {
        const { jars, onOrderMore } = this.props
        console.log( jars)

        if( ! jars.length ) {
            return <Text>No jars provided</Text>
        }

        return (

            <View style={ styles.wrapper }>

                <ScrollView
                    ref={ scrollView => { this._scrollView = scrollView } }
                    style={ [ styles.scrollView, styles.horizontalScrollView ] }
                    contentContainerStyle={ styles.scrollViewContentContainer }
                    scrollEventThrottle={ 25 }
                    automaticallyAdjustContentInsets={ false }
                    showsHorizontalScrollIndicator={ false }
                    indicatorStyle="black"
                    onScroll={ this.handleScroll }
                    horizontal
                    pagingEnabled
                >

                    { jars.map( ( j, i ) =>
                        <View key={ i } style={ styles.scrollviewPage }>

                            <Text style={ styles.foodLabel }>
                                { j.food }
                            </Text>

                            <Jar
                                style={ styles.jar }
                                fillAmount={ j.fillAmount }
                            />

                            <Button
                                style={ styles.button }
                                onPress={ onOrderMore }
                            >
                                Order more
                            </Button>

                        </View>
                    ) }

                </ScrollView>

                <View style={ styles.pageIndicatorContainer }>
                    <Text>
                        { this.renderPageIndicator() }
                    </Text>
                </View>

            </View>
        )
    }
}

JarCarousel.propTypes = {
    jars       : PropTypes.arrayOf( PropTypes.object.isRequired ).isRequired,
    onOrderMore: PropTypes.func.isRequired
}


let styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
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
    scrollViewContentContainer: {
        top: 40,
        width: 2 * VIEW_WIDTH,
        height: 440
    },
    jar: {
        // Need to style in Jar.js
    },
    foodLabel: {
        fontSize: 40
    },
    scrollView: {

        flex: 1,
        top: 0
    },
    button: {
        top: 80,
        color: '#000'
    },
    pageIndicatorContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activePage: {
        fontWeight: 'bold'
    },
    inactivePage: {

    }
})
