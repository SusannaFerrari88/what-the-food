import React, { Component, PropTypes } from 'react-native'
import { TESTING, IP, PORT } from '../config'

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

        this.ws = new WebSocket( `ws://${ IP }:${ PORT }` )
        this.ws.onopen  = console.log.bind( console, '[WS] Open: ' )
        this.ws.onerror = console.log.bind( console, '[WS] Error: ' )
        this.ws.onclose = console.log.bind( console, '[WS] Close: ' )
        this.ws.onmessage = this.handleMessage.bind( this )
    }

    componentDidMount() {
        TESTING
            ? mock( this.setState.bind( this ) )
            : this.setupWebsocket()
    }

    handleMessage( e ) {
        console.log( '[WS] Message', e )

        try {
            const payload = JSON.parse( e.data )

            this.setState({
                data: {
                    jars: payload
                        .values
                          .map( v => ({ ...v, fillAmount: v.lastValue }) )
                }
            })
        } catch ( e ) {
            console.log( '[WS] Invalid JSON' , e.data )
        }
    }

    componentWillUnmount() {
        this.ws = null
    }

    render() {
        const { state: { data }, props: { children } } = this
        // Infuse data into children passed via jsx
        return React.cloneElement( children, { data })
    }
}

WebSocketProvider.propTypes = {
    children: PropTypes.object.isRequired
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
