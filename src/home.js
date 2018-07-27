import React from 'react';
import { Text, View, Image, TouchableHighlight, TouchableOpacity, FlatList, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Navigation from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Detail from './detail';
import Add from './add';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [
                {
                    id: '123456',
                    title: '客厅',
                    images: [
                        {
                            url: 'https://raw.githubusercontent.com/akveo/react-native-ui-kitten/master/example/img/post2.png',
                            points: [
                                {
                                    top: 100,
                                    left: 200,
                                    title: '测试1'
                                },
                                {
                                    top: 300,
                                    left: 300,
                                    title: '测试2'
                                }
                            ]
                        },
                        {
                            url: 'https://raw.githubusercontent.com/akveo/react-native-ui-kitten/master/example/img/post2.png',
                            points: []
                        },
                        {
                            url: 'https://raw.githubusercontent.com/akveo/react-native-ui-kitten/master/example/img/post2.png',
                            points: []
                        },
                        {
                            url: 'https://raw.githubusercontent.com/akveo/react-native-ui-kitten/master/example/img/post2.png',
                            points: []
                        },
                        {
                            url: 'https://raw.githubusercontent.com/akveo/react-native-ui-kitten/master/example/img/post2.png',
                            points: []
                        },
                        {
                            url: 'https://raw.githubusercontent.com/akveo/react-native-ui-kitten/master/example/img/post2.png',
                            points: []
                        },
                        {
                            url: 'https://raw.githubusercontent.com/akveo/react-native-ui-kitten/master/example/img/post2.png',
                            points: []
                        }
                    ]
                },
                {
                    id: '1234',
                    title: '主卧',
                    images: [
                        {
                            url: 'https://raw.githubusercontent.com/akveo/react-native-ui-kitten/master/example/img/post2.png',
                            points: []
                        },
                        {
                            url: 'https://raw.githubusercontent.com/akveo/react-native-ui-kitten/master/example/img/post2.png',
                            points: []
                        }
                    ]
                }
            ]
        };
    }

    handleClickImage(item, index) {
        this.props.navigation.navigate('Detail', {
            item,
            index
        });
    }

    keyExtractor(item) {
        return item.id;
    }

    renderItem(data) {
        const item = data.item;
        const { width } = Dimensions.get('window');
        const imageSize = (width - 24) / 3;

        return (
            <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.itemImages}>
                    {
                        item.images.map((image, index) => {
                            return (
                                <TouchableHighlight key={index} style={styles.itemImageContainer} onPress={() => this.handleClickImage(item, index)}>
                                    <Image resizeMode="cover" style={{ width: imageSize, height: imageSize }} source={{uri: image.url}}/>
                                </TouchableHighlight>
                            );
                        })
                    }
                </View>
            </View>
        );
    }

    render() {
        const { list } = this.state;

        return (
            <ScrollView style={styles.container}>
                <FlatList style={styles.list} data={list} keyExtractor={this.keyExtractor} renderItem={data => this.renderItem(data)}/>
            </ScrollView>
        );
    }
}

class AddButton extends React.Component {
    handleAdd() {
        this.props.navigation.navigate('Add');
    }

    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={() => this.handleAdd()}>
                <Icon style={styles.buttonIcon} name="md-add"/>
            </TouchableOpacity>
        );
    }
}

const Nav = Navigation.createStackNavigator({
    Main: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerStyle: styles.header,
                headerTitleStyle: styles.headerTitle,
                headerRight: <AddButton navigation={navigation}/>
            };
        }
    },
    Detail: {
        screen: Detail,
        navigationOptions: () => {
            return {
                headerStyle: styles.header,
                headerTitleStyle: styles.headerTitle,
                headerTintColor: '#0B152C'
            };
        }
    },
    Add: {
        screen: Add,
        navigationOptions: () => {
            return {
                headerStyle: styles.header,
                headerTitleStyle: styles.headerTitle,
                headerTintColor: '#0B152C'
            };
        }
    }
});

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF'
    },
    headerTitle: {
        color: '#0B152C'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    list: {
        flex: 1
    },
    item: {
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        paddingRight: 8,
        paddingBottom: 10,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderColor: '#D3D3D3'
    },
    itemTitle: {
        fontSize: 14,
        color: '#333333',
        paddingBottom: 10
    },
    itemImages: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemImageContainer: {
        marginRight: 2,
        marginBottom: 2
    },
    button: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonIcon: {
        fontSize: 30,
        color: '#0B152C'
    }
});

export default Nav;