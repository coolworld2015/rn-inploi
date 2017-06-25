'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
	TouchableWithoutFeedback,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput,
	BackAndroid,
	Image,
	Dimensions,
	RefreshControl	
} from 'react-native';

class SearchTrack extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});	
		
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

		this.state = {
			dataSource: ds.cloneWithRows([]),
			searchQuery: '',
			showProgress: true,
			resultsCount: 0,
			recordsCount: 10,
			positionY: 0,
			refreshing: false
		}	
    }
	
    componentDidMount() {
		this.setState({
            width: Dimensions.get('window').width
        });
        this.getAllItems();
    }
	
    getItems() {
		this.setState({
			serverError: false,
            resultsCount: 0,
            recordsCount: 10,
            positionY: 0,
			searchQuery: ''
        });   
			
		fetch(appConfig.url + 'jobs/1?token=' + appConfig.access_token, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				console.log(responseData.browse)
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.browse),
                    resultsCount: responseData.browse.length,
                    responseData: responseData.browse,
                    filteredItems: responseData.browse,
					refreshing: false
                });
            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
                this.setState({
                    showProgress: false
                });
            });
    }
	
    getAllItems() {
		this.setState({
			serverError: false,
            resultsCount: 0,
            recordsCount: 10,
            positionY: 0,
			searchQuery: ''
        });   
		let items = [];
		
		fetch(appConfig.url + 'jobs/1?token=' + appConfig.access_token, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				
				items.push(...responseData.browse);
				this.setState({
					resultsCount: items.length
				});
				if (responseData.browse.length > 0) {
						fetch(appConfig.url + 'jobs/2?token=' + appConfig.access_token, {
							method: 'get',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							}
						})
							.then((response)=> response.json())
							.then((responseData)=> {

								items.push(...responseData.browse);
								this.setState({
									resultsCount: items.length
								});
								if (responseData.browse.length > 0) {
										fetch(appConfig.url + 'jobs/3?token=' + appConfig.access_token, {
											method: 'get',
											headers: {
												'Accept': 'application/json',
												'Content-Type': 'application/json'
											}
										})
											.then((response)=> response.json())
											.then((responseData)=> {

												items.push(...responseData.browse); 
												this.setState({
													resultsCount: items.length
												});
												if (responseData.browse.length > 0) {
														fetch(appConfig.url + 'jobs/4?token=' + appConfig.access_token, {
															method: 'get',
															headers: {
																'Accept': 'application/json',
																'Content-Type': 'application/json'
															}
														})
															.then((response)=> response.json())
															.then((responseData)=> {

																items.push(...responseData.browse); 
																this.setState({
																	resultsCount: items.length
																}); 
																if (responseData.browse.length > 0) {
																		fetch(appConfig.url + 'jobs/5?token=' + appConfig.access_token, {
																			method: 'get',
																			headers: {
																				'Accept': 'application/json',
																				'Content-Type': 'application/json'
																			}
																		})
																			.then((response)=> response.json())
																			.then((responseData)=> {

																				items.push(...responseData.browse);
																				this.setState({
																					resultsCount: items.length
																				}); 
																				if (responseData.browse.length > 0) {
																						fetch(appConfig.url + 'jobs/6?token=' + appConfig.access_token, {
																							method: 'get',
																							headers: {
																								'Accept': 'application/json',
																								'Content-Type': 'application/json'
																							}
																						})
																							.then((response)=> response.json())
																							.then((responseData)=> {
																								
																								items.push(...responseData.browse); 
																								this.setState({
																									resultsCount: items.length
																								});  
																								if (responseData.browse.length > 0) {
																										fetch(appConfig.url + 'jobs/7?token=' + appConfig.access_token, {
																											method: 'get',
																											headers: {
																												'Accept': 'application/json',
																												'Content-Type': 'application/json'
																											}
																										})
																											.then((response)=> response.json())
																											.then((responseData)=> {
																												
																												items.push(...responseData.browse); 
																												this.setState({
																													resultsCount: items.length
																												}); 
																												if (responseData.browse.length > 0) {
																														fetch(appConfig.url + 'jobs/8?token=' + appConfig.access_token, {
																															method: 'get',
																															headers: {
																																'Accept': 'application/json',
																																'Content-Type': 'application/json'
																															}
																														})
																															.then((response)=> response.json())
																															.then((responseData)=> {

																																items.push(...responseData.browse); 
																																this.setState({
																																	resultsCount: items.length
																																});  
																																if (responseData.browse.length > 0) {
																																		fetch(appConfig.url + 'jobs/9?token=' + appConfig.access_token, {
																																			method: 'get',
																																			headers: {
																																				'Accept': 'application/json',
																																				'Content-Type': 'application/json'
																																			}
																																		})
																																			.then((response)=> response.json())
																																			.then((responseData)=> {

																																				items.push(...responseData.browse);
																																				this.setState({
																																					resultsCount: items.length
																																				});
																																				if (responseData.browse.length > 0) {
																																						fetch(appConfig.url + 'jobs/10?token=' + appConfig.access_token, {
																																							method: 'get',
																																							headers: {
																																								'Accept': 'application/json',
																																								'Content-Type': 'application/json'
																																							}
																																						})
																																							.then((response)=> response.json())
																																							.then((responseData)=> {

																																								if (responseData.browse.length > 0) {
																																									items.push(...responseData.browse); 
																																									this.setState({
																																										resultsCount: items.length
																																									}); 
																																								}
																																							})
																																							.catch((error)=> {
																																								this.setState({
																																									serverError: true
																																								});
																																							})
																																				}
																																			})
																																			.catch((error)=> {
																																				this.setState({
																																					serverError: true
																																				});
																																			})
																																}
																															})
																															.catch((error)=> {
																																this.setState({
																																	serverError: true
																																});
																															})
																												}
																											})
																											.catch((error)=> {
																												this.setState({
																													serverError: true
																												});
																											})
																								}
																							})
																							.catch((error)=> {
																								this.setState({
																									serverError: true
																								});
																							})
																				}
																			})
																			.catch((error)=> {
																				this.setState({
																					serverError: true
																				});
																			})
																}
															})
															.catch((error)=> {
																this.setState({
																	serverError: true
																});
															})
												}
											})
											.catch((error)=> {
												this.setState({
													serverError: true
												});
											})
								}
							})
							.catch((error)=> {
								this.setState({
									serverError: true
								});
							})
				}	
			})
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(items),
					resultsCount: items.length,
					responseData: items,
					filteredItems: items,
					refreshing: false,
					showProgress: false
				});
            });
    }
	
    pressRow(rowData) {
		let data = {
			trackId: rowData.id,
			image: 'https://res.cloudinary.com/chris-mackie/image/upload/c_fill,co_rgb:555860,h_150,w_253/v' + rowData.company_img_v + '/' + rowData.company_img,
			role: rowData.role,
			company: rowData.company,
			job_term: rowData.job_term,
			company_type: rowData.company_type,
			location_city: rowData.location_city.trim(),
			rate: rowData.rate,
			
			date: rowData.posted,
			full_description: rowData.full_description
		};
		
		this.props.navigator.push({
			index: 1,
			data: data
		});
    }
	
    renderRow(rowData) {
		let job_term;
		if (rowData.job_term == 'ft') {
            job_term = 'Full-Time';
        } else {
			job_term = 'Part-Time';
		}
		
        return (
            <TouchableHighlight
                onPress={()=> this.pressRow(rowData)}
                underlayColor='#ddd'
            >
                <View style={styles.imgsList}>
                     <Image
                        source={{uri: 'https://res.cloudinary.com/chris-mackie/image/upload/c_fill,co_rgb:555860,h_150,w_253/v' + rowData.company_img_v + '/' + rowData.company_img}}
                        style={styles.img}
                    />
                    <View style={styles.textBlock}>
                        <Text style={styles.textItemBold}>
							{rowData.role}
						</Text>
 												
                        <Text style={styles.textItemBig}>
							{rowData.company_img_v}
						</Text>  												
                        <Text style={styles.textItemBig}>
							{rowData.company}
						</Text> 

                        <Text style={styles.textItem}>
							{job_term}
						</Text>
						
                        <Text style={styles.textItem}>
							{rowData.company_type}
						</Text>
 						
                        <Text style={styles.textItem}>
							{rowData.location_city.trim()}
						</Text> 
												
                        <Text style={styles.textItemBold}>
							£{rowData.rate}
						</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    refreshData(event) {
        if (this.state.showProgress === true) {
            return;
        }

        if (this.state.filteredItems === undefined) {
            return;
        }

        let items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
        items = this.state.filteredItems.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                recordsCount: recordsCount + 10,
                positionY: positionY + 400
            });
        }
    }

    onChangeText(text) {
        if (this.state.responseData == undefined) {
            return;
        }
        let arr = [].concat(this.state.responseData);
        let items = arr.filter((el) => el.role.toLowerCase().indexOf(text.toLowerCase()) >= 0);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }

	refreshDataAndroid() {
		this.setState({
			showProgress: true,
			resultsCount: 0
		});

		setTimeout(() => {
			this.getAllItems();
		}, 300);
	}
	
    goBack(rowData) {
		this.props.navigator.pop();
	}

    clearSearchQuery() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.responseData.slice(0, 15)),
            resultsCount: this.state.responseData.length,
            filteredItems: this.state.responseData,
            positionY: 0,
            recordsCount: 10,
            searchQuery: ''
        });
    }
	
    render() {
        let errorCtrl, loader, image;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.showProgress) {
            loader = <View style={styles.loader}>
                <ActivityIndicator
                    size="large"
					color="#E25057"
                    animating={true}
                />
            </View>;
        }

		if (this.state.searchQuery.length > 0) {
			image = <Image
				source={require('../../../img/cancel.png')}
				style={{
					height: 20,
					width: 20,
					marginTop: 10
				}}
			/>;
		}

        return (
            <View style={styles.container}>
				<View style={styles.header}>
					<View>
						<TouchableHighlight
							onPress={()=> this.refreshDataAndroid()}
							underlayColor='#ddd'
						>
							<Text style={styles.textSmall}>
								 
							</Text>
						</TouchableHighlight>	
					</View>
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={styles.textLarge}>
								Jobs
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={styles.textSmall}>
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
				
                <View style={styles.iconForm}>
					<View>
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							onChangeText={this.onChangeText.bind(this)}
							style={{
								height: 45,
								padding: 5,
								backgroundColor: 'white',
								borderWidth: 3,
								borderColor: 'white',
								borderRadius: 0,
								width: this.state.width * .90,
							}}
							value={this.state.searchQuery}
							placeholder="Search here">
						</TextInput>
					</View>
					<View style={{
						height: 45,
						backgroundColor: 'white',
						borderWidth: 3,
						borderColor: 'white',
						marginLeft: -10,
						paddingLeft: 5,
						width: this.state.width * .10,
					}}>			
						<TouchableWithoutFeedback
							onPress={() => this.clearSearchQuery()}
						>			
							<View>					
								{image}
							</View>
						</TouchableWithoutFeedback>
					</View>
                </View>
				
				{errorCtrl}

                {loader}

				<ScrollView onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}
					refreshControl={
						<RefreshControl
							enabled={true}
							refreshing={this.state.refreshing}
							onRefresh={this.refreshDataAndroid.bind(this)}
						/>
					}
				>
					<ListView
						enableEmptySections={true}
						dataSource={this.state.dataSource}
						renderRow={this.renderRow.bind(this)}
					/>
				</ScrollView>

				<View>
					<Text style={styles.countFooter}>
						Records: {this.state.resultsCount} 
					</Text>
				</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imgsList: {
        flex: 1,
        flexDirection: 'row',
        padding: 0,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
	iconForm: {
		flexDirection: 'row',
		//borderColor: 'lightgray',
		borderColor: '#E25057',
		borderWidth: 3
	},
    countHeader: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#F5FCFF',
    },
    img: {
        height: 110,
        width: 110,
        borderRadius: 10,
        margin: 10
    },    
	textBlock: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between'
    },	
	textItemBold: {
		fontWeight: 'bold', 
		color: 'black'
    },		
	textItemBig: {
		color: 'black',
		marginBottom: 5
    },	
	textItem: {
		color: 'black',
		fontSize: 12
    },
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
	textInput: {
		height: 45,
		marginTop: 0,
		padding: 5,
		backgroundColor: 'white',
		borderWidth: 3,
		borderColor: 'lightgray',
		borderRadius: 0
	},
	itemWrap: {
		flex: 1,
		flexDirection: 'column', 
		flexWrap: 'wrap'
    },	
	row: {
		flex: 1,
		flexDirection: 'row',
		padding: 20,
		alignItems: 'center',
		borderColor: '#D7D7D7',
		borderBottomWidth: 1,
		backgroundColor: '#fff'
	},		
	rowText: {
		backgroundColor: '#fff', 
		color: 'black', 
		fontWeight: 'bold'
	},	
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        //backgroundColor: '#48BBEC',
        backgroundColor: '#E25057',
		color: 'white',
		fontWeight: 'bold'
    },
    loader: {
		justifyContent: 'center',
		height: 100
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default SearchTrack;
