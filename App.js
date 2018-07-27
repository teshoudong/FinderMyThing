/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Navigation from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './src/home';
import Setting from './src/setting';

const Bottom = Navigation.createBottomTabNavigator({
    Home,
    Setting
}, {
    navigationOptions: ({ navigation }) => {
        const titleMap = routeName => {
            if (routeName === 'Home') {
                return '首页';
            } else if (routeName === 'Setting') {
                return '设置';
            }
        };

        return {
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;

                if (routeName === 'Home') {
                    if (focused) {
                        return (
                            <Icon name="ios-home" style={styles.icon}/>
                        );
                    } else {
                        return (
                            <Icon name="ios-home-outline" style={styles.icon}/>
                        );
                    }
                } else if (routeName === 'Setting') {
                    if (focused) {
                        return (
                            <Icon name="ios-settings" style={styles.icon}/>
                        );
                    } else {
                        return (
                            <Icon name="ios-settings-outline" style={styles.icon}/>
                        );
                    }
                }
            },
            title: titleMap(navigation.state.routeName),
            tabBarOptions: {
                activeTintColor: '#0B152C',
                inactiveTintColor: '#0B152C',
                style: styles.tab
            }
        };
    }
});

const styles = StyleSheet.create({
    app: {
        flex: 1
    },
    tab: {
        backgroundColor: '#FFFFFF'
    },
    icon: {
        fontSize: 30,
        color: '#0B152C'
    }
});

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.app}>
                <StatusBar barStyle="dark-content"/>
                <Bottom/>
            </View>
        );
    }
}