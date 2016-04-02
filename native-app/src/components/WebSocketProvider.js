import React, { Component, PropTypes } from 'react-native'
import App from './App'

const TESTING = true

export default class WebSocketProvider extends Component {

    constructor() {
        super()

        this.state = {
            data: {
                jars: []
            }
        }
    }

    setupWebsocket() {
        console.log( '[WS] Setup' )

        this.ws = new WebSocket( 'ws://192.168.77.134:1338' )
        this.ws.onopen  = console.log.bind( console, '[WS] Open: ' )
        this.ws.onerror = console.log.bind( console, '[WS] Error: ' )
        this.ws.onclose = console.log.bind( console, '[WS] Close: ' )
        this.ws.onmessage = this.handleMessage.bind( this )
    }

    componentDidMount() {

        TESTING ? mock( this.setState.bind( this ) ) : this.setupWebsocket()
    }

    handleMessage( e ) {
        console.log( '[WS] Message', e )
        try {
            const payload = JSON.parse( e.data )

            this.setState({
                jars: payload
                        .values
                          .map( v => ({ ...v, fillAmount: v.lastValue }) )
            })
        } catch ( e ) {

            console.log( '[WS] Invalid JSON' , e.data )

        }
    }

    componentWillUnmount() {
        this.ws = null
    }

    render() {
        console.log( '[App:Render]', this.state.data )
        return <App data={ this.state.data } />
    }
}

function mock( setState ) {
    setState({ data: { jars: [ {
        fillAmount: Math.random(),
        food      : 'banana'
    }, {
        fillAmount: Math.random(),
        food      : 'pasta'
    } ] } })

    setTimeout( mock, 500, setState )
}
