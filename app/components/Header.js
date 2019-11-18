import React, { Component } from 'react'
import { Text, View, Animated, TouchableWithoutFeedback } from 'react-native'

import { AppColors } from '../settings/GlobalStyles'

import IconAnt from 'react-native-vector-icons/AntDesign'


/**
 * @params onBack : boolean if you use onBack you need to pass a navigation element
 */
export class Header extends Component {

    _insertLeftIcon = () => {


        if (this.props.onBack === true) {
            return (
                <TouchableWithoutFeedback
                    onPress={() => { this.props.navigation.goBack(); }}
                >
                    <IconAnt name="closecircle" size={50} color={AppColors.secondary} style={{ position: 'absolute', top: 15, right: 15, zIndex: 3 }} />

                </TouchableWithoutFeedback>
            );
        }
        return;
    }



    render() {

        let height = this.props.height;

        return (
            <Animated.View style={{ backgroundColor: 'rgba(0,0,0,0)', height, paddingLeft: 15, paddingTop: 30, justifyContent: 'flex-start' }}>
                {this._insertLeftIcon()}

                <Text style={{ fontSize: 35, fontWeight: 'bold', color: this.props.titleColor }}>{this.props.title}</Text>
            </Animated.View>
        )
    }
}
