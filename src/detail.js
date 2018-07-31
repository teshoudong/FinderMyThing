import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import Point from './components/point';

export default class Detail extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const item = navigation.getParam('item', {
            title: ''
        });
        
        return {
            headerTitle: item.title
        };
    }

    render() {
        const item = this.props.navigation.getParam('item', {
             images: []
        });
        const index = this.props.navigation.getParam('index', 0);

        return (
            <Swiper loop={false} index={index} showsPagination={false}>
                {
                    item.images.map((image, index) => {
                        return (
                            <View style={styles.container} key={index}>
                                <Image resizeMode="contain" style={styles.image} source={{uri: image.url}}/>
                                {image.points.map((point, index) => {
                                    return (
                                        <Point top={point.top} left={point.left} title={point.title} key={index}/>
                                    );
                                })}
                            </View>
                        );
                    })
                }
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    image: {
        flex: 1
    }
});