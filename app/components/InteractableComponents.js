

import React, {
	Component
} from 'react';

import {
	Text, View, StyleSheet,
	Animated, TouchableOpacity,
	PanResponder, Image
} from 'react-native';

import { TestSheet, LayoutSheet } from '../view/css/layout';



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


export class ValueContainer extends Component {

	constructor(props) {
		super(props)
		this.state = {
			fontSize: new Animated.Value(this.props.valueSize),
			value: new Animated.Value(2)
		}
	}



	UNSAFE_componentWillReceiveProps = () => {
		this.animateStart();
	}

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


export class Draggable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isOnPlace: false,
			pan: new Animated.ValueXY(),
			scale: new Animated.Value(1),
			imageURI: this.props.imgURI ? this.props.imgURI : require('../resources/img/b.png'),
		};


		this._panResponder = PanResponder.create({
			onMoveShouldSetResponderCapture: () => true,
			onMoveShouldSetPanResponderCapture: () => true,

			//  Is called when the PanGesture Start to respond
			onPanResponderGrant: (e, gestureState) => {
				this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
				this.state.pan.setValue({ x: 0, y: 0 });

				Animated.spring(
					this.state.scale,
					{ toValue: 1.5, friction: 30 }
				).start();

			},

			// When the animation is happening
			onPanResponderMove: Animated.event([
				null, { dx: this.state.pan.x, dy: this.state.pan.y },
			]),

			/**
			* Is called when the PanGesture has ended
			* For now just reset the animated values != does not check if is on drag area
			*/
			onPanResponderRelease: (e, gestureState) => {

				// For now this compoene only return the component to the origina position|

				console.log(gestureState.moveY)


				Animated.spring(
					this.state.pan,
					{ toValue: { x: 0, y: 0, }, speed: 3 }
				).start();

				// Animaciones por clasificar
				Animated.spring(
					this.state.scale,
					{ toValue: 1, friction: 50 }
				).start();

			}

		});
	} // End of the Constructor





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
		let width = 50;
		let height = 50;

		let { pan, scale } = this.state;
		let translateX = pan.x;
		let translateY = pan.y;
		let rotate = '0deg';

		let dragStyles = {
			transform: [
				{ translateX },
				{ translateY },
				{ rotate },
				{ scale },
			]
		}

		let img = this.props.imgURI;

		return (
			<Animated.View
				style={[dragStyles, { width, height, justifyContent: 'center', alignItems: 'center' }]}
				{...this._panResponder.panHandlers}
			>
				<Image
					source={img}
					style={{ resizeMode: 'contain', flex: 1 }}
				/>
			</Animated.View>
		)
	}


}