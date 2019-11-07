
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
				{ title: "Operaciones", description: "Acomoda las piezas - Aquí debe ir una imagen o no sé que quiera la banda", action: () => Actions.operations({ level: 1, time: 1 }) },
				{ title: "Par de letras", description: "Busca el par de cada letra - Aquí debe ir una imagen o no sé que quiera la banda", action: () => Actions.match() },
				{ title: "Pares de numeros", description: "Busca el par de cada numero - Aquí debe ir una imagen o no sé que quiera la banda" },
				{ title: "Free", description: "Busca el par de cada letra - Aquí debe ir una imagen o no sé que quiera la banda" },
			],
		};
	}


<<<<<<< HEAD
	static getDerivedStateFromProps(props){
		console.log('Not error here')
	}

	renderItem = (item) => <Card data={item} />
=======
	renderItem = (item,key) => <Card data={item} key={key} />
>>>>>>> aa868ee3d235489704374d3e6b281e9766676c5d



	render() {
		return (
			<View>
				<FlatList
					style={localSheet.container}
					data={this.state.options}
					numColumns={1}
					renderItem={({ item, key }) => this.renderItem(item,key)}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		);
	} // End of the render method
}



const localSheet = StyleSheet.create({
	container: {
		margin: 3,

	}
});