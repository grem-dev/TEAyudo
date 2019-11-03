

import React, { Component } from 'react'

import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux'

export default class MainView extends Component {
	render() {
		return (
			<View style={sheet.container}>
				<View style={sheet.configBtn}>
					<Text>Icon Config</Text>
				</View>
				<TouchableOpacity
					style={sheet.btnPlay}
					onPress={() => Actions.activities()}
				>
					<Text style={sheet.text}>Icon Play</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

export class ConfigView extends Component {
	render() {
		return (
			<View>
				<Text> Configurations here </Text>
			</View>
		)
	}
}

const sheet = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		// backgroundColor: 'rgb(10,10,150)',
	},
	configBtn: {
		alignSelf: 'flex-end',
		backgroundColor: '#e6e6',
	},
	btnPlay: {
		padding: 15,
		elevation: 20,
		borderRadius: 5,

		backgroundColor: 'rgb(100,0,100)',
		alignSelf: 'center'
	},
	text: {
		color: 'rgb(255,255,255)',
		fontSize: 17,
	},
});