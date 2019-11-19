import React, {
	Component
} from 'react';

import {
	View,
	Text,
	Image,
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
		return items.map((item, key) => {
			return <Card key={key} itemBlokedOnPress={this.props.itemBlokedOnPress} navigation={this.props.navigation} data={item} />
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

		let { image, title, description, enabled, items, toNavigate, type } = this.state.data;
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
					<Animated.View
						style={[animatedStyles, localSheet.cardMenuStyle]}>

						<Text style={{ position: 'absolute', top: 10, color: 'rgba(255,255,255,0.9)', fontSize: 19, left: 5 }} > {title} </Text>


						{/* <TouchableWithoutFeedback
							onPress={() => {
								this._animateBounce();
								navigate('InformationModal', { title: title, data: description })
							}}
						>
							<View style={{ position: 'absolute', right: 0, top: 0 }} >
								<IconComunity name="information-outline" size={35} color={AppColors.secondary} />
							</View>
						</TouchableWithoutFeedback> */}

						<View opacity={0.25} style={{ position: 'absolute', bottom: 10, right: 10, height: 45, width: 45, zIndex: 20 }}>
							<Image style={{ resizeMode: 'center', width: '100%', height: '100%' }} source={image} />
						</View>

					</Animated.View>

				</TouchableWithoutFeedback >
			);
		else {
			return (
				<TouchableWithoutFeedback
					onPress={() => { this.props.itemBlokedOnPress() }}
				>
					<Animated.View
						style={[animatedStyles, localSheet.cardMenuStyle]}>

						<Text style={{ position: 'absolute', top: 10, color: 'white', fontSize: 19, left: 5 }} > {title} </Text>


						{/* <TouchableWithoutFeedback
							onPress={() => {
								this._animateBounce();
								navigate('InformationModal', { title: title, data: description })
							}}
						>
							<View style={{ position: 'absolute', right: 0, top: 0 }} >
								<IconComunity name="information-outline" size={35} color={AppColors.secondary} />
							</View>
						</TouchableWithoutFeedback> */}

						{/* <View opacity={0.25} style={{ position: 'absolute', bottom: 10, right: 10, height: 45, width: 45, zIndex: 20 }}>
							<Image style={{ resizeMode: 'center', width: '100%', height: '100%' }} source={image} />
						</View> */}

						<View style={{ width: 90, height: 90, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
							<IconComunity name="lock-alert" size={50} color='white' />
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
	cardMenuStyle: {
		paddingTop: 10, paddingHorizontal: 10,
		marginRight: 12, marginTop: 15, marginBottom: 20,
		elevation: 4,
		alignItems: 'center', justifyContent: 'center',
		width: 140, height: 110, borderRadius: 10, backgroundColor: AppColors.primary,

	}
})