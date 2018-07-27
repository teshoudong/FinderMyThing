import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class Add extends React.Component {
    constructor(props) {
        super(props);
        this.title = '';
    }

    handleInput(text) {
        this.title = text;
    }

    handleSelectImage() {
        const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从相册中选取',
            mediaType: 'photo'
        };

        ImagePicker.showImagePicker(options, response => {
            if (!response.didCancel && !response.error && !response.customButton) {
                console.log(response.uri);
            }
        });
    }

    render() {
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

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    }
});