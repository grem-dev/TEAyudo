

import React, { Component } from 'react'

import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Animated
} from 'react-native';

import { Actions } from 'react-native-router-flux'




const localSheet = StyleSheet.create({
	container: {
		flexDirection: 'column',

	},
	configBtn: {
		alignSelf: 'flex-end',
		backgroundColor: '#e6e6',
	},
	btnPlay: {
		width: 250,
		height: 250,
		margin: 15,
		borderRadius: 125,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 15,

		backgroundColor: 'rgb(50,0,200)',
		alignSelf: 'center'
	},
	text: {
		color: 'rgb(255,255,255)',
		fontSize: 40,
	},
	fillAndCenter: {
		width: '100%', height: '100%',
		alignItems: 'center', justifyContent: 'center'
	},
	absoluteFill: {
		backgroundColor: 'rgba(255,255,255, 0)',
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
});








export default class MainView extends Component {
	constructor(props) {
		super(props)

		this.state = {
			elevation: new Animated.Value(15),
			scale: new Animated.Value(1),
			isAnimated: false,
		}
	}



	componentDidMount = () => {


		setInterval(() => {
			if (this.state.isAnimated === false)
				this.animatedPopup();
		}, 1000);

	}


	animatedPopup = async () => {
		console.log('Me llamaron')

		this.state.isAnimated = true;

		await Animated.sequence([
			Animated.spring(
				this.state.scale,
				{ toValue: 1.2, mass: 15 }
			),
			Animated.spring(
				this.state.scale,
				{ toValue: 1, mass: 8 }
			)
		]).start(() => {
			this.state.isAnimated = false;
			console.log('terminé la aniacion 4')
		});


	}


	_handlePress = () => {
		Actions.activities();
	}

	render() {

		let { elevation, scale } = this.state;
		let animatedStyle = {
			elevation,
			transform: [
				{ scale },
			]
		}


		return (


			<View style={{ width: '100%', height: '100%', }}>

				<View style={{ position: 'absolute', width: '100%', height: 40, backgroundColor: 'red' }}>
					{/* Here will be an icon*/}
				</View>

				<View style={[localSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]}>
					<Animated.View
						style={[localSheet.btnPlay, animatedStyle]}
					>
						<TouchableOpacity
							onPress={() => { this._handlePress() }}
							style={localSheet.fillAndCenter}
						>
							<Text style={localSheet.text}>Ir</Text>
						</TouchableOpacity>
					</Animated.View>
				</View>




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


