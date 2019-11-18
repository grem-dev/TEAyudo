

import React, { Component } from 'react';
import { Text, View, Animated } from 'react-native';

import { Header } from '../components/Header'

import Icon from 'react-native-vector-icons/FontAwesome';


import { AppColors } from '../settings/GlobalStyles';

export class ModalWinScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scale: new Animated.Value(1),
            opacity: new Animated.Value(1),
        }
    }




    componentDidMount = () => {

        this.props.navigation.state.params.OnBackCallBack();
        // console.warn('Modal montada')w

        Animated.sequence([
            Animated.timing(this.state.scale, { toValue: 1.4, duration: 500 }),
            Animated.timing(this.state.scale, { toValue: 1, duration: 300 }),
            Animated.parallel([
                Animated.timing(this.state.opacity, { toValue: 0, duration: 500 }),
                Animated.timing(this.state.scale, { toValue: 20, duration: 500 }),
            ])
            // Animated.timing(this.state.scale, { toValue: 1, duration: 300 }),
        ]).start(() => {

            // console.log(this.props.navigation.state.params);

            this.props.navigation.pop()

        })


    }



    render() {
        let { scale } = this.state;


        let dragStyles = {
            transform: [

                { scale },
            ],

        }


        return (
            <View style={[{ backgroundColor: AppColors.primary, alignItems: 'center', justifyContent: 'center', flex: 1 }]}>
                <Animated.View opacity={this.state.opacity} style={[{ backgroundColor: 'white', elevation: 8, width: 150, height: 150, borderRadius: 75, justifyContent: 'center', alignItems: 'center' }, dragStyles]}>
                    <Icon name="check" color="rgb(20,150,20)" size={80} />
                </Animated.View>
            </View>
        )
    }
}



export class InformationModalScreen extends Component {



    render() {

        let { title, data } = this.props.navigation.state.params;
        
        return (
            <View style={{ flex: 1, backgroundColor: AppColors.background }}>
                <Header navigation={this.props.navigation} onBack={true} title={title} />
                <Text style={{ color: AppColors.textOverColorLight, padding: 15, fontSize: 16 }} >
                    {data}
                </Text>
            </View>
        );
    }
}