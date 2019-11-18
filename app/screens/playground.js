
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
	TouchableOpacity,
	Animated
} from 'react-native';


import Icon from 'react-native-vector-icons/AntDesign';


// Importhig local components
import { Option, ValueContainer, Draggable } from '../components/InteractableComponents';
import { AnimatedIcon } from '../components/AnimatedComponents';

import { GenerateOperation, RandomWords } from '../controllers/randomMats';


// Importing from resources
import { words, animals, fruits } from '../resources/resourcesLoad';



//  Importhing StyleSheets
import {
	LayoutSheet,
	TestSheet
} from './css/layout';

import { APP_MAIN_COLOR } from '../settings/GlobalStyles';



const DEVICE_SCREEN_HEIGHT = Dimensions.get('window').height;
const DEVICE_SCREEN_WIDTH = Dimensions.get('window').width;


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

		borderRadius: 5, backgroundColor: 'rgba(255,255,255,0)',
		// elevation: 2,
	},
	centerItems: {
		alignItems: 'center', justifyContent: 'center',
	}


});




/// ================================================================================================
/// ================================================================================================
/// ================================================================================================
/// ================================================================================================
/// ================================================================================================




export class OperationsScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			AppColor: APP_MAIN_COLOR,
			operation: new GenerateOperation(this.props.level),
			level: 1,
			time: this.props.time,
		};

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

			return <ValueContainer color="white" valueSize={50} value={element} />
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
				<ValueContainer color="white" valueSize={50} value={item} />
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


/// =================================================================================================
/// =================================================================================================
/// =================================================================================================
/// =================================================================================================



export class CouplesScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			generator: new RandomWords(this.props.navigation.state.params.type, this.props.navigation.state.params.items),
			primaryElement: 'a',
			secondaryElement: 'b',
			imgDraggable: null,
			optionPlaced: 1,
			step: 1,
		}

		this.state.correct = this.state.primaryElement;

		this.state.primaryElement = this.state.generator.generate();
		this.state.secondaryElement = this.state.generator.generate(this.state.primaryElement);

		this.state.middleImage = this.state.generator.getImage(this.state.primaryElement);

		console.log(this.state.primaryElement)
		console.log(this.state.middleImage)
		this.arrows = [];
	}

	componentDidMount = () => {


		this.arrows[0].animateSlideUp(true);
		this.arrows[1].animateSlideDown(true);

		// console.log('This is my step: ', this.state)

		// console.log('The random value is: ', this.state.optionPlaced)

	}




	shouldComponentUpdate() {
		// console.log('I have new props bro: ', this.state)

		return true;
	}



	/**
	 * Make the benhaviur components when the responde is correct
	 */
	_optionCorrect = () => {
		if (Math.round(Math.random()) == 1) {

			this.props.navigation.navigate('ModalWin', { OnBackCallBack: this._OnBackCallBack });

		} else {
			this.props.navigation.navigate('ModalWin', { OnBackCallBack: this._OnBackCallBack });
		}
	}


	/**
	 * Is called before the modal screen pop()
	 * This function is passed to another function and detect when is getting back.
	 * 
	 */
	_OnBackCallBack = () => {


		// Se comprueva si es neceseario cambiar datos al alcanzar las 7 interacciones
		if (this.state.step >= 7) {

			let newItem = this.state.generator.generate(this.state.primaryElement);
			let newStep = 1;
			let correct = newItem;
			console.log('this are my new element: ', { newItem, newStep, correct });

			this.setState({
				primaryElement: newItem,
				secondaryElement: this.state.generator.generate(newItem),
				step: newStep,
				middleImage: this.state.generator.getImage(newItem),
				optionPlaced: 1,
				correct,
			});


		} else {
			let newStep = this.state.step + 1;

			this.setState({
				primaryElement: this.state.primaryElement,
				secondaryElement: this.state.secondaryElement,
				step: newStep,
				optionPlaced: this.state.optionPlaced == 1 ? 0 : 1,
			});
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

		let aux = 'default';

		if (this.state.optionPlaced == pos) {

			aux = this.state.primaryElement;
			aux[0].toLocaleUpperCase();
			// letter = (aux in words) ? words[aux] : words.c;
			// console.log('The primary was added: ', aux)
		} else {
			aux = this.state.secondaryElement;

			aux[0].toLocaleUpperCase();
			// letter = (aux in words) ? words[aux] : words.c;
			// console.log('The secondary was added: ', aux)
		}

		return (
			// Here will be an animated componen imporrted from components folder
			// <Image style={{ resizeMode: 'contain', flex: 1 }} source={letter} />
			<Text style={{ fontSize: 20, color: 'white' }}>  {aux} </Text>
		);
	}

	/**
	 * You know the function of this xD
	 */
	render() {





		return (
			<View style={localSheet.absoluteFill}>


				<View style={[{ flex: 1 }, localSheet.centerItems]}>

					<View style={[{ width: '100%', height: 75 }, localSheet.centerItems]}>
						{/* <Animated.View opacity={this.state.opacity} style={{ position: 'absolute', borderRadius: 30 ,height: 60, width: 60, backgroundColor: 'black' }} ></Animated.View> */}
						{this.insertOption(1)}
					</View>

				</View>
				{/*  ======================================================  */}
				<View style={[{ flex: 2, zIndex: 100, alignItems: 'center', justifyContent: 'space-between' }]}>

					<AnimatedIcon refer={this.getRefer} type="SlideUp" name='arrowup' size={80} color='rgba(255,255,255,0.1)' />
					<Draggable onLeaveDrag={this.checkPositionDrag} size={90} image={this.state.middleImage} />
					<AnimatedIcon refer={this.getRefer} type="SlideDown" name='arrowdown' size={80} color='rgba(255,255,255,0.1)' />

				</View>
				{/*  ======================================================  */}
				<View style={[{ flex: 1, zIndex: 1 }, localSheet.centerItems]}>
					<View style={[{ width: '100%', height: 75 }, localSheet.centerItems]}>
						{this.insertOption(0)}
					</View>
				</View>
				<Text>{this.state.step}</Text>
			</View>
		);
	}
}