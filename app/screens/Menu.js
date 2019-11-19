
/*
* 	GremDev
*	greminoficial@gmail.com
*	GH: GreminOficial
*/


import React, {
    Component
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';


import { MenuHorizontalScroll } from '../components/MenuComponents';
import { Header } from '../components/Header';
import { ModalToBuy } from './Modal';
import { AppColors } from '../settings/GlobalStyles';

import { Tree } from '../settings/MenuOptions'
import { } from 'react-native-gesture-handler';


export default class MenuScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            optionsMenu: Tree,
            isModalVisible: true,
            modalOpacity: 1,
        };
    }

    /**
     * @Return an array of JSX:Elements
     */
    _insertItemsMenu = () => {

        return this.state.optionsMenu.map((item, key) => {
            return (
                <MenuHorizontalScroll key={key} itemBlokedOnPress={() => this.setModalVisible(!this.state.isModalVisible)} titleColor={AppColors.textOverColorLight} navigation={this.props.navigation} item={item} />
            );
        });
    }


    setModalVisible = (newStateVisibility) => {

        console.log('Pos me llamaron')
        this.setState({
            isModalVisible: newStateVisibility,

        })
    }




    render() {
        return (
            <View style={{ backgroundColor: AppColors.background, flex: 1 }}>
                <ScrollView style={{}} showsVerticalScrollIndicator={false} >
                    <Header titleColor={AppColors.textOverColorLight} title="Menú" />
                    {this._insertItemsMenu()}
                </ScrollView>
{/* 
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isModalVisible}

                >
                    <ModalToBuy onClose={() => this.setModalVisible(!this.state.isModalVisible)} />

                </Modal> */}


            </View >
        );
    } // End of the render method
}




