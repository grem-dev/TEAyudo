
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
	Image,
	TouchableOpacity
} from 'react-native';

import {
	Actions
} from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/AntDesign';


// Importhig local components
import { Option, ValueContainer, Draggable } from '../components/InteractableComponents';
import { AnimatedIcon } from '../components/AnimatedComponents';

import { GenerateOperation } from '../controllers/randomMats';


//  Importhing StyleSheets
import {
	LayoutSheet,
	TestSheet
} from './css/layout';




const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const APPCOLOR = 'rgb(50,50,170)';


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
		alignItems: 'center', justifyContent: 'center',
		width: '47.5%', height: '44%', margin: 5,

		borderRadius: 5, backgroundColor: 'rgb(255,255,255)',
		elevation: 2,
	},


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

	}



	UNSAFE_componentWillReceiveProps = () => {

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



	_insertOptions = () => {

		let { options } = this.state.operation;

		let output = options.map((item) => {
			return this.renderItemMenu(item);
		});

		return output;
	}




	/**
	 * Render the items of the falt list wich is the option menu
	 * @Retrun JXR.Element with the value given
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

		return (
			<View style={localSheet.absoluteFill}>

				<View style={[{ flex: 2 }]}>
					{this.insertOperation()}
				</View>
				<View style={[{ flex: 1, flexWrap: 'wrap', alignItems: 'flex-start' }]}>
					{this._insertOptions()}
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

		this.getRefer.bind(this);
		this.arrows = [];
	}

	componentDidMount = () => {
		// this.arrows.forEach(item => { 
		// 	item.animateSlideUp()
		// });
		this.arrows[0].animateSlideUp(true);
		this.arrows[1].animateSlideDown(true);
	}

	checkPositionDrag = () => {

	}


	getRefer = (object) => {
		this.arrows.push(object);
	}


	/**
	 * You know the function of this xD
	 */
	render() {
		return (
			<View style={localSheet.absoluteFill}>

				<View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }, TestSheet.red]}>

					<View style={{ width: 50, height: 50, backgroundColor: 'red' }}>

					</View>

				</View>
				{/*  ======================================================  */}
				<View style={[{ flex: 3, zIndex: 100, alignItems: 'center', justifyContent: 'space-between' }]}>

					<AnimatedIcon refer={this.getRefer} type="SlideUp" name='arrowup' size={50} color='rgba(255,255,255,0.5)' />
					<Draggable upDrag={this.checkPositionDrag} imgURI={require('../resources/img/c.png')} />
					<AnimatedIcon refer={this.getRefer} type="SlideDown" name='arrowdown' size={50} color='rgba(255,255,255,0.5)' />

				</View>
				{/*  ======================================================  */}
				<View style={[{ flex: 1, zIndex: 1, alignItems: 'center', justifyContent: 'center' }, TestSheet.yellow]}>
					<View style={{ width: 50, height: 50, backgroundColor: 'red' }}>

					</View>
				</View>

			</View>
		);
	}
}

