import React, { Component } from 'react'
import { Text, View, StyleSheet, Animated, TouchableOpacity } from 'react-native';

import { TestSheet, LayoutSheet } from '../view/css/layout';

export class Option extends Component {

	constructor(props) {
		super(props)

		this.state = {
			disabled: false,
			value: this.props.value >= 0 ? this.props.value : 0,
			onPress: this.props.onPress ? this.props.onPress : () => console.log('no onPress function'),
			style: localSheet.enableCard,
		}
	}


	componentDidMount() {

	}

	componentWillReceiveProps = () => {

		console.log(this.props.value)
		this.setState({
			value: this.props.value,
			style: localSheet.enableCard,
			disable: false,
		});

		this.forceUpdate();
	}



	handlePress = () => {
		console.log('i was pressed')
		let result = this.state.onPress(this.state.value)

		if (!result) {
			this.setState({
				style: localSheet.disableCard,
				disabled: true,
			});
		}
	}



	render() {

		return (
			<TouchableOpacity
				disabled={this.state.disabled}
				activeOpacity={0.5}
				onPress={() => this.handlePress()}
				style={[localSheet.card, { ...this.state.style }]}
			>
				<View style={{
					fontSize: 24, width: '100%',
					flexDirection: 'column', alignItems: 'center',
				}}
				>
					<Text style={{ fontSize: 34 }}>{this.state.value}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}


export class ValueContainer extends Component {

	constructor(props) {
		super(props)
		this.state = {
			fontSize: new Animated.Value(0),
			value: new Animated.Value(2)
		}
	}



	componentWillReceiveProps = () => {
		this.animateStart();

	}

	componentDidMount = () => {

		setTimeout(() => {
			this.animateStart()
		}, 500);


	}


	popUpAnimate = () => {


	}

	animateStart = () => {
		Animated.sequence([
			Animated.spring(
				this.state.fontSize,
				{ toValue: 90, friction: 75 }
			),
			Animated.spring(
				this.state.fontSize,
				{ toValue: 70, friction: 3 }
			),
		]).start();
	}


	render() {

		return (
			<Animated.View
				style={{ width: this.props.size, margin: this.state.value }}
			>
				<Animated.Text style={{ fontSize: this.state.fontSize, textAlign: 'center' }}>{this.props.value}</Animated.Text>
			</Animated.View>
		);
	}
}

const localSheet = StyleSheet.create({
	card: {
		borderRadius: 15,
		margin: 5,
		height: 120,
		minWidth: 80,
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	enableCard: {
		elevation: 3,
		backgroundColor: 'rgb(255,255,255)',
	},
	disableCard: {
		elevation: 0,
		backgroundColor: 'rgb(200,200,200)',
	}

});