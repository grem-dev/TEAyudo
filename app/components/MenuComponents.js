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
			fillHeight: 100,
		};
	}

	render() {

		let { title, description, action } = this.props.data;
		let height = (this.state.fillHeight / 3) * 2;

		return (
			<TouchableOpacity
				onLongPress={() => {
					console.warn('LongPress');
				}}
				onLayout={event => {
					let layout = event.nativeEvent.layout;
					this.setState({ fillHeight: layout.width });
				}}
				style={sheet.container}
				onPress={action}
			>
				<Text style={sheet.title}> {title} </Text>
				<View style={[sheet.img, { height }]}>
					<Text  > {description} </Text>
				</View>
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
		backgroundColor: 'rgb(100,100,100)',
	}
})