/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { Component, PropTypes } from 'react-native'
import JarCard from './JarCard'
import { VIEW_WIDTH } from '../config'

const { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } = React


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

        if( ! jars.length ) {
            return <Text>No jars provided</Text>
        }

        return (

            <View style={ styles.wrapper }>

                <ScrollView
                    style={ styles.scrollView }
                    contentContainerStyle={ styles.scrollViewContentContainer }
                    scrollEventThrottle={ 25 }
                    automaticallyAdjustContentInsets={ false }
                    showsHorizontalScrollIndicator={ false }
                    indicatorStyle="black"
                    onScroll={ this.handleScroll }
                    horizontal
                    pagingEnabled
                >

                    { jars.map( j =>
                        <JarCard key={ j.food } jar={ j } />
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
