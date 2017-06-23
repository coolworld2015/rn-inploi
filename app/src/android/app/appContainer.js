'use strict';

import React, {Component} from 'react';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Audit from '../audit/audit';
import AuditDetails from '../audit/auditDetails';

import Users from '../users/users';
import UserDetails from '../users/userDetails';
import UserAdd from '../users/userAdd';

import Phones from '../phones/phones';
import PhoneDetails from '../phones/phoneDetails';

import Search from '../search/search';
import SearchResults from '../search/searchResults';

import Inploi from '../inploi/inploi';
import InploiDetails from '../inploi/inploiDetails';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    onLogOut() {
        this.props.onLogOut();
    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <DefaultTabBar backgroundColor='white'/>}
            >
                <InploiTab tabLabel="Inploi"/>
                <Logout tabLabel="Logout"/>
            </ScrollableTabView>
        );
    }
}

class InploiTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Inploi', index: 0},
			{title: 'Web', index: 1}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Inploi data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 1: return <InploiDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;				
 		}
 	}	
	
	render() {
		return (
	  		<NavigationExperimental.Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					NavigationExperimental.Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class Logout extends Component {
    constructor(props) {
        super(props);
		
        appConfig.onLogOut();
    }

    render() {
        return null;
    }
}

 

export default AppContainer;