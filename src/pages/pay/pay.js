import React, {Component} from 'react';

import {StyleSheet, View, TouchableOpacity,ScrollView, Text, TextInput, Image} from 'react-native';

import Fetch from "../../cmd/fetch";
import Api from '../../cmd/api';
import Method from "../../cmd/pubMethod";
import RSA from '../../cmd/wx_rsa'
import {Toast} from '../../cmd/Toast'
import {Loading} from '../../cmd/Loading'
import {RefreshState} from "react-native-refresh-list-view";

export default class pay extends Component {

    constructor(props) {
        super(props)
        this.state = {
           orderMoney:20,
        }

        this.getUserMoney()
    }

    getUserMoney(){

        Fetch(Api.GETMONEY, {

        }, (res) => {

            console.log(res)
            Loading.hidden()

        }, (fail) => {
            Loading.hidden()

        })
    }

    render() {

        return (

            <View style={styles.container}>
                 <View style={styles.moneyContent}>
                     <Text style={styles.moneyText}>￥20</Text>
                     <Text style={styles.moneyNoti}>待支付金额</Text>
                 </View>
                <View style={styles.userMoneyContent}>
                    <Text style={styles.userMoneyNoti}>账户余额</Text>
                    <Text style={styles.userMoneyNumber}>￥0</Text>
                </View>
                <View style={styles.payContent}>
                    <View style={styles.payBgContent}>
                        <Text style={styles.payText}>立即支付</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems:'center',
    },
    moneyContent:{
        marginTop:30,
        height:100,
        justifyContent:'center',
        alignItems:'center',
    },
    moneyText:{
        fontSize:25,
        fontWeight:'bold',
    },
    moneyNoti:{
        marginTop:10,
    },
    userMoneyContent:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:20,

    },
    userMoneyNoti:{
        marginLeft:20,
        fontSize:20,
        fontWeight:'bold',
    },
    userMoneyNumber:{
        marginRight:20,
        fontSize:20,
        fontWeight:'bold',
        marginLeft:5,
    },
    payContent:{
        position:'absolute',
        bottom:20,
        width:SCREEN.Width,
        height:50,
        justifyContent:'center',
        alignItems:'center',
    },
    payBgContent:{
        width:SCREEN.Width-100,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#1aad19',
        borderRadius:20,
    },
    payText:{
        fontSize:15,
        fontWeight:'bold',
        color:'white',
    },
});
