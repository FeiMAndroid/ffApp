import React, {Component} from 'react';

import {StyleSheet, ScrollView, View, TouchableOpacity, Text, TextInput, Image} from 'react-native';

import Fetch from "../../cmd/fetch";
import Api from '../../cmd/api';
import Method from "../../cmd/pubMethod";
import RSA from '../../cmd/wx_rsa'
import {Toast} from '../../cmd/Toast'
import {Loading} from '../../cmd/Loading'

export default class mine extends Component {

    constructor(props) {
        super(props)
        this.state = {

            phone: 18301542878,
        }

    }


    gotoMoney() {
        this.props.navigation.navigate('Wallet')
    }


    gotoWxBindManager(){
        this.props.navigation.navigate('WxBindManager')
    }

    gotoInviteFriend(){
        this.props.navigation.navigate('InviteFriend')
    }

    gotoChangePassword(){
        this.props.navigation.navigate('ChangePassword')
    }

    render() {

        return (
            <ScrollView style={styles.container}>
                <View style={[styles.topHeadContent, styles.borderBottom]}>
                    <View style={styles.userPhoneContent}>
                        <Image style={styles.headImg}
                               source={require('../../assets/touxiang.png')}/>
                        <Text style={styles.UserPhone}>{this.state.phone}</Text>
                    </View>

                </View>

                <TouchableOpacity onPress={() => this.gotoWxBindManager()} style={[styles.moneyContent, styles.borderBottom]}>
                    <View style={styles.moneyText}>
                        <Text style={styles.moneyNoti}>账户资料</Text>
                    </View>
                    <Image
                        style={styles.rightRowImg}
                        source={require('../../assets/rightRow.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.gotoMoney()} style={[styles.moneyContent, styles.borderBottom]}>
                    <View style={styles.moneyText}>
                        <Text style={styles.moneyNoti}>账户余额</Text>
                    </View>
                    <Image
                        style={styles.rightRowImg}
                        source={require('../../assets/rightRow.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.gotoInviteFriend()} style={[styles.moneyContent, styles.borderBottom]}>
                    <View style={styles.moneyText}>
                        <Text style={styles.moneyNoti}>邀请好友</Text>
                    </View>
                    <Image
                        style={styles.rightRowImg}
                        source={require('../../assets/rightRow.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.gotoChangePassword()} style={[styles.moneyContent, styles.borderBottom]}>
                    <View style={styles.moneyText}>
                        <Text style={styles.moneyNoti}>修改登录密码</Text>
                    </View>
                    <Image
                        style={styles.rightRowImg}
                        source={require('../../assets/rightRow.png')}
                    />
                </TouchableOpacity>


                <View style={styles.logoutContent}>
                    <View style={styles.logoutTextContent}>
                        <Text style={styles.logouttext}>退出登录</Text>
                    </View>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    borderBottom: {
        borderBottomColor: '#f9f9f9',
        borderBottomWidth: 10,
    },
    topHeadContent: {
        width: SCREEN.Width,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'space-between',
    },
    headImg: {
        width: 45,
        height: 45,
        marginLeft: 15,
    },
    UserPhoneNoti: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    userPhoneContent: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems:'center',
    },
    UserPhone: {
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft:10,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightRowImg: {
        width: 22,
        height: 22,
        marginLeft: 5,
        marginRight: 5,
    },
    rightText: {
        fontSize: 12,
    },
    moneyContent: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    moneyText: {
        marginLeft: 20,
    },
    moneyNoti: {
        fontWeight: 'bold',
    },
    moneyNumber: {
        fontWeight: '600',
        fontSize: 25,
        marginTop: 5,
    },


    logoutContent: {

        width: SCREEN.Width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    logoutTextContent: {
        width: SCREEN.Width * 0.6,
        height: 40,
        backgroundColor: '#1aad19',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logouttext: {
        fontWeight: 'bold',
        color: 'white',
    },
});
