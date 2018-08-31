import React from 'react';
import { Text, TextInput, View, Image, TouchableHighlight, TouchableOpacity, FlatList, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Navigation from 'react-navigation';
import Detail from './detail';
import AddItem from './addItem';
import AddPoint from './addPoint';
import storage from './storage';
import Icon from 'react-native-vector-icons/Ionicons';
import PubSub from 'pubsub-js';
import fuzzy from 'fuzzy';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: []
        };

        this.getList();
        this.subUpdateList();
    }

    subUpdateList() {
        PubSub.subscribe('updateList', () => {
            this.getList();
        });
    }

    getList() {
        storage.load({
            key: 'list'
        }).then(list => {
            list = list || [];
            this.list = list;
            this.setState({
                list
            });
        }).catch(err => {
            console.log(err.message);
        });
    }

    handleClickImage(item, index) {
        this.props.navigation.navigate('Detail', {
            item,
            index
        });
    }

    handleSearch(text) {
        const list = this.list;
        const result = fuzzy.filter(text, list, {
            extract: el => {
                let content = '';
                if (el.images && el.images.length > 0) {
                    content = el.images.map(image => {
                        if (image.points && image.points.length > 0) {
                            image.points.map(point => point.title).join(' ');
                        } else {
                            return '';
                        }
                    }).join('');
                }
                return `${el.title} ${content}`;
            }
        }).map(item => item.original);

        this.setState({
            list: result
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

class Button extends React.Component {
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
                headerRight: <Button navigation={navigation}/>
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
                headerRight: <AddItem.Button navigation={navigation}/>
            };
        }
    },
    Point: {
        screen: AddPoint,
        navigationOptions: ({ navigation }) => {
            return {
                headerStyle: styles.header,
                headerTitleStyle: styles.headerTitle,
                headerTintColor: '#0B152C',
                headerRight: <AddPoint.Button navigation={navigation}/>
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