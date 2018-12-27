import React, {Component} from 'react';

import {StyleSheet, View, TouchableOpacity, Text, TextInput, Image} from 'react-native';

import Fetch from "../../cmd/fetch";
import Api from '../../cmd/api';
import Method from "../../cmd/pubMethod";
import RSA from '../../cmd/wx_rsa'
import {Toast} from '../../cmd/Toast'
import {Loading} from '../../cmd/Loading'

export default class ChangePassword extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (

            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
});
