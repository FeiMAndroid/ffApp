import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Image,
    ScrollView,
} from 'react-native';

import Fetch from "../../cmd/fetch";
import Api from '../../cmd/api';
import Method from "../../cmd/pubMethod";
import RSA from '../../cmd/wx_rsa'
import {Toast} from '../../cmd/Toast'
import {Loading} from '../../cmd/Loading'
import CryptoJS from 'crypto-js'

export default class regist extends Component {

    constructor(props) {
        super(props)
        this.state = {

            phone: '18301542878',
            secretText: '123456',
            verify: '',
            inviteCode: '',
            messageCode: '',
            verifyImg: baseUrl + Api.GETCAPTCHA+'?id=' + Math.random(),
            messageText: '获取验证码',
            messageTime: 180,
            isSendMessageing: false,
        }
    }

    getRandom = () => {

        this.setState({
            verifyImg: baseUrl + Api.GETCAPTCHA+'?id=' + Math.random(),
        })

    }

    getMessageCodeClick = () => {

        let isSendMessageing = this.state.isSendMessageing
        if (!isSendMessageing) {

            this.getMessageApi((res) => {

                if (res) {
                    this.setState({
                        isSendMessageing: true,
                        messageText: this.state.messageTime,
                    })

                    this.countdownfn(this._afterEnd)
                }
            })


        }
    }

    countdownfn(callback) {

        let that = this
        if (that.state.messageTime > 0) {

            let interval = setInterval(function () {
                if (that.state.messageTime < 1) {
                    clearInterval(interval)
                    callback()
                } else {
                    let totalTime = that.state.messageTime
                    that.setState({
                        messageTime: totalTime - 1,
                        messageText: totalTime - 1,
                    })
                }
            }, 1000)
        }
    }

    getMessageApi(success) {

        let phone = this.state.phone
        let verify = this.state.verify

        if (!phone) {

            Toast.show('请输入手机号')
            return
        }

        if (!verify) {

            Toast.show('请输入图片验证码')
            return
        }

        Loading.show()

        Fetch(Api.CHECKREGISTER, {
            'phone': phone,
            'captcha': verify,
        }, (res) => {
            console.log(res)
            Loading.hidden()
            Toast.show(res.msg)

            if (res.code == 200) {
                success(1)
            } else {
                success(0)
            }

        }, (fail) => {
            success(0)
            console.log(fail)
            Toast.show('发送失败')
            Loading.hidden()
        })

    }

    _afterEnd = () => {

        this.setState({
            messageTime: 60,
            isSendMessageing: false,
            messageText: '获取验证码',
        })
    }

    loginClick = () => {

        let phone = this.state.phone
        let password = this.state.secretText
        let messageCode = this.state.messageCode
        let invite_code = this.state.inviteCode

        if (!phone) {

            Toast.show('请输入手机号')
            return
        }

        if (!messageCode) {
            Toast.show('请输入短信验证码')
            return
        }

        if (!password) {

            Toast.show('请输入密码')
            return
        }


        password = CryptoJS.MD5(password).toString()

        console.log(password)

        Loading.show()

        Fetch(Api.REGISTER, {

            "password": password,
            "phone": phone,
            "invite_code": invite_code,
            "code": messageCode,

        }, (res) => {

            Loading.hidden()
            Toast.show(res.msg)

            if (res.code == 200) {

            }
            console.log(res)

        }, (fail) => {
            Loading.hidden()
        })

    }



    render() {

        return (

            <ScrollView style={styles.container}>
                <View style={styles.alignItemsContent}>


                    <View style={[styles.inputContent, styles.topSpace]}>
                        <TextInput
                            style={styles.input}
                            placeholder='请输入手机号'
                            keyboardType='phone-pad'
                            maxLength={11}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({phone: text})}
                            value={this.state.phone}
                        />
                    </View>
                    <View style={[styles.inputContent, styles.twoContent]}>
                        <TextInput
                            style={[styles.input, styles.samllInput]}
                            placeholder='请输入图片验证码'
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({verify: text})}
                            value={this.state.verify}
                        />
                        <TouchableOpacity style={styles.verifyImgContent} onPress={() => this.getRandom()}>
                            <Image style={styles.verifyImg}
                                   resizeMode='contain'
                                   source={{uri: this.state.verifyImg}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.inputContent, styles.twoContent]}>
                        <TextInput
                            style={[styles.input, styles.samllInput]}
                            placeholder='请输入短信验证码'
                            keyboardType='phone-pad'
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({messageCode: text})}
                            value={this.state.messageCode}
                        />
                        <TouchableOpacity style={styles.verifyImgContent} onPress={() => this.getMessageCodeClick()}>
                            <Text style={styles.getMessageCode}>{this.state.messageText}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContent}>
                        <TextInput
                            style={styles.input}
                            placeholder='请设置登录密码'
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({secretText: text})}
                            value={this.state.secretText}
                        />
                    </View>
                    <View style={styles.inputContent}>
                        <TextInput
                            style={styles.input}
                            placeholder='请输入邀请码'
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({inviteCode: text})}
                            value={this.state.inviteCode}
                        />
                    </View>

                    <TouchableOpacity style={styles.loginContent} onPress={() => this.loginClick()}>
                        <Text style={styles.loginBtn}>注册</Text>
                    </TouchableOpacity>

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
    alignItemsContent: {
        alignItems: 'center',
        width: SCREEN.Width,
        marginTop:SCREEN.Height*0.1,
    },
    topSpace: {
        marginTop: 60,
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
    samllInput: {},
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

});
