
/**
 * Default import systems
 */
import React, {
	Component
} from 'react';

import {
	Dimensions,
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity
} from 'react-native';

import {
	Actions
} from 'react-native-router-flux';


// Importhig local components
import { Option, ValueContainer, Draggable } from '../components/InteractableComponents';
import { OptionMenu } from '../components/MenuComponents';
import { GenerateOperation } from '../controllers/randomMats';


//  Importhing StyleSheets
import {
	LayoutSheet,
	TestSheet
} from './css/layout';


const APPCOLOR = 'rgb(245,245,255)';


const localSheet = StyleSheet.create({
	absoluteFill: {
		backgroundColor: APPCOLOR,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	menuOption: {
		flex: 1, backgroundColor: 'white',
		elevation: 5, borderRadius: 3, margin: 4, justifyContent: 'center',
		alignItems: 'center', minHeight: 100, flexDirection: 'row'
	}

});


export class OperationsView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			AppColor: APPCOLOR,
			operation: new GenerateOperation(this.props.level),
			level: 1,
			time: this.props.time,
		};

		console.log(this.state.time)
	}


	componentWillReceiveProps = () => {
		this.setState({
			operation: new GenerateOperation(this.props.level),
			level: this.props.level,
			time: this.props.time,
		});

		// console.log('Nuevos datos: time is: ', this.props.time)

	}

	/**
	 * Make tha comparison between the number given and the response of the current operation
	 */
	makeOperation = (value) => {

		let { result } = this.state.operation;

		if (value === result) {

			let newTime = this.props.time + 1;
			let newLevel = this.props.level;

			if (newTime > 7) {
				newTime = 1;
				newLevel = this.state.level + 1;
			}

			Actions.refresh({ level: newLevel, time: newTime });
			return true;

		}
		// console.warn('was false')
		return false;
	}


	/**
	* @return Array of JSX.Elements with the values given
	*/
	addOperationElements = (items) => {

		let output = items.map(element => {
			return <ValueContainer valueSize={50} value={element} />
		});

		return output;
	}


	/**
	 * Add the operations components to the view
	 */
	insertOperation = () => {


		let { first, second, operator, result } = this.state.operation;

		return (
			<View
				style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
			>
				<View style={{ flexDirection: 'row' }}>
					{this.addOperationElements([first, operator, second, '=', '?'])}
				</View>
			</View>
		);
	}


	/**
	 * Render the items of the falt list wich is the option menu
	 */
	renderItemMenu = (item) => {

		return (
			<TouchableOpacity
				style={localSheet.menuOption}
				onPress={() => this.makeOperation(item)}
			>
				<ValueContainer valueSize={50} value={item} />
			</TouchableOpacity>
		);
	}

	render() {
		let { options } = this.state.operation;

		return (
			<View style={localSheet.absoluteFill}>

				<View style={[{ flex: 2 }]}>
					{this.insertOperation()}
				</View>
				<View style={[{ flex: 1 }]}>
					<FlatList
						numColumns={2}
						data={options}
						renderItem={({ item }) => {
							return this.renderItemMenu(item);
						}}

					/>
				</View>

			</View>
		);
	}
}






export class MatchView extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}







	/**
	 * You know the function of this xD
	 */
	render() {
		return (
			<View style={localSheet.absoluteFill}>

				<View style={[{ flex: 1 }, TestSheet.red]}>

				</View>
				<View style={[{ flex: 3, alignItems: 'center', justifyContent: 'center'}, TestSheet.green]}>
					<Draggable />
				</View>
				<View style={[{ flex: 1 }, TestSheet.yellow]}>

				</View>

			</View>
		);
	}
}

