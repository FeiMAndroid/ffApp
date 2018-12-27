
import Fetch from "./fetch";
import Api from './api';

function getLocalSeverPublicKey(callback) {

    console.log('检查本地是否存在线上的公钥')

    storage.load({
        key: 'seversPublicKey'
    }).then(ret => {
        console.log('本地存在')
        console.log(ret)

        callback(ret.publicKey)
    })
        .catch(err => {

            console.log('-------------')
            console.log(err)
            console.log(err.name)
            console.log('-------------')
            if (err.name=='NotFoundError'){
                getSeverPublicKey(callback)
            }else {
                callback()
            }
        })
}

function getSeverPublicKey(callback) {

    console.log('本地没有公钥 获取线上的')

    Fetch(Api.pubkey, {

    }, (res) => {

        console.log(res)
        if (res.code==0){
            //保存到本地
            let keyy = '-----BEGIN PUBLIC KEY-----\n' + res.result + '\n-----END PUBLIC KEY-----';

            storage.save({
                key:'seversPublicKey',    // 注意:请不要在key中使用_下划线符号!
                data: {
                    publicKey:keyy,
                },
            });

            callback(keyy)
        } else {
            callback()
        }

    }, (fail) => {
        callback()
    })

}

module.exports  = {
    getLocalSeverPublicKey:getLocalSeverPublicKey,
}
