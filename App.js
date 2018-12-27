

import React, {Component} from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';

import './src/cmd/cmd';

import Login           from './src/pages/Login/Login'
import friendList      from './src/pages/friendList/friendList'
import addFriend       from './src/pages/addFriend/addFriend'
import orderDetail     from './src/pages/orderDetail/orderDetail'
import Pay             from './src/pages/pay/pay'
import Regist          from './src/pages/regist/regist'
import Wallet          from './src/pages/wallet/wallet'
import mine            from './src/pages/mine/mine'
import WxBindManager            from './src/pages/wxBindManager/wxBindManager'
import InviteFriend            from './src/pages/InviteFriend/InviteFriend'
import ChangePassword            from './src/pages/ChangePassword/ChangePassword'

import {StackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarItem from "./src/components/TabBarItem";

export default class App extends Component {

    checkIsLogin(callBcak){

        storage.load({key:'uid'}).then(ret=>{
            callBcak(true)
        }).catch(err=>{
            callBcak(false)
        })
    }

    render() {

        return (
            <Navigator/>
        );
    }
}

const TabRouteConfigs = {
    addFriend: {
        screen: addFriend,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '添加好友',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage = {<Image
                        style={style.imageStyle}
                        source={require('./src/assets/tabbar/home.png')}
                    />}
                    selectedImage = {<Image
                        style={style.imageStyle}
                        source={require('./src/assets/tabbar/homesel.png')}
                    />}
                />
            ),
        }),
    },
    friendList: {
        screen: Login,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '好友列表',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage = {<Image
                        style={style.imageStyle}
                        source={require('./src/assets/tabbar/home.png')}
                    />}
                    selectedImage = {<Image
                        style={style.imageStyle}
                        source={require('./src/assets/tabbar/homesel.png')}
                    />}
                />
            ),
        }),
    },
    mine: {
        screen: mine,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage = {<Image
                        style={style.imageStyle}
                        source={require('./src/assets/tabbar/mine.png')}
                    />}
                    selectedImage = {<Image
                        style={style.imageStyle}
                        source={require('./src/assets/tabbar/minesel.png')}
                    />}
                />
            ),
        },
    }
}

const TabNavigatorConfigs = {
    initialRouteName: 'addFriend',
    lazy: true,
    tabBarOptions: {
        activeTintColor: '#0fc04c',
        inactiveTintColor: '#9A9A9A',
        style: {backgroundColor: '#ffffff',},
        labelStyle: {
            marginBottom: 5,
        },
    }
};
const Tab = createBottomTabNavigator(TabRouteConfigs, TabNavigatorConfigs);
const StackRouteConfigs = {
    Tab: {
        screen: Tab,
    },
    Login:{
        screen:Login,
        navigationOptions: {
            title: '登录',
        }
    },
    Regist:{
        screen:Regist,
        navigationOptions: {
            title: '注册',
        }
    },
    Wallet:{
        screen:Wallet,
        navigationOptions: {
            title: '钱包',
        }
    },
    Pay:{
        screen:Pay,
        navigationOptions: {
            title: '发布加友信息',
        }
    },
    WxBindManager:{
        screen:WxBindManager,
        navigationOptions: {
            title: '账户资料',
        }
    },
    ChangePassword:{
        screen:ChangePassword,
        navigationOptions: {
            title: '修改密码',
        }
    },
    InviteFriend:{
        screen:InviteFriend,
        navigationOptions: {
            title: '邀请好友',
        }
    },

};
const StackNavigatorConfigs = {
    initialRouteName: 'Tab',
    navigationOptions: {
        title:'粉粉',
        headerStyle: {backgroundColor: 'white'},
        headerTitleStyle: {color: '#333333'},
        headerBackTitle:null,
        headerTintColor:'#333333',
    }
};
const Navigator = StackNavigator(StackRouteConfigs, StackNavigatorConfigs);
const style = StyleSheet.create({
    imageStyle:{
        width:22,
        height:22,
    }
});
