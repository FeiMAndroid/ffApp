import React, {Component} from 'react';
import Api from '../../cmd/api';
import Fetch from "../../cmd/fetch";
import {Toast} from '../../cmd/Toast'
import {Loading} from '../../cmd/Loading'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import {StyleSheet, View, Image, Text, TouchableOpacity,} from 'react-native';
import OrderDetail from "../orderDetail/orderDetail";

export default class addFriend extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            type: 0,
            orderlist: [],
            refreshState: RefreshState.Idle,
            hasMore: true,
        }

        this.getOrderList(1)
    }

    componentDidMount() {

    }

    getOrderList(page) {

        let orderlist = page == 1 ? [] : this.state.orderlist

        Fetch(Api.ORDERLIST, {
            page: page,
        }, (res) => {

            console.log(res)
            Loading.hidden()

            if (res.code == 0) {
                if (res.result.length) {
                    this.setState({
                        orderlist: orderlist.concat(res.result)
                    })
                    this.setState({refreshState: RefreshState.Idle})
                } else {
                    this.setState({refreshState: RefreshState.NoMoreData})
                }
            } else {
                this.setState({refreshState: RefreshState.NoMoreData})
            }

        }, (fail) => {
            Loading.hidden()
            this.setState({refreshState: RefreshState.Failure})
        })
    }

    freshAction() {

        this.setState({
            page: 1,
            hasMore: true,
            orderlist: [],
            refreshState: RefreshState.Idle,
        })
        this.getOrderList(1, this.state.type)
    }

    gotoOrderInfo = (ornum) => {

        this.props.navigation.navigate('orderDetail', {'order_num': ornum})
    }

    renderCell = (info: Object) => {

        let item = info.item

        return (
            <View style={styles.cellContent}>
                <View style={styles.orderTopContent}>
                    <Text style={styles.orderNumber}>加友编号:{item.ornum}</Text>
                    <Text style={styles.orderStateName}>{item.state_name}</Text>
                    <Text style={styles.orderStateName}>{item.state_name}</Text>
                    <Text style={styles.orderStateName}>{item.state_name}</Text>
                </View>
                <View>
                    <Text style={styles.orderStateName}>查看详情</Text>
                </View>
            </View>
        )
    }

    gotoPay(){

        this.props.navigation.navigate('Pay')
    }

    keyExtractor = (item: any, index: number) => {
        return index.toString()
    }
    onHeaderRefresh = () => {

        this.setState({refreshState: RefreshState.HeaderRefreshing})

        let type = this.state.type

        this.setState({
            page: 1,
            hasMore: true,
        })

        this.getOrderList(1, type)

    }
    onFooterRefresh = () => {

        if (this.state.hasMore) {

            this.setState({refreshState: RefreshState.FooterRefreshing})

            let page = this.state.page

            page++

            this.setState({
                page: page,
            })
            this.getOrderList(page)
        }
    }
    renderBottomContent() {

        return (
            <View style={styles.bottomContent}>
                <TouchableOpacity onPress={()=>this.gotoPay()} style={styles.actionContent}>
                    <Text style={styles.addFriendText}>发布加友信息</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>

                <RefreshListView
                    style={styles.scrollViewContent}
                    data={this.state.orderlist}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderCell}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}
                >
                </RefreshListView>
                {
                    this.renderBottomContent()
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollViewContent: {
        marginTop: 50,
    },
    bottomContent: {
        position: 'absolute',
        bottom: 0,
        width: SCREEN.Width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionContent: {
        width: SCREEN.Width * 0.6,
        height: 40,
        backgroundColor: '#1aad19',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addFriendText: {
        fontWeight:'bold',
        color:'white',
    },

});

