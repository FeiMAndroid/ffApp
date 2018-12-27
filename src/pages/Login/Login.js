import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Image,
} from 'react-native';

import Fetch from "../../cmd/fetch";
import Api from '../../cmd/api';
import Method from "../../cmd/pubMethod";
import RSA from '../../cmd/wx_rsa'
import {Toast} from '../../cmd/Toast'
import {Loading} from '../../cmd/Loading'
import CryptoJS from "crypto-js";


export default class Mine extends Component {

    constructor(props) {
        super(props)
        this.state = {
            phone: '18301542878',
            secretText: '123456',
        }
    }

    loginClick = () => {

        let phone = this.state.phone
        let password = this.state.secretText

        if (!phone) {

            Toast.show('请输入手机号')
            return
        }

        Loading.show()

        password = CryptoJS.MD5(password).toString()

        console.log(password)

        Fetch(Api.LOGIN, {
            "password": password,
            "phone": phone,
        }, (res) => {

            Loading.hidden()
            Toast.show(res.msg)

            if (res.code == 200) {

                storage.save({
                    key: 'userInfo',
                    data: {
                        uid:res.data.uid,
                        phone:phone,
                    },
                });

            }
            console.log(res)

        }, (fail) => {
            Loading.hidden()
        })

    }


    registClick() {

        this.props.navigation.navigate('Regist')
    }

    render() {

        return (

            <View style={styles.container}>

                <View style={[styles.inputContent, styles.topSpace]}>
                    <TextInput
                        style={styles.input}
                        placeholder='手机号'
                        keyboardType='phone-pad'
                        maxLength={11}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({phone: text})}
                        value={this.state.phone}
                    />
                </View>

                <View style={styles.inputContent}>
                    <TextInput
                        style={styles.input}
                        placeholder='密码'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({secretText: text})}
                        value={this.state.secretText}
                    />
                </View>
                <TouchableOpacity style={styles.loginContent} onPress={() => this.loginClick()}>
                    <Text style={styles.loginBtn}>登录</Text>
                </TouchableOpacity>


                <View style={styles.absoluteCom}>
                    <TouchableOpacity style={styles.bottomItem} onPress={() => this.registClick()}>
                        <Text>立即注册</Text>
                    </TouchableOpacity>
                    <Text> | </Text>
                    <TouchableOpacity style={styles.bottomItem} onPress={() => this.registClick()}>
                        <Text>忘记密码</Text>
                    </TouchableOpacity>
                </View>


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
    topSpace: {
        marginTop: SCREEN.Height * 0.3,
    },
    inputContent: {
        width: SCREEN.Width - 80,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 10,
    },
    input: {
        flex: 1,
        padding: 0,
    },

    loginContent: {
        backgroundColor: '#1aad19',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        height: 40,
        width: SCREEN.Width - 120,
        marginTop: 20,
    },

    loginBtn: {
        color: 'white',
    },
    loginTypeChangeContent: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        height: 40,
        width: SCREEN.Width - 120,
        marginTop: 15,
    },
    twoContent: {
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    verifyImgContent: {
        width: 80,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifyImg: {
        width: 80,
        height: 50,
    },
    getMessageCode: {
        color: '#ab121a',
        fontSize: 11,
    },
    absoluteCom: {
        width: SCREEN.Width,
        position: 'absolute',
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});
