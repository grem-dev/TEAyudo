import React, {
	Component
} from 'react';

import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';



export class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fillHeight: 20,
		};
	}

	render() {

		let { title, description, action } = this.props.data;
		let height = (this.state.fillHeight / 3) * 2;

		return (
			<TouchableOpacity
				key={() => this.props.key}
				onLongPress={() => {
					console.warn('LongPress');
				}}
				onLayout={event => {
					let layout = event.nativeEvent.layout;
					this.setState({ fillHeight: layout.width });
				}}
				style={localSheet.container}
				onPress={action}
			>
				<Text style={localSheet.title}> {title} </Text>
				<View style={[localSheet.img, { height }]}>
					<Text  > {description} </Text>
				</View>
			</TouchableOpacity>
		);
	}
}





/**
 * This component is not in use jet.
 */
export class OptionMenu extends Component {


	constructor(props) {
		super(props)

		this.state = {
			options: this.props.options,
			numColumns: this.props.numColumns ? this.props.numColumns : 1,

		}
	}


	/** 
	* Just for testing now
	* it will test if the element should reder
	*/
	UNSAFE_componentWillReceiveProps = () => {
		console.log('new props is comming');
	}



	/**
	 * @Parameters item : JSX.Text into the element returned
	 * 
	 * @Return an JSX.Element 
	 */
	renderItemMenu = (item) => {

		return (
			<TouchableOpacity
				style={localSheet.menuOption}
				onPress={() => this.props.onPressItem(item)}
			>
				<Text style={{ fontSize: 40 }} >{item}</Text>
			</TouchableOpacity>
		);
	}


	render() {
		console.log(this.state.options)

		return (
			<View></View>
		);
	}

}


const localSheet = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		borderRadius: 5,
		elevation: 2,
		margin: 5,
		padding: 5,
		backgroundColor: 'rgb(255, 255, 255)',

	},
	row: {

	},
	title: {
		fontSize: 17,
	},
	img: {
		backgroundColor: 'rgb(100,100,100)',
	},

})