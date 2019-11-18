import React, {
	Component
} from 'react';

import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableWithoutFeedback,
	Animated
} from 'react-native';

import { AppColors } from '../settings/GlobalStyles'


import IconAwesome from 'react-native-vector-icons/FontAwesome'
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons'



export class MenuHorizontalScroll extends Component {

	constructor(props) {
		super(props);

		this.state = {
			enable: true,
			titleColor: this.props.titleColor ? this.props.titleColor : 'rgb(2,2, 22)',
		}
	}

	_insertItemMenu = (items) => {
		return items.map(item => {
			return <Card navigation={this.props.navigation} data={item} />
		});
	}


	render() {

		let item = this.props.item;

		return (
			<View style={{ paddingTop: 5, paddingLeft: 15 }}>
				<Text style={{ color: this.titleColor, fontSize: 25 }} >
					{item.title}
				</Text>
				<View>
					<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}  >
						{this._insertItemMenu(item.options)}
					</ScrollView>
				</View>
			</View>
		);
	}

}

export class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
			scale: new Animated.Value(0.6),
		};
	}


	componentDidMount() {

		this._animateBounce()
	}

	_animateBounce() {

		Animated.spring(
			this.state.scale, { toValue: 1, friction: 3 }
		).start()

	}

	render() {

		let { image,title, description, enabled, items, toNavigate, type } = this.state.data;
		

		let { navigate } = this.props.navigation;

		let scale = this.state.scale;

		let animatedStyles = {
			transform: [
				{ scale }
			]
		}

		if (enabled)
			return (
				<TouchableWithoutFeedback
					onPress={() => { navigate(toNavigate, { type, items }) }}
				>
					<Animated.View style={[animatedStyles, { paddingTop: 10, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }]}>
						<View style={{ elevation: 5, backgroundColor: AppColors.primary, width: 120, height: 120, borderRadius: 30 }}>
							<TouchableWithoutFeedback
								onPress={() => {
									this._animateBounce();
									navigate('InformationModal', { title: title, data: description })
								}}
							>
								<View style={{ position: 'absolute', right: 10, top: 10 }} >
									<IconComunity name="information-outline" size={33} color={AppColors.secondary} />
								</View>
								<View   
									style={{ position: 'absolute', right: 10, bottom: 10 }}
								>
								{/* <Image style={{}} source={image}/> */}
								</View>
							</TouchableWithoutFeedback>

						</View>
						<View
							style={{
								elevation: 10, borderRadius: 10, alignItems: 'center',
								justifyContent: 'center', translateY: -20, backgroundColor: AppColors.secondary,
								width: 80, minHeight: 40
							}}
						>
							<Text style={{ color: AppColors.textOverColor }}>
								{title}
							</Text>
						</View>
					</Animated.View>

				</TouchableWithoutFeedback >
			);
		else {
			return (
				<TouchableWithoutFeedback >
					<Animated.View style={[animatedStyles, { paddingTop: 10, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }]}>
						<View style={{ elevation: 1, backgroundColor: AppColors.primaryDark, width: 120, height: 120, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
							<IconComunity name="lock-alert" size={50} color={AppColors.secondaryLight} />

						</View>
						<View
							style={{
								elevation: 3, borderRadius: 10, alignItems: 'center',
								justifyContent: 'center', translateY: -20, backgroundColor: AppColors.secondary,
								width: 80, minHeight: 40
							}}
						>
							<Text style={{ color: AppColors.textOverColor }}>
								{title}
							</Text>
						</View>
					</Animated.View>

				</TouchableWithoutFeedback >
			);
		}

	}
}






const localSheet = StyleSheet.create({
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
	},

})