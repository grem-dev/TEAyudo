
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


import Icon from 'react-native-vector-icons/AntDesign';


// Importhig local components
import { Option, ValueContainer, Draggable } from '../components/InteractableComponents';
import { AnimatedIcon } from '../components/AnimatedComponents';

import { GenerateOperation, RandomWords } from '../controllers/randomMats';


// Importing from resources
import { words } from '../resources/resourcesLoad';



//  Importhing StyleSheets
import {
	LayoutSheet,
	TestSheet
} from './css/layout';




const DEVICE_SCREEN_HEIGHT = Dimensions.get('window').height;
const DEVICE_SCREEN_WIDTH = Dimensions.get('window').width;
const APP_MAIN_COLOR = 'rgb(50,50,170)';


const localSheet = StyleSheet.create({
	absoluteFill: {
		backgroundColor: APP_MAIN_COLOR,
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
	centerItems: {
		alignItems: 'center', justifyContent: 'center',
	}


});



export class OperationsView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			AppColor: APP_MAIN_COLOR,
			operation: new GenerateOperation(this.props.level),
			level: 1,
			time: this.props.time,
		};

	}


	// UNSAFE_componentWillReceiveProps = () => {

	// 	this.setState({
	// 		operation: new GenerateOperation(this.props.level),
	// 		level: this.props.level,
	// 		time: this.props.time,
	// 	});
	// 	// console.log('Nuevos datos: time is: ', this.props.time)
	// }


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

			// Actions.refresh({ level: newLevel, time: newTime });
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




export class CouplesScreen extends Component {

	navBarHeight = 0;


	constructor(props) {
		super(props);
		this.state = {
			primaryWord: this.props.primaryWord ? this.props.primaryWord : RandomWords.generateRandomWord(),
			secondaryWord: "",
			optionPlaced: Math.round(Math.random()),
			step: this.props.step,
		}

		this.state.secondaryWord = RandomWords.generateRandomWord(this.state.primaryWord);

		this.arrows = [];
	}

	componentDidMount = () => {
		;
		this.arrows[0].animateSlideUp(true);
		this.arrows[1].animateSlideDown(true);

		console.log('The random value is: ', this.state.optionPlaced)

	}

	componentWillUnmount() {
		console.log('Seré desmontado couples')
	}

	shouldComponentUpdate() {
		console.log('I have new props bro')
	}



	/// <sumary>
	///	Section divider
	/// </summary>



	/**
	 * Make the benhaviur components when the responde is correct
	 */
	_optionCorrect = () => {
		if (Math.round(Math.random()) == 1) {


			this.props.navigation.setParams({ step: this.state.step + 1 })

			// Refresh with the same data

		} else {
			// Refresh with the data fliped
		}
	}


	checkPositionDrag = ({ posY }) => {
		if (posY < (DEVICE_SCREEN_HEIGHT * 0.20)) {


			if (this.state.optionPlaced == 1) {
				this._optionCorrect(1);
				return true;
			}

		} else if (posY > (DEVICE_SCREEN_HEIGHT * 0.80)) {

			if (this.state.optionPlaced == 0) {
				this._optionCorrect(0);
				return true;
			}

		}

		return false;
	}


	getRefer = (object) => {
		this.arrows.push(object);
	}



	insertOption = (pos) => {


		if (this.state.optionPlaced == pos) {

			let aux = this.state.primaryWord.toLocaleLowerCase() + '_whitefill';
			letter = (aux in words) ? words[aux] : words.c;
			// console.log('The primary was added: ', aux)
		} else {
			let aux = this.state.secondaryWord.toLocaleLowerCase() + '_whitefill';
			letter = (aux in words) ? words[aux] : words.c;
			// console.log('The secondary was added: ', aux)
		}

		return (
			// Here will be an animated componen imporrted from components folder
			<Image style={{ resizeMode: 'contain', flex: 1 }} source={letter} />
		);
	}

	/**
	 * You know the function of this xD
	 */
	render() {





		return (
			<View style={localSheet.absoluteFill}>
				<View style={{ backgroundColor: 'green', height: this.navBarHeight, width: '100%' }}>
					<Text>Algo para rellear</Text>
				</View>

				<View style={[{ flex: 1 }, localSheet.centerItems]}>

					<View style={[{ width: 75, height: 75 }, localSheet.centerItems]}>
						{this.insertOption(1)}
					</View>

				</View>
				{/*  ======================================================  */}
				<View style={[{ flex: 2, zIndex: 100, alignItems: 'center', justifyContent: 'space-between' }]}>

					<AnimatedIcon refer={this.getRefer} type="SlideUp" name='arrowup' size={80} color='rgba(255,255,255,0.1)' />
					<Draggable onLeaveDrag={this.checkPositionDrag} size={90} image={words[this.state.primaryWord.toLocaleLowerCase()]} />
					<AnimatedIcon refer={this.getRefer} type="SlideDown" name='arrowdown' size={80} color='rgba(255,255,255,0.1)' />

				</View>
				{/*  ======================================================  */}
				<View style={[{ flex: 1, zIndex: 1 }, localSheet.centerItems]}>
					<View style={[{ width: 75, height: 75 }, localSheet.centerItems]}>
						{this.insertOption(0)}
					</View>
				</View>

			</View>
		);
	}
}