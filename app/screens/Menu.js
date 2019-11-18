
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
    ScrollView
} from 'react-native';


import { MenuHorizontalScroll } from '../components/MenuComponents';
import { Header } from '../components/Header';

import { AppColors } from '../settings/GlobalStyles'

import { Tree } from '../settings/MenuOptions'


export default class MenuScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            optionsMenu: Tree
        };
    }

    /**
     * @Return an array of JSX:Elements
     */
    _insertItemsMenu = () => {

        return this.state.optionsMenu.map((item) => {
            return (
                <MenuHorizontalScroll titleColor={AppColors.textOverColorLight} navigation={this.props.navigation} item={item} />
            );
        });
    }



    render() {
        return (
            <View style={{ backgroundColor: AppColors.background, flex: 1 }}>
                <ScrollView style={{}} showsVerticalScrollIndicator={false} >
                    <Header titleColor={AppColors.textOverColorLight} title="Menú" />
                    {this._insertItemsMenu()}
                </ScrollView>
                {/* <Text onPress={() => { this.props.navigation.navigate('Couples', { step: 1 }) }}>asdad</Text> */}
            </View>
        );
    } // End of the render method
}




