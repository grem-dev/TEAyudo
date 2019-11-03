import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Option, ValueContainer } from '../components/InteractableComponents';
import { GenerateOperation } from '../controllers/randomMats';
import { LayoutSheet } from './css/layout';
import { Actions } from 'react-native-router-flux';





const { width, height } = Dimensions.get('window');

const ScreenWidth = width;


const APPCOLOR2 = 'rgb(10,10,150)';
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
	absoluteCenter: {
		alignContent: 'center',
		alignItems: 'center',

	}
});


export class OperationsView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			AppColor: APPCOLOR,
			operation: new GenerateOperation(this.props.level),
			level: 1
		};
	}

	componentWillReceiveProps = () => {
		this.setState({
			operation: new GenerateOperation(this.props.level),
			level: this.props.level
		});

		this.forceUpdate();
	}
	
	componentDidMount = () => {

	}



	makeOperation = (value) => {

		let { result } = this.state.operation;

		if (value === result) {

			Actions.refresh({ level: 1 });
			return true;

		}
		// console.warn('was false')
		return false;
	}



	/**
	* @return Array of JSX.Elements with the values given
	*/
	addOperationElements = (items) => {
		let len = 0;
		items.forEach(i => {
			len++;
		});

		let num = (ScreenWidth / len) / 1.2;

		let output = items.map(element => {
			return <ValueContainer size={num} value={element} />
		});

		return output;
	}


	/**
	 * Add the operations components to the view
	 */
	insertOperation = () => {


		let { first, second, operator, flag, result } = this.state.operation;

		return (
			<View
				style={{ flexDirection: 'column', alignItems: 'center', height: '100%' }}
			>
				<View style={{
					flexDirection: 'row', height: '100%', alignItems: 'center',

				}}
				>
					{this.addOperationElements([first, operator, second, '=', '?'])}
				</View>
			</View>
		);
	}

	/**
	 * Add the options for the operations previusly added
	 */
	insertOptions = () => {

		let { extraValues } = this.state.operation;

		return (
			<View style={[LayoutSheet.flexColumn]}>
				<View style={[LayoutSheet.flexRow]}>
					{this.parOptions([0, 1], extraValues)}
				</View>
				<View style={[LayoutSheet.flexRow]}>
					{this.parOptions([2, 3], extraValues)}
				</View>
			</View>
		);

	}

	/**
	 * @Return a JSX.Element with the values Givens 
	 */
	parOptions = (positions, values) => {
		let { extraValues } = this.state.operation;
		return positions.map((item) => {
			return <Option onPress={(value) => this.makeOperation(value)} value={extraValues[item]} />
		});


	}

	render() {

		return (
			<View style={localSheet.absoluteFill}>

				<View style={[LayoutSheet.row]}>
					{this.insertOperation()}
				</View>
				<View>
					{this.insertOptions()}
				</View>

			</View>
		);
	}
}






export class MatchperView extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<View>
				<Text>
					Aquí debería ir algo importante
				</Text>
			</View>
		);
	}
}

