import Storage from "react-native-storage";
import {
    AsyncStorage,
} from 'react-native';

const Dimensions = require('Dimensions'); //必须要写这一行，否则报错，无法找到这个变量
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const baseUr  = 'https://ttlove.top/ffServer/public/api/';

const LocalPublicKe = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDolrQy7vpmxuAkvUWBqE5Sj8LXV/spd5/qfPKoj2dg5J7GSaO7Gp5PctD3QzQKm58G887417yzUvBMIcHxEf9894VTy8cIyEA9+PHSQMy3qzh/+aWPiNDKlpyvuEgwD7keS44wgP9bmAWty9sJnaydhI2bCJNHpZwQ2e1yhc0afQIDAQAB"
const LocalPrivateKe = "-----BEGIN PRIVATE KEY-----MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAOiWtDLu + mbG4CS9RYGoTlKPwtdX + yl3n + p88qiPZ2DknsZJo7sank9y0PdDNAqbnwbzzvjXvLNS8EwhwfER / 3z3hVPLxwjIQD348dJAzLerOH/ 5pY+ I0MqWnK + 4SDAPuR5LjjCA/ 1uYBa3L2wmdrJ2EjZsIk0elnBDZ7XKFzRp9AgMBAAECgYAJIpIlRfmTu8/ l4YEvXHrnBzpx1sTIligzv4CQWkGHLrOFujKyEJOTL0FB1OPgXshaL407fM2uhV1mwBSr8TcFkFAB1QLinT3iDjOLc9QoDF96JvEVGjion4jIUdsXxKSszn+ tR7nVeKgsqsUEmkwjMctTBuBIQiH3UA / +0vIBgQJBAPZHzeGnCtKzTLWAAil5k+ gN4CesUcJneelygsvqssEdKi04kaqCIALHqgcuCssps3IfCut68zNl5aVIvRwWnM0CQQDxxJHyaG7tvlex4W / hQnF8AMzufoISOH9mzxaU5vmnR6tmF / rLcC8znJCz / 5s8QlGDXMcxQP55jI1EOjPT2XRxAkEArHAkME4kXtjZ6e9CFEYjEIS+ oSifam3HR3Q9LogbNumzwUvteiR4Q1oHq9VKC2wcT9h6bdx9ckxzWaIvfv46NQJALOJokg9vYLXww / Ztde2G8hWX9kMIVOemR2j08Un8WWEF4htblT9LlBJiDvjKUiKhzXiBBpThaaF9bIg9rPv3EQJAA3eVqihaxIDH0GxbjXe3JEjtW4 / RvR8K + 47ItNo5dEa1groa0KThnqIS8N+ bH56nS6fnIx5YX2vENEPtZFZs7g ==-----END PRIVATE KEY-----"
const storag = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,
    storageBackend: AsyncStorage,
    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
})

// 全局变量
global.storage = storag;

global.baseUrl = baseUr
global.LOCALPUBLICKEY = LocalPublicKe
global.LOCALPRIVATEKEY = LocalPrivateKe

global.SCREEN = {
    Width:ScreenWidth,
    Height:ScreenHeight
}

// const { width, height } = Dimensions.get('window');
// export function setWidth(n) {
//     return (n * width / 750);
// }
