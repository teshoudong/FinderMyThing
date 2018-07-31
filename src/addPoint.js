import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Alert, TouchableWithoutFeedback, AlertIOS, Animated, Easing } from 'react-native';
import Swiper from 'react-native-swiper';
import Point from './components/point';

class AddPoint extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const title = navigation.getParam('title', '');
        
        return {
            headerTitle: title
        };
    }

    constructor(props) {
        super(props);

        const images = this.props.navigation.getParam('images', []);

        this.state = {
            images: images.map(image => {
                return {
                    url: image,
                    points: []
                };
            })
        };
    }

    handleAddPoint(e, imageIndex) {
        const top = e.nativeEvent.locationY;
        const left = e.nativeEvent.locationX;

        AlertIOS.prompt(
            '请输入标签名',
            null,
            text => {
                const { images } = this.state;

                this.setState({
                    images: images.map((image, index) => {
                        if (imageIndex === index) {
                            image.points.push({
                                top,
                                left,
                                title: text
                            });
                        }
                        return image;
                    })
                });
            }
        );
    }

    handleDelPoint(imageIndex, pointIndex) {
        Alert.alert(
            '提示',
            '是否删除该点？',
            [
                {text: '取消', onPress: () => {}},
                {text: '确定', onPress: () => {
                    const { images } = this.state;

                    this.setState({
                        images: images.map((image, index) => {
                            if (imageIndex === index) {
                                image.points.splice(pointIndex, 1);
                            }
                            return image;
                        })
                    });
                }}
            ]
        )
    }

    render() {
        const { images } = this.state;

        return (
            <Swiper loop={false} showsPagination={false}>
                {
                    images.map((image, imageIndex) => {
                        return (
                            <TouchableWithoutFeedback key={imageIndex} style={styles.container} onPress={e => this.handleAddPoint(e, imageIndex)} onStartShouldSetResponderCapture={() => true}>
                                <View style={styles.item}>
                                    <Image resizeMode="contain" style={styles.image} source={{uri: image.url}}/>
                                    {image.points.map((point, pointIndex) => {
                                        return (
                                            <Point top={point.top} left={point.left} title={point.title} key={pointIndex} onPress={() => this.handleDelPoint(imageIndex, pointIndex)}/>
                                        );
                                    })}
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })
                }
            </Swiper>
        );
    }
}

class Button extends React.Component {
    handlePoint() {
        const title = this.props.navigation.getParam('title', '');
        const images = this.props.navigation.getParam('images', []);
        if (!title) {
            Alert.alert('提示', '请填写标题');
            return;
        }
        if (images.length <= 0) {
            Alert.alert('提示', '请填添加一张图片');
            return;
        }
        this.props.navigation.navigate('Point', {
            title,
            images
        });
    }

    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={() => this.handlePoint()}>
                <Text style={styles.buttonText}>继续</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 14,
        color: '#0B152C'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    item: {
        flex: 1
    },
    image: {
        flex: 1
    }
});

AddPoint.Button = Button;

export default AddPoint;