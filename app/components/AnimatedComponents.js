import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

const { interpolate } = Animated;

export class AnimatedIcon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			yPos: new Animated.Value(0),
			opacity: new Animated.Value(1),
		};


	}


	componentDidMount = () => {
		this.props.refer(this)
		// switch (this.props.type) { 
		// 	case "SlideUp":
		// 		this.animateSlideUp()
		// 		break;
		// 	case "SlideDown":
		// 		this.animateSlideDown()
		// 		break;
		// 	default:
		// 		console.log('pos no fue nada');
		// 		break;
		// }

	}

	/**
	 * @Parameter {cicle:boolean} determine if the function is cyclic
	 */
	animateSlideUp = (cicle = false) => {

		// console.log('fuí llamado')

		this.curretnAnimation = Animated.loop(
			// Animation consists of a sequence of steps
			Animated.sequence([
				Animated.timing(
					this.state.yPos,
					{
						toValue: -25,
						duration: 1500,
						easing: Easing.elastic(2.5)
					}
				),
				Animated.timing(
					this.state.yPos,
					{
						toValue: 0,
						duration: 1000,
						easing: Easing.elastic(1)
					}
				)
			])
		).start();


	}

	/**
	 * @Parameter {cicle:boolean} determine if the function is cyclic
	 */
	animateSlideDown = (cicle = false) => {


		this.curretnAnimation = Animated.loop(
			// Animation consists of a sequence of steps
			Animated.sequence([
				Animated.timing(
					this.state.yPos,
					{
						toValue: 25,
						duration: 1500,
						easing: Easing.elastic(2.5)
					}
				),
				Animated.timing(
					this.state.yPos,
					{
						toValue: 0,
						duration: 1000,
						easing: Easing.elastic(1)
					}
				)
			])
		).start();

	}

	animateHide = () => {
		Animate.timing(
			this.state.opacity,
			{
				toValue: 0,
				duration: 400
			}
		).start();
	}

	animateShow = () => {
		Animate.timing(
			this.state.opacity,
			{
				toValue: 1,
				duration: 400
			}
		).start();
	}

	render() {

		let animatedStyle = [
			transform = {
				translateY: this.state.yPos,
			}
		]

		let { name, size } = this.props;
		let color = this.props.color ? this.props.color : 'black';

		return (
			<Animated.View
				style={[animatedStyle, { height: size, width: size }]}
			>
				<Icon style={{}} name={name} size={size} color={color} />
			</Animated.View>
		);
	}
}
