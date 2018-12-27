import {
    StyleSheet,
    View,
} from 'react-native';
import React, { Component } from 'react';
export default class TabBarItem extends Component {

    render() {

        return (
            <View style={styles.weight} key='1'>
                {this.props.focused ? this.props.selectedImage : this.props.normalImage}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    weight: {
        flex: 1,
        justifyContent:'center'
    }
});