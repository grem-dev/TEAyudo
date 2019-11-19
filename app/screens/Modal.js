

import React, { Component } from 'react';
import { Text, View, Animated, TouchableWithoutFeedback } from 'react-native';

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

    constructor(props) {
        super(props);

        this.state = {

        }
    }


    static getDerivedStateFromProps(nextProps) {
        return { ...nextProps }
    }

    render() {

        // let { title, data } = this.props.navigation.state.params;

        return (
            <View style={{ width: '70%', height: '60%', backgroundColor: AppColors.background, elevation: 20 }}>
                <Icon name="close" size={30} color={AppColors.secondary} />
                <Text>
                    Esté contenido no se encuentra disponible
                </Text>
            </View>
        );
    }
}


export class ModalToBuy extends Component {




    render() {




        return (
            <View
                style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', alignItems: 'center', justifyContent: 'center' }}
            >
            
                <View style={{ width: '70%', height: '60%', backgroundColor: AppColors.background, elevation: 20, zIndex: 20, borderRadius: 15 }}>
                    <TouchableWithoutFeedback >
                        <Icon name="close" size={24} color={AppColors.secondary} />
                    </TouchableWithoutFeedback>
                    
                </View>
            </View>
        );
    }
}