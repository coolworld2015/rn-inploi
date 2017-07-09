'use strict';

import React, {Component} from 'react';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Inploi from '../inploi/inploi';
import InploiDetails from '../inploi/inploiDetails';

import Favorites from '../favorites/favorites';
import FavoriteDetails from '../favorites/favoriteDetails';

import ShowMap from './showMap';

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
                renderTabBar={() => <DefaultTabBar 
					activeTextColor='#E25057' 
					inactiveTextColor='#E25057' 
 					underlineStyle={{backgroundColor: '#E25057'}}
					backgroundColor='white'/>}
            >
                <FavoritesTab tabLabel="Applied"/>
                <InploiTab tabLabel="Jobs"/>
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
			{title: 'InploiDetails', index: 1}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Inploi data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 1: return <InploiDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;		
			case 3: return <ShowMap data={route.data} routes={this.routes} navigator={navigator} />
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

class FavoritesTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Favorites', index: 0},
			{title: 'Favorite Details', index: 1}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Favorites routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <FavoriteDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 3: return <ShowMap data={route.data} routes={this.routes} navigator={navigator} />
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