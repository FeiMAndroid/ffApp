import React, {Component} from 'react';

import {StyleSheet, View, TouchableOpacity, ScrollView, Text, Image} from 'react-native';

import Fetch     from "../../cmd/fetch"
import Api       from '../../cmd/api'
import Method    from "../../cmd/pubMethod"
import {Toast}   from '../../cmd/Toast'
import {Loading} from '../../cmd/Loading'

import ImagePicker from 'react-native-image-crop-picker';

export default class wxBindManager extends Component {

    constructor(props) {
        super(props)
        this.state = {
            qrImg:'',
        }
    }

    okClick(){

    }

    chooseImageClick(){

        const options = {
            quality:1.0,
            maxWidth:500,
            maxHeight:500,
            storageOptions:{
                skipBackup:true
            }
        }

        ImagePicker.openCamera(options)
            .then(image=>{
                console.log(image)
            })
    }

    renderQrImg(){

        if (this.state.qrImg){

            return (
                <Image source={{uri:this.state.qrImg}}  style={styles.bindWxQrImg}/>
            )
        } else {

            return (
                <Image source={require('../../assets/choosPic.png')} style={styles.bindWxQrImg}/>
            )
        }
    }

    render() {

        return (

            <View style={styles.container}>
                <View style={[styles.subContent,styles.borderBottom]}>
                    <Text style={styles.bindNoti}>当前绑定微信手机号</Text>
                    <Text style={styles.bindPhoneText}>18301542878</Text>
                </View>
                <TouchableOpacity onPress={()=>this.chooseImageClick()} style={styles.subContent}>
                    <Text style={styles.bindNoti}>绑定微信二维码</Text>
                    {this.renderQrImg()}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.okClick()} style={styles.okContent}>
                    <Text style={styles.okText}>确定</Text>
                </TouchableOpacity>
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
    subContent: {
        width: SCREEN.Width - 40,
        marginTop:30,
        paddingBottom:10,
    },
    borderBottom: {
        borderBottomColor: '#f9f9f9',
        borderBottomWidth: 1,
    },
    bindNoti: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    bindPhoneText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },

    bindWxQrImg: {
        width:SCREEN.Width - 40,
        height:SCREEN.Width - 40,
        marginTop:15,
    },
    okContent:{
        position:'absolute',
        bottom:0,
        width:SCREEN.Width,
        height:50,
        backgroundColor:'#1aad19',
        justifyContent:'center',
        alignItems:'center',
    },
    okText:{
        fontSize:15,
        fontWeight:'bold',
        color:'white',
    },
});
