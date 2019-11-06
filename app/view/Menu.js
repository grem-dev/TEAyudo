
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


import { Card } from '../components/MenuComponents';





export default class Menu extends Component {


	constructor(props) {
		super(props);
		this.state = {
			options: [
				{ title: "Operaciones", description: "Acomoda las piezas", action: () => Actions.operations({ level: 1, time: 1 }) },
				{ title: "Par de letras", description: "Busca el par de cada letra", action: () => Actions.match() },
				{ title: "Pares de numeros", description: "Busca el par de cada numero" },
				{ title: "Free", description: "Busca el par de cada letra" },
			],
		};
	}


	static getDerivedStateFromProps(props){
		console.log('Not error here')
	}

	renderItem = (item) => <Card data={item} />



	render() {
		return (
			<View>
				<FlatList
					style={localSheet.container}
					data={this.state.options}
					numColumns={1}
					renderItem={({ item }) => this.renderItem(item)}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		);
	}
}



const localSheet = StyleSheet.create({
	container: {
		margin: 3,

	}
});