'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput,
    AsyncStorage,
    Alert,
	BackAndroid
} from 'react-native';

class SearchDetails extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});
		
		this.state = {
			role: ''
		};
		
		if (props.data) {
			let job_term;
			if (props.data.job_term == 'ft') {
				job_term = 'Full-Time';
			} else {
				job_term = 'Part-Time';
			}
			this.state = {
				image: props.data.image,
				role: props.data.role,
				date: props.data.date,
				company: props.data.company,
				job_term: job_term,
				company_type: props.data.company_type,
				location_city: props.data.location_city,
				rate: props.data.rate,
				full_description: props.data.full_description
			};
		}	
    }
			
	addItem() {
        let movies = [];

        AsyncStorage.getItem('rn-wikr.posts')
            .then(req => JSON.parse(req))
            .then(json => {
                movies = [].concat(json);
                movies.push({
					trackId: + new Date,
					name: this.state.name,
					date: this.state.date,
					image: this.state.image,
					artist: this.state.artist,
					album: this.state.album,
					duration: this.state.duration,
					url: this.state.url
				});

                if (movies[0] == null) {
                    movies.shift()
                } // Hack !!!

                AsyncStorage.setItem('rn-wikr.posts', JSON.stringify(movies))
                    .then(json => {
                            appConfig.movies.refresh = true;
                            this.props.navigator.pop();
                        }
                    );

            })
            .catch(error => console.log(error));
    }
	
    playTrack() {
		this.props.navigator.push({
			index: 3,
			data: {
				url: this.state.url
			}
		});
    }
	
	goBack() {
		this.props.navigator.pop();
	}
	
    render() {
        var image = <View />;
 
		image = <Image
			source={{uri: this.state.image}}
			style={{
				height: 250,
				width: 250,
				borderRadius: 10,
				margin: 5
			}}
		/>;
		
        return (
            <View style={styles.container}>
				<View style={styles.header}>
					<View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='#E25057'
						>
							<Text style={styles.textSmall}>
								Back
							</Text>
						</TouchableHighlight>	
					</View>
					<View style={styles.itemWrap}>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={styles.textLarge}>
								{this.state.company}
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							onPress={()=> this.addItem()}
							underlayColor='#E25057'
						>
							<Text style={styles.textSmall}>
								Apply
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
				
				<ScrollView>
					<View style={{
							flex: 1,
							padding: 10,
							paddingBottom: 55,
							justifyContent: 'flex-start',
							backgroundColor: 'white'
					}}>
					<View style={{
						 alignItems: 'center'
					}}>
						{image}
					</View>
					 
						<Text style={styles.itemTextBold}>
							{this.state.company}
						</Text>
						
						<Text style={styles.itemTextBig}>
							{this.state.role}
						</Text>				
						
						<Text style={styles.itemText}>
							{this.state.job_term}
						</Text>				
						
						<Text style={styles.itemText}>
							{this.state.company_type}
						</Text>						
						
						<Text style={styles.itemText}>
							{this.state.location_city}
						</Text>				
						
						<Text style={styles.itemText}>
							{this.state.date}
						</Text>						
						
						<Text style={styles.itemTextBold}>
							£{this.state.rate}
						</Text>
						
						<Text style={styles.itemTextDescription}>
							{this.state.full_description}
						</Text>				
						
						<TouchableHighlight
							onPress={()=> this.addItem()}
							style={styles.button}>
							<Text style={styles.buttonText}>
								Apply Now
							</Text>
						</TouchableHighlight>
						
					</View>
				</ScrollView>
			</View>
		);
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center', 
		backgroundColor: 'white'
	},		
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		//backgroundColor: '#48BBEC',
		backgroundColor: '#E25057',
		borderWidth: 0,
		borderColor: 'whitesmoke'
	},	
	textSmall: {
		fontSize: 16,
		textAlign: 'center',
		margin: 14,
		fontWeight: 'bold',
		color: 'white'
	},		
	textLarge: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		marginRight: 20,
		fontWeight: 'bold',
		color: 'white'
	},	
    form: {
		flex: 1,
		padding: 10,
		justifyContent: 'flex-start',
		paddingBottom: 130,
		backgroundColor: 'white'
    },
 	itemWrap: {
		flex: 1,
		flexDirection: 'column', 
		flexWrap: 'wrap'
    },	
    itemTextBold: {
        fontSize: 18,
        textAlign: 'center',
        margin: 5,
        fontWeight: 'bold',
		color: 'black'
    },
	itemTextBig: {
		fontSize: 18,
		marginBottom: 5,
		textAlign: 'center',
		color: 'black'
    },	
    itemText: {
        fontSize: 14,
        textAlign: 'center',
        margin: 1,
        color: 'black'
    },    
	itemTextDescription: {
        fontSize: 14,
        textAlign: 'left',
        margin: 5,
        marginLeft: 2,
        color: 'black'
    },
    button: {
        height: 50,
        //backgroundColor: '#48BBEC',
        backgroundColor: '#E25057',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
		fontWeight: 'bold'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default SearchDetails;
