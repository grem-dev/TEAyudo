
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

import { GenerateOperation, RandomWords } from '../controllers/randomMats';


// Importing from resources
import { words } from '../resources/resourcesLoad';



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
	centerItems: {
		alignItems: 'center', justifyContent: 'center',
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

	navBarHeight = 60;


	constructor(props) {
		super(props);
		this.state = {
			primaryWord: RandomWords.generateRandomWord(),
			secondaryWord: "",
			optionPlaced: Math.round(Math.random()),
			step: this.props.step,
		}

		this.state.secondaryWord = RandomWords.generateRandomWord(this.state.primaryWord);

		this.arrows = [];
	}

	componentDidMount = () => {
		// this.arrows.forEach(item => {
		// 	item.animateSlideUp()
		// });
		this.arrows[0].animateSlideUp(true);
		this.arrows[1].animateSlideDown(true);

		// console.log('The random value is: ', this.state.optionPlaced)
		console.log('The screen size is: ', SCREEN_HEIGHT)
	}

	componentWillReceiveProps = () => {

		let { secondaryWord, primaryWord, step, optionPlaced } = this.props;

		this.setState({
			step,
			primaryWord,
			secondaryWord,
			optionPlaced
		});


	}

	_optionCorrect = () => {
		if (Math.round(Math.random()) == 1) {
			Actions.refresh({
				key: 'couples', step: this.props.step + 1,
				primaryWord: this.state.primaryWord,
				secondaryWord: RandomWords.generateRandomWord(this.state.primaryWord),
				optionPlaced: 1
			});
		} else {
			Actions.refresh({
				key: 'couples', step: this.props.step + 1,
				primaryWord: RandomWords.generateRandomWord(this.state.primaryWord),
				secondaryWord: this.state.primaryWord,
				optionPlaced: 0
			});
		}
	}


	checkPositionDrag = ({ posY }) => {
		if (posY < (SCREEN_HEIGHT * 0.20) + this.navBarHeight) {


			if (this.state.optionPlaced == 1) {
				this._optionCorrect(1);
			} else {
				console.log('Option incorrect, do something')
			}

		} else if (posY > (SCREEN_HEIGHT * 0.80)) {

			if (this.state.optionPlaced == 0) {
				this._optionCorrect(0);
			} else {
				console.log('Option incorrect, do something')
			}
			// Actions.refresh({ key: 'couples', step: this.props.step + 1, random: Math.random() });
		} else {
			console.warn('Para ningún lado');
		}
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

