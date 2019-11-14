

import React, {
	Component
} from 'react';

import {
	Text, View, StyleSheet,
	Animated, TouchableOpacity,
	PanResponder, Image, Easing
} from 'react-native';

import { TestSheet, LayoutSheet } from '../screens/css/layout';




const localSheet = StyleSheet.create({
	card: {
		borderRadius: 15,
		margin: 5,
		width: '100%',
		height: '100%',
		alignContent: 'center',
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
	},
	dragElement: {
		margin: 3,
		backgroundColor: 'rgb(150,100,200)',
		elevation: 4,
		borderRadius: 5,
	}

});



// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================



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

	UNSAFE_componentWillReceiveProps = () => {

		this.setState({
			value: this.props.value,
			style: localSheet.enableCard,
			disable: false,
		});
		this.render();
	}



	handlePress = () => {

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

				<Text style={{ fontSize: 34 }}>{this.state.value}</Text>

			</TouchableOpacity>
		)
	}
}



// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================


export class ValueContainer extends Component {

	constructor(props) {
		super(props)
		this.state = {
			fontSize: new Animated.Value(this.props.valueSize),
			value: new Animated.Value(2)
		}
	}



	// UNSAFE_componentWillReceiveProps = () => {
	// 	this.animateStart();
	// }

	componentDidMount = () => {
		setTimeout(() => {
			this.animateStart()
		}, 500);
	}


	animateStart = () => {

		let sizeAnimated = this.props.valueSize * 1.2;
		let normalSize = this.props.valueSize;

		Animated.sequence([
			Animated.spring(
				this.state.fontSize,
				{ toValue: sizeAnimated, friction: 75 }
			),
			Animated.spring(
				this.state.fontSize,
				{ toValue: normalSize, friction: 3 }
			),
		]).start();
	}


	render() {

		return (
			<Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Animated.Text style={{ fontSize: this.state.fontSize }}>{this.props.value}</Animated.Text>
			</Animated.View>
		);
	}
}


// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================




export class Draggable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isOnPlace: false,
			Drag_Position_XY_Animated: new Animated.ValueXY(),
			scale: new Animated.Value(1),
			rotation: new Animated.Value(0),
			img: this.props.image ? this.props.image : require('../resources/img/c.png'),
		};


		this._panResponder = PanResponder.create({
			onMoveShouldSetResponderCapture: () => true,
			onMoveShouldSetPanResponderCapture: () => true,

			//  Is called when the PanGesture Start to respond
			onPanResponderGrant: (e, gestureState) => this._handlePanResponderGrant(e, gestureState),

			// When the animation is happening
			onPanResponderMove: Animated.event([
				null, { dx: this.state.Drag_Position_XY_Animated.x, dy: this.state.Drag_Position_XY_Animated.y },
			]),

			/**
			* Is called when the PanGesture has ended
			* For now just reset the animated values != does not check if is on drag area
			*/
			onPanResponderRelease: (e, gestureState) => this._handlerPanResponderRelease(e, gestureState),

		});
	} // End of the Constructor


	_handlePanResponderGrant = (e, gestureState) => {
		this.state.Drag_Position_XY_Animated.setOffset({ x: this.state.Drag_Position_XY_Animated.x._value, y: this.state.Drag_Position_XY_Animated.y._value });
		this.state.Drag_Position_XY_Animated.setValue({ x: 0, y: 0 });

		Animated.spring(
			this.state.scale,
			{ toValue: 1.5, friction: 30 }
		).start();
	}

	_handlerPanResponderRelease = (e, gestureState) => {

		let is_over_target = this.props.onLeaveDrag({ posY: gestureState.moveY })

		if (is_over_target) {
			
			// This will be what it should do if is over the target
			console.warn('Is over the target')
		
		} else {

			this._animateReturnCero();
		}


		// por refactorizar bro //////////////////////////////////////////// 




	}


	_animateReturnCero = () => {
		Animated.sequence([
			Animated.sequence([
				Animated.timing(
					this.state.scale,
					{
						toValue: 0,
						duration: 1,
					}
				),
				Animated.timing(
					this.state.Drag_Position_XY_Animated,
					{
						toValue: { x: 0, y: 0 },
						duration: 1,
					}
				),
			]),
			Animated.parallel([
				// Set the lopp for the shake animation
				Animated.loop(
					// Animation consists of a sequence of steps
					Animated.sequence([
						// start rotation in one direction (only half the time is needed)
						Animated.timing(this.state.rotation, { toValue: 1.0, duration: 150, easing: Easing.linear }),
						// rotate in other direction, to minimum value (= twice the duration of above)
						Animated.timing(this.state.rotation, { toValue: -1.0, duration: 150, easing: Easing.linear }),
						// return to begin position
						Animated.timing(this.state.rotation, { toValue: 1.0, duration: 150, easing: Easing.linear }),

						Animated.timing(this.state.rotation, { toValue: 0.0, duration: 150, easing: Easing.linear })
					]), { iterations: 1 }

				),
				Animated.spring(
					this.state.scale,
					{ toValue: 1, friction: 3.5 }
				)
			])

		]).start();
	}



	componentWillReceiveProps = () => {
		this.setState({
			img: this.props.image ? this.props.image : require('../resources/img/c.png'),
		});
	}


	isDropZone = (transform) => {
		let target = this.props.dropTarget();

		console.log('Target position: ', target)
		console.log('My position: ', transform.moveX, ' : ', transform.moveY);

		if (
			transform.moveX > target.x - 30
			&& transform.moveX < target.x + target.width + 30
			&& transform.moveY > target.y - 30
			&& transform.moveY < target.y + target.width + 30
		) {
			return true;
		} else {
			return false;
		}

	}


	render() {
		let width = this.props.size;
		let height = this.props.size;

		let { Drag_Position_XY_Animated: pan, scale } = this.state;
		let translateX = pan.x;
		let translateY = pan.y;
		let rotate = this.state.rotation.interpolate({
			inputRange: [-1, 1],
			outputRange: ['-0.2rad', '0.2rad']
		});

		let dragStyles = {
			transform: [
				{ translateX },
				{ translateY },
				{ rotate },
				{ scale },
			]
		}


		return (
			<Animated.View
				style={[dragStyles, { width, height, justifyContent: 'center', alignItems: 'center' }]}
				{...this._panResponder.panHandlers}
			>
				<Image
					source={this.state.img}
					style={{ resizeMode: 'contain', flex: 1 }}
				/>
			</Animated.View>
		)
	}


}