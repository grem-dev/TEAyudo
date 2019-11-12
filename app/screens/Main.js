import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

export default class MainScreen extends Component {
    render() {
        return (
            <View>
                <Text> Component will be main </Text>
                <Button title='Go to Menu' onPress={() => { this.props.navigation.navigate('Menu')}} />
            </View>
        )
    }
}
