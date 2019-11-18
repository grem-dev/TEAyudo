import React, {
	Component
} from 'react';

import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';


export class Option extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {

		const { title, description, action } = this.props.data;


		return (
			<TouchableOpacity
				style={sheet.container}
				onPress={action}
			>
				<Text style={sheet.title}> {title} </Text>
				<Text  > {description} </Text>
			</TouchableOpacity>
		);
	}
}


const sheet = StyleSheet.create({
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
		
	}
})