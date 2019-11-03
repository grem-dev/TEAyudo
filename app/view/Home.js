
/*
* 	GremDev
*	greminoficial@gmail.com
*	GH: GreminOficial
*/


import React, {
	Component
} from 'react';

import {
	View,
	Text,
	StyleSheet,
	FlatList
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { GenerateOperation } from '../controllers/randomMats'

import { Card } from '../components/MenuComponents';





export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: [
				{ title: "Operaciones", description: "Acomoda las piezas", action: () => Actions.operations({level:1}) },
				{ title: "Par de letras", description: "Busca el par de cada letra" },
				{ title: "Par de letras", description: "Busca el par de cada letra" },
				{ title: "Pares de numeros", description: "Busca el par de cada numero" }
			],
		};
	}


	renderItem = (item) => <Card data={item} />

	render() {
		return (
			<View>
				<FlatList
					style={sheet.container}
					data={this.state.options}
					numColumns={1}
					renderItem={({ item }) => this.renderItem(item)}
				/>
			</View>
		);
	}
}



const sheet = StyleSheet.create({
	container: {
		margin: 3,
		backgroundColor: 'rgb(200,100,33)',
	}
});