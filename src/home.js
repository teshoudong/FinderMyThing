import React from 'react';
import { Text, TextInput, View, Image, TouchableHighlight, TouchableOpacity, FlatList, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Navigation from 'react-navigation';
import Detail from './detail';
import AddItem from './addItem';
import AddPoint from './addPoint';
import Icon from 'react-native-vector-icons/Ionicons';

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

    handleSearch() {
        
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
                <View style={styles.search}>
                    <Icon style={styles.searchIcon} name="md-search"/>
                    <TextInput 
                        style={styles.searchInput}
                        placeholder="请输入搜索内容"
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.handleSearch(text)}/>
                </View>
                <FlatList style={styles.list} data={list} keyExtractor={this.keyExtractor} renderItem={data => this.renderItem(data)}/>
            </ScrollView>
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
                headerRight: <AddItem.Button navigation={navigation}/>
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
        screen: AddItem,
        navigationOptions: ({ navigation }) => {
            return {
                headerStyle: styles.header,
                headerTitleStyle: styles.headerTitle,
                headerTintColor: '#0B152C',
                headerRight: <AddPoint.Button navigation={navigation}/>
            };
        }
    },
    Point: {
        screen: AddPoint,
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
    search: {
        padding: 10
    },
    searchIcon: {
        position: 'absolute',
        top: 20,
        left: 20,
        fontSize: 18,
        zIndex: 1,
        color: '#CBCBCF'
    },
    searchInput: {
        backgroundColor: '#F2F2F2',
        height: 40,
        borderRadius: 4,
        fontSize: 12,
        paddingLeft: 30,
        paddingRight: 10
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
    }
});

export default Nav;