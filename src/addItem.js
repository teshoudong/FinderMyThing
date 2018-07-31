import React from 'react';
import { View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    handleInput(text) {
        this.props.navigation.setParams({
            title: text
        });
    }

    handleSelectImage() {
        const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从相册中选取',
            mediaType: 'photo',
            quality: 1
        };

        ImagePicker.showImagePicker(options, response => {
            if (!response.didCancel && !response.error && !response.customButton) {
                const { images } = this.state;
                images.push(response.uri);
                this.setState({
                    images
                });
                this.props.navigation.setParams({
                    images
                });
            }
        });
    }

    handleRemoveImage(index) {
        Alert.alert(
            '提示',
            '是否删除该图？',
            [
                {text: '取消', onPress: () => {}},
                {text: '确定', onPress: () => {
                    const { images } = this.state;
                    this.setState({
                        images: images.filter((_, i) => index !== i)
                    });
                }}
            ]
        );
    }

    render() {
        const { images } = this.state;
        const { width } = Dimensions.get('window');
        const imageSize = (width - 40) / 3;

        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <TextInput 
                        style={styles.itemInput}
                        placeholder="请输入标题"
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.handleInput(text)}/>
                </View>
                <View style={styles.images}>
                    {
                        images.map((image, index) => {
                            return (
                                <View style={styles.imageContainer} key={index}>
                                    <TouchableOpacity style={styles.remove} onPress={() => this.handleRemoveImage(index)}>
                                        <Icon style={styles.removeIcon} name="md-close-circle"/>
                                    </TouchableOpacity>
                                    <Image resizeMode="cover" style={{ width: imageSize, height: imageSize }} source={{uri: image}}/>
                                </View>
                            );
                        })
                    }
                    <TouchableOpacity style={[styles.add, { width: imageSize, height: imageSize }]} onPress={() => this.handleSelectImage()}>
                        <Icon style={styles.addIcon} name="md-add"/>
                    </TouchableOpacity>
                </View>
            </View>
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

AddItem.Button = Button;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    item: {
        padding: 10
    },
    itemInput: {
        backgroundColor: '#F2F2F2',
        height: 40,
        borderRadius: 4,
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10
    },
    images: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 10
    },
    imageContainer: {
        marginRight: 10,
        marginBottom: 10
    },
    remove: {
        position: 'absolute',
        width: 20,
        height: 20,
        top: -10,
        right: -10,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 12
    },
    removeIcon: {
        fontSize: 22,
        color: '#E3483C'
    },
    add: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#D3D3D3',
        borderWidth: 1
    },
    addIcon: {
        color: '#D3D3D3',
        fontSize: 30
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

export default AddItem;