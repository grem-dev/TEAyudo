

import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import * as progressData from '../settings/progress.json'

export default class ProgressScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}




	_insertDataFromJson = () => {


	}

	render() {
		return (
			<View>
				<ScrollView>

					{this._insertDataFromJson()}

				</ScrollView>
			</View>
		);
	}
}