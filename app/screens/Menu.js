
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
    FlatList
} from 'react-native';


import { Card } from '../components/MenuComponents';





export default class MenuScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            options: [
                { title: "Operaciones", description: "Acomoda las piezas - Aquí debe ir una imagen o no sé que quiera la banda", action: () => { } },
                { title: "Par de letras", description: "Busca el par de cada letra - Aquí debe ir una imagen o no sé que quiera la banda", action: () => { } },
                { title: "Pares de numeros", description: "Busca el par de cada numero - Aquí debe ir una imagen o no sé que quiera la banda" },
                { title: "Free", description: "Busca el par de cada letra - Aquí debe ir una imagen o no sé que quiera la banda" },
            ],
        };
    }


    renderItem = (item, key) => <Card data={item} key={key} />



    render() {
        return (
            <View>
                <FlatList
                    style={localSheet.container}
                    data={this.state.options}
                    numColumns={1}
                    renderItem={({ item, key }) => this.renderItem(item, key)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    } // End of the render method
}



const localSheet = StyleSheet.create({
    container: {
        margin: 3,

    }
});