
import axios from 'axios';

import {Platform} from 'react-native';
import RSA from './wx_rsa'
import Method from "./pubMethod";

function getTime() {

    let timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    return timestamp
}

function getSign(Time,callback) {

    storage.load({
        key: 'token'
    }).then(ret => {
        // console.log('本地存在Token')
        // console.log(ret)
        let result = ret.token

        let token = result.token
        let uid = result.uid

        let input_rsa = 'uid=' + uid + '&token=' + token + '&time=' + Time;

//获取线上公钥
        Method.getLocalSeverPublicKey((res) => {

            if (res) {
                // console.log(res)

                let encrypt_rsa = new RSA.RSAKey();
                encrypt_rsa = RSA.KEYUTIL.getKey(res)
                let encStr = encrypt_rsa.encrypt(input_rsa)
                encStr = RSA.hex2b64(encStr);
                encStr = encodeURIComponent(encStr)

                // console.log(encStr)
                callback(encStr)
            } else {
                callback()
            }
        })
    })
        .catch(err => {
            console.log(err)
            callback()
        })

}

function POST(url, body, success, fail) {

    console.log(body)
    console.log(baseUrl + url)

    let u = baseUrl + url

    let formData = new FormData(body);

    for (let key in body) {
        formData.append(key, body[key])
    }

    axios.post(u, formData)
        .then(res => res.data)
        .then(function (response) {

            // console.log(response)

            if (Platform.OS === 'android') {

                //如果是android平台'
                let rs = response.substring(1, response.length)
                console.log(JSON.parse(rs));
                success(JSON.parse(rs))

            } else {
                success(response)
            }

        })
        .catch(function (error) {
            console.log(error);
            fail(error)
        });

    // let time = getTime()
    // getSign(time,(sign)=>{
    //
    //     formData.append('timestamp', time)
    //     formData.append('sign', sign)
    //
    //
    // })
}

export default POST;
