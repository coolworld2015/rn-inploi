'use strict';

import React, {Component} from 'react';
import {
    WebView
} from 'react-native';

class ShowMap extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			url: ''
		};
		
		if (props.data) {
			this.state = {
				latitude: props.data.latitude,
				longitude: props.data.longitude,
				url: props.data.url,
				html: 'https://www.google.com/maps/@' + props.data.latitude + ',' + props.data.longitude + ',18z'
			}
		}
    }

    render() {
        return (
            <WebView
                source={{uri: this.state.html}}
				mediaPlaybackRequiresUserAction={false}
            />
        )
    }
}

export default ShowMap;