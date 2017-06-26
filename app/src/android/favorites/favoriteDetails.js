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
    AsyncStorage,
    Alert,
	BackAndroid
} from 'react-native';

class MoviesDetails extends Component {
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
			this.state = {
				trackId: props.data.trackId,
				image: props.data.image,
				role: props.data.role,
				date: props.data.date,
				company: props.data.company,
				job_term: props.data.job_term,
				company_type: props.data.company_type,
				location_city: props.data.location_city,
				rate: props.data.rate,
				full_description: props.data.full_description,
				
				key_skills: props.data.key_skills,
				experience: props.data.experience,
				address: props.data.address,
				postcode: props.data.postcode,
				latitude: props.data.latitude,
				longitude: props.data.longitude,
				start: props.data.start,
				end: props.data.end,
				asap: props.data.asap
			};
		}	
    }
	
    deleteMovieDialog() {
		Alert.alert(
			'Delete job',
			'Are you sure you want to delete job ' + this.state.role + '?',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
				{
					text: 'OK', onPress: () => {
					this.deleteMovie();
					}
				},
			]
		);	
	}
	
	deleteMovie(id) {
		var id = this.state.trackId;
		var movies = [];

		AsyncStorage.getItem('rn-inploi.jobs')
			.then(req => JSON.parse(req))
			.then(json => {

				movies = [].concat(json);

				for (var i = 0; i < movies.length; i++) {
					if (movies[i].trackId == id) {
						movies.splice(i, 1);
						break;
					}
				}

				AsyncStorage.setItem('rn-inploi.jobs', JSON.stringify(movies))
					.then(json => {
							appConfig.movies.refresh = true;
							this.props.navigator.pop();
						}
					);

			})
			.catch(error => console.log(error))
	}
	
    showMap() {
		this.props.navigator.push({
			index: 3,
			data: {
				latitude: this.state.latitude,
				longitude: this.state.longitude
			}
		});
    }
	
	goBack() {
		this.props.navigator.pop();
	}
	
    render() {
        var image, start, end;
 
		image = <Image
			source={{uri: this.state.image}}
			style={{
				height: 250,
				width: 250,
				borderRadius: 10,
				margin: 5
			}}
		/>;
		
		if (this.state.start == null) {
            start = 'N/A';
        }
		if (this.state.end == null) {
            end = 'N/A';
        }
		if (this.state.asap == '1') {
            start = 'ASAP';
			end = 'N/A';
        }
		
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
							onPress={()=> this.deleteMovieDialog()}
							underlayColor='#E25057'
						>
							<Text style={styles.textSmall}>
								Delete
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
												
						<Text style={styles.itemHeaderBold}>
							Location
						</Text>												
						<TouchableHighlight
							onPress={()=> this.showMap()}
							style={styles.button}>
							<Text style={styles.buttonText}>
								{this.state.address} {this.state.postcode}
							</Text>
						</TouchableHighlight>		
						
						<Text style={styles.itemHeaderBold}>
							Required Skills
						</Text>												
						<Text style={styles.itemTextDescription}>
							{this.state.key_skills}
						</Text>				
						
						<Text style={styles.itemHeaderBold}>
							Experience
						</Text>				
						<Text style={styles.itemTextDescription}>
							{this.state.experience}
						</Text>			
						
						<Text style={styles.itemHeaderBold}>
							Dates
						</Text>				
						<Text style={styles.itemTextDescription}>
							Start Date: {start}
						</Text>						
						<Text style={styles.itemTextEnd}>
							End Date: {end}
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
	itemHeaderBold: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: -5,
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
	itemTextEnd: {
        fontSize: 14,
        textAlign: 'left',
        margin: 0,
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
        marginBottom: 10,
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

export default MoviesDetails;
